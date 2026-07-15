import "./App.css";
import { useState } from "react";
import { Link } from "react-router-dom";

import fundoEsquerdo from "./assets/fundo_esquerdo.png";
import fundoDireito from "./assets/fundo_direito.png";
import lacre from "./assets/lacre.png";

function App() {
  const [abrindo, setAbrindo] = useState(false);

  const abrirConvite = () => {
    setAbrindo(true);

    setTimeout(() => {
      console.log("Abrir convite");
    }, 900);
  };

  return (
    <section id='convite' className='  w-screen h-screen bg-[#f5f5f5] relative overflow-hidden'>

     
      <div className=" overflow-y-scroll  convite h-screen  w-full justify-center items-center flex flex-col relative">
      <span className="h1 text-[#4a5c36] text-[17px] fixed bottom-55 "> 02 de agosto de 2026</span>
    <button  onClick={() =>
    window.open(
      "https://maps.google.com/?q=-9.389083,-40.503096",
      "_blank"
    )
  } className="shadow-button absolute bottom-39 w-43 h-10 bg-[#4a5c36] text-white rounded-md hover:bg-[#3a4c26] flex items-center justify-center gap-4">
  <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
  </svg>
  Local do evento
</button>
<Link to="/lista">
   <button className="shadow-button fixed bottom-27 w-43 h-10 bg-[#4a5c36] text-white rounded-md hover:bg-[#3a4c26] flex items-center justify-center gap-2">
  <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
    />
  </svg>
  Lista de presentes
</button> 
</Link> 
        </div>



 <section id="capa-convite" className=" absolute z-10 flex justify-center w-screen h-screen perspective">
      {/* Página esquerda */}
      <div
        className={`relative w-1/2 h-screen shadow z-10 ${
          abrindo ? "abrir-esquerda" : ""
        }`}
      >
        <img
          src={fundoEsquerdo}
          alt=""
          className="h-full w-full"
        />
      </div>

      {/* Página direita */}
      <div
        className={`relative w-1/2 h-screen ${
          abrindo ? "abrir-direita" : ""
        }`}
      >
        <img
          src={fundoDireito}
          alt=""
          className="h-full w-full"
        />
      </div>

      {/* Lacre + faixa */}
      <div className="absolute p-4 w-full h-full flex justify-center items-center z-10">
        <img
          src={lacre}
          alt=""
          onClick={abrirConvite}
          className={`absolute z-10 w-[115px] h-[115px] cursor-pointer ${
            abrindo
              ? "arrancar"
              : "hover:scale-105 transition-transform duration-300"
          }`}
        />

        <div
          className={`w-35 bg-white p-1 pl-[60px] left-1/2 absolute z-8 text-center text-[25px] shadow-all leading-[0.9] nome-convidados text-[#2f4728] ${
            abrindo ? "cair-faixa" : ""
          }`}
        >
          Gabriele e Rodrigo
        </div>

     
      </div>
    </section>
    
    </section>
  
    
  );
}

export default App;