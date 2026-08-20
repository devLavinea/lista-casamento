import "./App.css";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

import noivos from "/noivos.png";
import fundoEsquerdo from "/fundo_esquerdo.png";
import fundoDireito from "/fundo_direito.png";
import convite from "/convite2.png";
import lacre from "/lacre.png";
import ornamento2 from "/ornamento2.png";
import ornamento3 from "/ornamento3.png";
import audio from "/audio.mp3";
import video from "/video.mp4";

function App() {
  const [abrindo, setAbrindo] = useState(false);
  const [mostrarConvite, setMostrarConvite] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Abre o convite e inicia música + vídeo
  const abrirConvite = () => {
    setAbrindo(true);

    // Inicia a música
    if (audioRef.current) {
      audioRef.current.currentTime = 0;

      audioRef.current.play().catch((erro) => {
        console.log("Não foi possível iniciar a música:", erro);
      });
    }

    // Inicia o vídeo
    if (videoRef.current) {
      videoRef.current.currentTime = 0;

      videoRef.current.play().catch((erro) => {
        console.log("Erro ao iniciar o vídeo:", erro);
      });
    }
  };

  // Para a música completamente
  const pararMusica = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // Quando o vídeo terminar
  const videoTerminou = () => {
    setMostrarConvite(true);
  };

  return (
    <>
      {/* MÚSICA */}
      <audio
        ref={audioRef}
        src={audio}
        loop
        preload="auto"
      />

      <section
        id="convite"
        className="relative overflow-hidden w-screen h-screen"
      >
        {/* VÍDEO */}
        <video
          src={video}
          ref={videoRef}
          playsInline
          onEnded={videoTerminou}
          className={`video-convite absolute w-full h-full ${
            mostrarConvite ? "hidden" : ""
          }`}
        />

        {/* CONVITE */}
        <div
          id="convite-content"
          className={`${
            !mostrarConvite ? "hidden" : ""
          } fade-in justify-center overflow-hidden pt-5 convite h-screen w-full text-center items-center flex flex-col gap-1`}
          style={{
            backgroundImage: `url(${convite})`,
          }}
        >
          <p className="text-[#4a5c36] leading-tight text-[20px]">
            Venha comemorar conosco <br />
            no nosso jantar de casamento!
          </p>

          <img
            src={ornamento2}
            className="h-5.5"
            alt=""
          />

          <img
            src={noivos}
            className="w-70"
            alt="Noivos"
          />

          <img
            src={ornamento2}
            className="h-5.5"
            alt=""
          />

          <span className="text-[#4a5c36] text-[22px]">
            24 de outubro de 2026,{" "}
            <strong>às 18:00</strong>
          </span>

          <img
            src={ornamento3}
            className="h-6 mb-2"
            alt=""
          />

          {/* BOTÃO LOCAL DO EVENTO */}
          <button
            type="button"
            onClick={() => {
              // PARA A MÚSICA ANTES DE ABRIR O MAPA
              pararMusica();

              window.open(
                "https://maps.app.goo.gl/b9hub9jB98hMG8TFA",
                "_blank"
              );
            }}
            className="shadow-button mt-2 text-[18px] w-50 h-10 bg-[#4a5c36] text-white rounded-md hover:bg-[#3a4c26] flex items-center justify-center gap-4"
          >
            <svg
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>

            Local do evento
          </button>

          {/* BOTÃO LISTA DE PRESENTES */}
          <Link
            to="/lista"
            onClick={pararMusica}
          >
            <button
              type="button"
              className="shadow-button mt-2 text-[18px] w-50 h-10 bg-[#4a5c36] text-white rounded-md hover:bg-[#3a4c26] flex items-center justify-center gap-2"
            >
              <svg
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
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

        {/* CAPA DO CONVITE */}
        <section
          id="capa-convite"
          className="absolute z-10 justify-center w-screen h-screen perspective"
        >
          {/* PÁGINA ESQUERDA */}
          <div
            className={`absolute w-1/2 h-screen shadow z-11 ${
              abrindo ? "abrir-esquerda" : ""
            }`}
          >
            <img
              src={fundoEsquerdo}
              alt=""
              className="h-full w-full"
            />
          </div>

          {/* PÁGINA DIREITA */}
          <div
            className={`absolute w-1/2 h-screen left-[50%] z-10 ${
              abrindo ? "abrir-direita" : ""
            }`}
          >
            <img
              src={fundoDireito}
              alt=""
              className="h-full w-full"
            />
          </div>

          {/* LACRE + FAIXA */}
          <div className="absolute p-4 w-full h-full flex justify-center items-center z-12">
            {/* LACRE */}
            <img
              src={lacre}
              alt="Lacre"
              onClick={abrirConvite}
              className={`absolute z-10 w-28.75 h-28.75 cursor-pointer ${
                abrindo
                  ? "arrancar"
                  : "hover:scale-105 transition-transform duration-300"
              }`}
            />

            {/* FAIXA */}
            <div
              className={`w-40 bg-white p-2 pl-14 left-1/2 absolute z-8 text-center text-[13px] shadow-all leading-[0.9] text-[#2f4728] ${
                abrindo ? "cair-faixa" : ""
              }`}
            >
              Clique no lacre para abrir o convite.
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

export default App;
