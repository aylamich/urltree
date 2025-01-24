import { useState } from 'react';
import { useEffect } from 'react';
import { urltree_backend } from 'declarations/urltree_backend';
import { Actor } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";

function App() {

  const [idUrl, setIdUrl] = useState(null);
  const [nomeUrl, setNomeUrl] = useState('');
  const [linkLinkedin, setLinkLinkedin] = useState('');
  const [linkGithub, setLinkGithub] = useState('');
  const [linkInstagram, setLinkInstagram] = useState('');
  const [linkDiscord, setLinkDiscord] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [carregandoSpinner, setCarregandoSpinner] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);


/*
const adicionarLinks = async (event) => {
  event.preventDefault();
  setCarregandoSpinner(true); // botão carregando vai pro estado verdadeiro (aparece)

  // fazer aqui, se for 0 vai pra editar se for null vai pra adicionar
  try {
    let l = await urltree_backend.adicionarUrlTree(nomeUrl, linkLinkedin, linkGithub, linkInstagram, linkDiscord);
    let comoString = String(l);
    setLinkUrl("https://66ete-hqaaa-aaaab-qacrq-cai.icp0.io/url"+comoString);

    console.log(l);
    setCarregandoSpinner(false); // Finaliza o carregamento antes de mostrar o modal
    setMostrarModal(true); // Mostra o modal
  } catch (error) {
    console.error('Erro ao adicionar links:', error);
    alert('Ocorreu um erro ao adicionar os links.');
  } finally {
    setCarregandoSpinner(false); // Finaliza o carregamento
  }
};*/

const adicionarLinks = async (event) => {
event.preventDefault();
  setCarregandoSpinner(true);

  try {
console.log("ID URL: ", idUrl);
    if(idUrl === null){
      console.log("ENTROU NO IF");
        // Primeiro, tentamos adicionar uma nova URL
        const resultadoAdicionar = await urltree_backend.adicionarUrlTree(nomeUrl, linkLinkedin, linkGithub, linkInstagram, linkDiscord);
        setIdUrl(resultadoAdicionar);
        setLinkUrl("https://66ete-hqaaa-aaaab-qacrq-cai.icp0.io/url/" + resultadoAdicionar);
         setMostrarModal(true);
    } else {
      console.log("ENTROU NO ELSE");
        // Se retornar null, significa que o usuário já tem uma URL cadastrada
      // Neste caso, vamos tentar editar a URL existente
      const resultadoEditar = await urltree_backend.editarUrlTree(parseInt(idUrl), 
                                                                                   nomeUrl,
                                                                                   linkLinkedin,
                                                                                   linkGithub,
                                                                                   linkInstagram,
                                                                                   linkDiscord
                                                                          );
setLinkUrl("https://66ete-hqaaa-aaaab-qacrq-cai.icp0.io/url/" + idUrl);

      if (resultadoEditar === null) {
         alert('Não foi possível editar a URL. Verifique se você é o proprietário.');
      } else {
         // const urlEditada = resultadoEditar[0]; // Extrai o valor do Optional
         //setLinkUrl("https://66ete-hqaaa-aaaab-qacrq-cai.icp0.io/url" + urlEditada.id);
         setMostrarModal(true);
        // console.log('URL editada com sucesso:', urlEditada);
      }
    }

    
  } catch (error) {
    console.error('Erro ao adicionar/editar links:', error);
    alert('Ocorreu um erro ao processar os links.');
  } finally {
    setCarregandoSpinner(false);
  }

    
    
    /*
      
    } else {
      // Nova URL adicionada com sucesso
      const id = resultadoAdicionar[0]; // Extrai o valor do Optional
      const comoString = String(id);
      setLinkUrl("https://66ete-hqaaa-aaaab-qacrq-cai.icp0.io/url" + comoString);
      setMostrarModal(true);
      console.log('Nova URL adicionada:', id);
    }
  } catch (error) {
    console.error('Erro ao adicionar/editar links:', error);
    alert('Ocorreu um erro ao processar os links.');
  } finally {
    setCarregandoSpinner(false);
  }
  */


};


  const retornarLinks = (event) => {
    event.preventDefault();
    urltree_backend.retornarUrlTree().then((result) => {
    console.log(result.nomeUrl);
    console.log(result.linkLinkedin);
    console.log(result.linkGithub);
    console.log(result.linkInstagram);
    console.log(result.linkDiscord);
    }); 
  }

  useEffect(async () => {
    await configBackend();
    urltree_backend.retornarUrlTree().then((result) => {
      if (result.id != 0) {
        setIdUrl(result.id);
      }

      setNomeUrl(result.nomeUrl);
      setLinkLinkedin(result.linkLinkedin);
      setLinkGithub(result.linkGithub);
      setLinkInstagram(result.linkInstagram);
      setLinkDiscord(result.linkDiscord);
    }).catch((error) => {
      console.error('Erro ao obter os dados:', error);
    });
  }, []);

  async function configBackend() {
    let authC = await AuthClient.create();    
    const authenticated = await authC.isAuthenticated();
    
    if (authenticated) {
      Actor.agentOf(urltree_backend).replaceIdentity(
        authC.getIdentity()
      );
    } else {
      window.location.href = "/";
    }
  }
  
 {/*
  const copy = async () => {
    try {
      alert("ENTROU NO COPY");
      // Tentando copiar o link para a área de transferência
      navigator.clipboard.writeText(linkUrl);
      alert("Link copiado para a área de transferência!");
    } catch (err) {
      // Caso ocorra algum erro
      console.error("Falha ao copiar o link:", err);
      alert("Falha ao copiar o link. Tente novamente.");
    }
  }
*/}

  return (
    <main class="flex items-center justify-center min-h-screen" style={{
      backgroundImage: "url('/fundo.jpg')",
      backgroundSize: "cover", // Faz a imagem cobrir toda a tela
      backgroundRepeat: "no-repeat", // Evita repetição da imagem
      backgroundPosition: "center", // Centraliza a imagem no fundo
    }}
  >    
      <form class="w-full max-w-lg p-8 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-md">
        { /* Aparência do spinner */   }
        {carregandoSpinner &&
       <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"> 
          <div class="text-center">
              <div role="status">
                  <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                  <span class="sr-only">Loading...</span>
              </div>
        </div>
      </div> }

        <label for="nomeUrl" class="block mb-2 text-sm font-medium text-white dark:text-white">Profile name</label>
        <div class="flex">
          <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-[#8a8fa6] border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
            </svg>
          </span>
          <input value={nomeUrl} onChange={ (e) => {setNomeUrl(e.target.value) } } type="text" name='nomeUrl' id="nomeUrl" class="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer" placeholder="Username"/>
        </div>
         

        <div class="relative z-0 w-full mt-3 mb-5 group">
            <input value={linkLinkedin} onChange={ (e) => {setLinkLinkedin(e.target.value) } } type="text" name="linkLinkedin" id="linkLinkedin" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 peer cursor-pointer" placeholder=" " required />
            <label for="linkLinkedin" class="peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Link Linkedin</label>
        </div>

        <div class="relative z-0 w-full mb-5 group">
            <input value={linkGithub} onChange={ (e) => {setLinkGithub(e.target.value) } } type="text" name="linkGithub" id="linkGithub" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 peer cursor-pointer" placeholder=" " required />
            <label for="linkGithub" class="peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Link Github</label>
        </div>

        <div class="relative z-0 w-full mb-5 group">
            <input value={linkInstagram} onChange={ (e) => {setLinkInstagram(e.target.value) } } type="text" name="linkInstagram" id="linkInstagram" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 peer cursor-pointer" placeholder=" " required />
            <label for="linkInstagram" class="peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Link Instagram</label>
        </div>

        <div class="relative z-0 w-full mb-5 group">
            <input value={linkDiscord} onChange={ (e) => {setLinkDiscord(e.target.value) } } type="text" name="linkDiscord" id="linkDiscord" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 peer cursor-pointer" placeholder=" " required />
            <label for="linkDiscord" class="peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Link Discord</label>
        </div>
      
        <button onClick={adicionarLinks} type="button"  class="text-white bg-[#8a8fa6] hover:bg-[#70758e] focus:ring-4 focus:outline-none focus:ring-[#9ca1b9] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#6d7183] dark:hover:bg-[#333333]dark:focus::ring-[#222222] cursor-pointer"  disabled={carregandoSpinner}>Submit</button>
        { /* <button onClick={retornarLinks} type="button"  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Teste</button> */ }

        {linkUrl && (
        <div className="mt-5 flex items-center text-sm w-full sm:w-auto px-5 py-2.5 text-center text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
          {/* Link */}
          <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="flex-grow" >
            {linkUrl}
          </a>
        </div>
        )}

      </form>
{/*
      <br/>
      <div class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
        <a href={linkUrl} target="_blank"  >{linkUrl}</a>
      </div>
/*} }

      { /* Aparência do modal */  } 
      {mostrarModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          <h2 className="text-xl font-bold mb-4">Links added!</h2>
          <p className="mb-4">Links added successfully.</p>
          <button
            className="px-4 py-2 bg-[#8a8fa6] text-white rounded  hover:bg-[#70758e] cursor-pointer"
            onClick={() => setMostrarModal(false)}
          >
            Ok
          </button>
        </div>
      </div>
)}

    </main>
  );
}

export default App;
