import React from "react";

export default function Local() {
  

  const googleMapsUrl = `https://maps.app.goo.gl/b9hub9jB98hMG8TFA`;

  return (
    <section className="w-full bg-white px-5 py-12">
      <div className="mx-auto w-full max-w-2xl text-center">

        {/* Título */}
        <p className="mb-2 text-sm uppercase tracking-[0.25em] text-[#4a5c36]">
          Nosso jantar de casamento
        </p>

        <h2
          className="text-4xl text-[#4a5c36]"
          style={{ fontFamily: "Birthstone, cursive" }}
        >
          Local
        </h2>

        {/* Nome do espaço */}
        <div className="mt-8">
          <h3 className="text-xl font-medium text-[#333]">
            Espaço Bela Vista
          </h3>

          <p className="mt-2 text-[15px] leading-relaxed text-gray-600">
            Ba 210, N°12, Bairro Pedro Raimundo 


            <br />
            Juazeiro-BA
            <br />
            Próximo  ao "Construção Jangadeiro"
          </p>
        </div>

        {/* Mapa */}
        <div className="mt-7 overflow-hidden rounded-2xl shadow-md">
          <iframe
            title="Local do casamento"
            src={`https://maps.app.goo.gl/b9hub9jB98hMG8TFA`}
            width="100%"
            height="300"
            style={{
              border: 0,
              display: "block",
            }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Botão */}
        <button
          onClick={() => window.open(googleMapsUrl, "_blank")}
          className="mt-5 h-11 w-52 rounded-md bg-[#4a5c36] text-[16px] text-white shadow-md transition hover:bg-[#3a4a2b]"
        >
          Abrir no Google Maps
        </button>

      </div>
    </section>
  );
}
