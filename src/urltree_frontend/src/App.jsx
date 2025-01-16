import { useState } from 'react';
import { useEffect } from 'react';
import { urltree_backend } from 'declarations/urltree_backend';

function App() {
  const [nomeUrl, setNomeUrl] = useState('');
  const [linkLinkedin, setLinkLinkedin] = useState('');
  const [linkGithub, setLinkGithub] = useState('');
  const [linkInstagram, setLinkInstagram] = useState('');
  const [linkDiscord, setLinkDiscord] = useState('');
  
//criar função para enviar estes dados para o backend adicionarUrlTree

  const adicionarLinks = (event) => {
    event.preventDefault();
    urltree_backend.adicionarUrlTree( nomeUrl, linkLinkedin, linkGithub, linkInstagram, linkDiscord ).then(() => {
    alert('Links adicionados com sucesso');
    });
    return false;
  }

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

  useEffect(() => {
    urltree_backend.retornarUrlTree().then((result) => {
      setNomeUrl(result.nomeUrl);
      setLinkLinkedin(result.linkLinkedin);
      setLinkGithub(result.linkGithub);
      setLinkInstagram(result.linkInstagram);
      setLinkDiscord(result.linkDiscord);
    }).catch((error) => {
      console.error('Erro ao obter os dados:', error);
    });
  }, []);

  return (
    <main class="flex items-center justify-center min-h-screen bg-gray-100">    
      <form class="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        { /* adicionar campo para nome do url tree OK e ajeitar layout, poe um card redondo   */   }
        <label for="nomeUrl" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome Perfil</label>
        <div class="flex">
          <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
            </svg>
          </span>
          <input value={nomeUrl} onChange={ (e) => {setNomeUrl(e.target.value) } } type="text" name='nomeUrl' id="nomeUrl" class="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bonnie Green"/>
        </div>
         

        <div class="relative z-0 w-full mt-3 mb-5 group">
            <input value={linkLinkedin} onChange={ (e) => {setLinkLinkedin(e.target.value) } } type="text" name="linkLinkedin" id="linkLinkedin" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="linkLinkedin" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Link Linkedin</label>
        </div>

        <div class="relative z-0 w-full mb-5 group">
            <input value={linkGithub} onChange={ (e) => {setLinkGithub(e.target.value) } } type="text" name="linkGithub" id="linkGithub" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="linkGithub" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Link Github</label>
        </div>

        <div class="relative z-0 w-full mb-5 group">
            <input value={linkInstagram} onChange={ (e) => {setLinkInstagram(e.target.value) } } type="text" name="linkInstagram" id="linkInstagram" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="linkInstagram" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Link Instagran</label>
        </div>

        <div class="relative z-0 w-full mb-5 group">
            <input value={linkDiscord} onChange={ (e) => {setLinkDiscord(e.target.value) } } type="text" name="linkDiscord" id="linkDiscord" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="linkDiscord" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Link Discord</label>
        </div>
      
        <button onClick={adicionarLinks} type="button"  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        <button onClick={retornarLinks} type="button"  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Teste</button>
      </form>



    </main>
  );
}

export default App;
