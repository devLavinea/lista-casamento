import { useState } from "react";
import "../index.css";

interface ItemProps {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
  preco: string;
  reservado: boolean;
  onReservar: (id: number, nome: string) => void;
  onCancelar: (id: number) => void;
}

function Item({
  id,
  nome,
  descricao,
  imagem,
  preco,
  reservado,
  onReservar,
  onCancelar,
}: ItemProps) {
  const [divAtual, setDivAtual] = useState(2);
  const [nomeDigitado, setNomeDigitado] = useState("");

  const minhaReserva = localStorage.getItem(`reserva_${id}`);

  function confirmarReserva() {
    if (!nomeDigitado.trim()) {
      alert("Digite seu nome");
      return;
    }

    onReservar(id, nomeDigitado);
    setDivAtual(4);
  }

  return (
    <div className="w-full -min-h-[135px] bg-white rounded-xl shadow-md overflow-hidden flex">

      {/* IMAGEM */}
      <div className="w-[40%] -min-h-[135px] bg-gray-100 flex items-center justify-center">
        <img
          src={imagem}
          alt={nome}
          className="w-full h-full object-cover"
        />
      </div>

      {/* PRIMEIRA TELA */}
      {!reservado && (
        <div
          className={`${
            divAtual === 2 ? "flex" : "hidden"
          } flex-1 bg-white p-3 px-4 flex-col justify-center gap-2`}
        >
          <h2 className="text-[17px] font-semibold text-[#4F6B4A] text-center">
            {nome}
          </h2>
           <p className="text-xs text-center text-gray-500">
            {descricao}
          </p>


          {/* PREÇO */}
          <div className="flex justify-center">
            <span className="bg-[#eef4e9] text-[#4F6B4A] font-semibold text-sm px-3 py-1 rounded-lg">
              R$ {preco}
            </span>
          </div>

          <p className="text-xs text-center text-gray-500">
            Deseja reservar este presente?
          </p>

          <button
            onClick={() => setDivAtual(3)}
            className="bg-[#4F6B4A] text-white rounded-lg text-xs py-1.5"
          >
            Reservar
          </button>
        </div>
      )}

      {/* TELA DE DIGITAR NOME */}
      {!reservado && (
        <div
          className={`${
            divAtual === 3 ? "flex" : "hidden"
          } flex-1 bg-white p-3 flex-col justify-center gap-2`}
        >
          <h2 className="text-sm font-semibold text-[#4F6B4A] text-center">
            Reservar presente
          </h2>

          <input
            type="text"
            placeholder="Digite seu nome"
            value={nomeDigitado}
            onChange={(e) => setNomeDigitado(e.target.value)}
            className="w-full text-xs px-2 py-1.5 rounded-lg border border-gray-300 focus:outline-none"
          />

          <button
            onClick={confirmarReserva}
            className="bg-[#4F6B4A] text-white rounded-lg text-xs py-1.5"
          >
            Confirmar
          </button>
        </div>
      )}

      {/* PRESENTE RESERVADO */}
      {reservado && (
        <div className="flex-1 bg-white p-3 flex flex-col justify-center gap-1">

          <h2 className=" text-[17px] font-semibold text-[#4F6B4A] text-center">
            {nome}
          </h2>

           <p className="text-[9px] text-center text-gray-400 leading-tight opacity-70">
                Você pode comprar este presente onde preferir.
              </p>


          {/* PREÇO */}
          <div className="flex justify-center">
            <span className="bg-[#eef4e9] text-[#4F6B4A] font-semibold text-sm px-3 py-1 rounded-lg">
              R$ {preco}
            </span>
          </div>

          <p className="text-sm text-center text-gray-500">
            {minhaReserva
              ? `Reservado por ${minhaReserva}`
              : "Presente reservado 🎁"}
          </p>

          {minhaReserva && (
            <>
              <p className="text-[9px] text-center text-gray-400 leading-tight opacity-70">
                {descricao}
              </p>

              <button className="flex items-center justify-center gap-1 border border-[#4F6B4A] text-[#4F6B4A] text-xs py-1 rounded-lg">
                🛒 Comprar
              </button>

              <button className="flex items-center justify-center gap-1 border border-[#4F6B4A] text-[#4F6B4A] text-xs py-1 rounded-lg">
                💡 Sugestões
              </button>

              <button
                onClick={() => onCancelar(id)}
                className="text-red-500 text-xs py-1"
              >
                ✖ Cancelar Reserva
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Item;