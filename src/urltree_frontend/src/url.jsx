import { urltree_backend } from 'declarations/urltree_backend';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

function App() {

    const { id } = useParams();

    const [nomeUrl, setNomeUrl] = useState('');
    const [linkLinkedin, setLinkLinkedin] = useState('');
    const [linkGithub, setLinkGithub] = useState('');
    const [linkInstagram, setLinkInstagram] = useState('');
    const [linkDiscord, setLinkDiscord] = useState('');

    useEffect(async () => {
        urltree_backend.retornarUrlTreePorId(parseInt(id)).then((result) => {
            console.log(result.nomeUrl);
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
    <main className="bg-[#122c3a] flex justify-center items-center min-h-screen">
      {/* Container geral */}
      <div className="bg-[#effafc] p-6 rounded-md shadow-md w-[620px] h-[450px]">
        <h2 className="text-azul-7 text-center text-2xl font-bold mb-4"> {/* aqui no social tem que trocar para o nome da pessoa*/}
        {nomeUrl}
        </h2>
        <div className="flex flex-col gap-4">

          {/* Links */}
          <a
            href={linkGithub}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center border-2 border-azul-5 text-azul-14 py-2 px-4 rounded-full hover:bg- hover:text-azul-1 transition"
          >
            <img
              src="github.jpg"
              alt="Github"
              className="h-10 w-10 rounded-full mr-2"
            />
            Github
          </a>
          <a
            href={linkLinkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center border-2 border-azul-5 text-azul-14 py-2 px-4 rounded-full hover:bg-azul-6 hover:text-azul-1 transition"
          >
            <img
              src="linkedin.jpg"
              alt="Linkedin"
              className="h-10 w-10 rounded-full mr-2"
            />
            Linkedin
          </a>
          <a
            href={linkInstagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center border-2 border-azul-5 text-azul-14 py-2 px-4 rounded-full hover:bg-azul-6 hover:text-azul-1 transition"
          >
            <img
              src="instagram.jpg"
              alt="Email"
              className="h-10 w-10 rounded-full mr-2"
            />
            Instagram
          </a>
          <a
            href={linkDiscord}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center border-2 border-azul-5 text-azul-14 py-2 px-4 rounded-full hover:bg-azul-6 hover:text-azul-1 transition"
          >
            <img
              src="discord.jpg"
              alt="Discord"
              className="h-10 w-10 rounded-full mr-2"
            />
            Discord
          </a>
        </div>
      </div>
    </main>
  );
};
export default App;