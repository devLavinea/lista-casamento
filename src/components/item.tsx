import { useState } from "react";

interface ItemProps {
  id:number;
  nome:string;
  imagem:string;
  reservado:boolean;
  onReservar:(id:number,nome:string)=>void;
  onCancelar:(id:number)=>void;
}

function Item({
  id,
  nome,
  imagem,
  reservado,
  onReservar,
  onCancelar
}:ItemProps){

  const [divAtual,setDivAtual] = useState(2);
  const [nomeDigitado,setNomeDigitado] = useState("");

  const minhaReserva = localStorage.getItem(`reserva_${id}`);

  function confirmarReserva(){
    if(!nomeDigitado.trim()){
      alert("Digite seu nome");
      return;
    }

    onReservar(id,nomeDigitado);
    setDivAtual(4);
  }

  return (
    <div className="w-full max-w-md h-38 bg-white rounded-lg shadow-md overflow-hidden flex">

      <div className="w-1/2 h-full bg-gray-100 flex items-center justify-center">
        <img
          src={imagem}
          alt={nome}
          className="w-full h-full object-cover"
        />
      </div>

      {!reservado && (
        <div className={`${divAtual===2 ? "flex":"hidden"} flex-1 bg-white p-3 px-5 flex-col justify-center gap-3`}>
          <h2 className="text-sm font-semibold text-[#4F6B4A] text-center">
            {nome}
          </h2>

          <p className="text-xs text-center text-gray-500">
            Deseja reservar este presente?
          </p>

          <button
            onClick={()=>setDivAtual(3)}
            className="bg-[#4F6B4A] text-white rounded-lg text-xs py-1.5"
          >
            Reservar
          </button>
        </div>
      )}

      {!reservado && (
        <div className={`${divAtual===3 ? "flex":"hidden"} flex-1 bg-white p-3 flex-col justify-center gap-2`}>
          <h2 className="text-sm font-semibold text-[#4F6B4A] text-center">
            Reservar presente
          </h2>

          <input
            type="text"
            placeholder="Digite seu nome"
            value={nomeDigitado}
            onChange={(e)=>setNomeDigitado(e.target.value)}
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

      {reservado && (
        <div className="flex-1 bg-white p-3 flex flex-col justify-center gap-1">
          <h2 className="text-sm font-semibold text-[#4F6B4A] text-center">
            {nome}
          </h2>

          <p className="text-xs text-center text-gray-500">
            {minhaReserva ? minhaReserva : "Presente reservado 🎁"}
          </p>

          {minhaReserva && (
            <>
              <p className="text-[8px] text-center text-gray-400 leading-tight opacity-70">
Você pode comprar aqui ou onde preferir.</p>
              <button className="flex items-center justify-center gap-1 bg-[#4F6B4A] text-white text-xs py-1 rounded-lg">
                🛒 Comprar
              </button>
            

              <button className="flex items-center justify-center gap-1 border border-[#4F6B4A] text-[#4F6B4A] text-xs py-1 rounded-lg">
                💡 Sugestões
              </button>

              <button
                onClick={()=>onCancelar(id)}
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