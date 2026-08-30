import convite from "/convite2.png";
import ornamento2 from "/ornamento2.png";

export default function Local() {


  // Link correto do Google Maps
  const googleMapsUrl =
    "https://maps.app.goo.gl/BV8xAoGa94yyF3Lp7?g_st=ac";

  // Mapa baseado no novo endereço
  const mapEmbedUrl =
    "https://www.google.com/maps?q=Avenida+Propriá,+03A,+Monte+Castelo,+Juazeiro-BA&z=17&output=embed";

  return (
    <section
      className="min-h-screen w-full"
      style={{
        backgroundImage: `url(${convite})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "scroll",
      }}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center px-4 pb-8 pt-3.5 text-center">

        {/* Título */}
        <p className="mb-1.5 mt-4 text-sm uppercase tracking-[0.25em] text-[#4a5c36]">
          Nosso jantar de casamento
        </p>

        <img
          src={ornamento2}
          className="h-5.5"
          alt=""
        />

        <h2
          className="text-5xl text-[#4a5c36]"
          style={{ fontFamily: "Birthstone, cursive" }}
        >
          Local
        </h2>

        {/* Nome do espaço */}
        <div className="mt-8">
          <h3 className="text-3xl font-medium text-[#333]">
            Espaço Castelo Festa
          </h3>

          <p className="mt-3 text-[17px] leading-relaxed text-gray-600">
            Avenida Propriá, 03A,
            <br />
            Monte Castelo, Juazeiro-BA
          </p>
        </div>

        {/* Foto da fachada */}
        <div className="mt-7 w-full overflow-hidden rounded-2xl shadow-md">
          <img
            src="/fachada.jpg"
            alt="Fachada do local do casamento"
            className="block h-auto w-full object-cover"
          />
        </div>

        <p className="mt-3 px-4 text-sm leading-relaxed text-gray-500">
          Para facilitar a identificação do local, confira a foto da fachada
          acima.
        </p>

        {/* Mapa */}
        <div className="mt-7 w-full overflow-hidden rounded-2xl shadow-md">
          <iframe
            title="Local do casamento"
            src={mapEmbedUrl}
            className="block w-full"
            height="280"
            style={{
              border: 0,
            }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Botão */}
        <button
          type="button"
          onClick={() => {
            window.open(
              googleMapsUrl,
              "_blank",
              "noopener,noreferrer"
            );
          }}
          className="mt-5 h-12 w-64 rounded-md bg-[#4a5c36] text-[17px] text-white shadow-md transition hover:bg-[#3a4a2b]"
        >
          Abrir no Google Maps
        </button>

      </div>
    </section>
  );
}
