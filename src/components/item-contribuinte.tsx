import { useState } from "react";
import "../index.css";

interface ItemProps {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
  preco: string;
  valorArrecadado: number;
  reservado: boolean;
  onContribuir: (
    id: number,
    nome: string,
    valor: number
  ) => void;
  onCancelar: (id: number) => void;
}

function ItemContribuinte({
  id,
  nome,
  descricao,
  imagem,
  preco,
  valorArrecadado,
  onContribuir,
}: ItemProps) {
  const [divAtual, setDivAtual] = useState(2);

  const [nomeDigitado, setNomeDigitado] =
    useState("");

  const [valorDigitado, setValorDigitado] =
    useState("");

  const valorMeta =
    Number(
      String(preco).replace(",", ".")
    ) || 0;

  const porcentagem =
    valorMeta > 0
      ? Math.min(
          (valorArrecadado / valorMeta) * 100,
          100
        )
      : 0;

  function continuarContribuicao() {
    const valor = Number(
      valorDigitado.replace(",", ".")
    );

    if (!valorDigitado.trim()) {
      alert(
        "Digite o valor que deseja contribuir."
      );
      return;
    }

    if (isNaN(valor) || valor <= 0) {
      alert("Digite um valor válido.");
      return;
    }

    setDivAtual(4);
  }

  function confirmarContribuicao() {
    if (!nomeDigitado.trim()) {
      alert("Digite seu nome.");
      return;
    }

    const valor = Number(
      valorDigitado.replace(",", ".")
    );

    if (isNaN(valor) || valor <= 0) {
      alert("Digite um valor válido.");
      return;
    }

    onContribuir(
      id,
      nomeDigitado,
      valor
    );

    setDivAtual(2);

    setNomeDigitado("");
    setValorDigitado("");

    alert(
      "Obrigado pela contribuição! 💚"
    );
  }

  return (
    <div className="flex w-full overflow-hidden rounded-xl shadow-sm">

      {/* IMAGEM */}
      <div className="w-[40%] min-h-[135px] bg-gray-100 flex items-center justify-center">

        <img
          src={imagem}
          alt={nome}
          className="w-full h-full object-cover"
        />

      </div>

      {/* TELA PRINCIPAL */}
      {divAtual === 2 && (
        <div className="flex-1 bg-white p-3 px-4 flex flex-col justify-center gap-2">

          <h2 className="text-[17px] font-semibold text-[#4F6B4A] text-center">
            {nome}
          </h2>

          {/* BARRA */}
          <div className="w-full">

            <div className="flex justify-between text-[10px] text-gray-500 mb-1">

              <span>
                R${" "}
                {valorArrecadado
                  .toFixed(2)
                  .replace(".", ",")}{" "}
                arrecadados
              </span>

              <span>
                {Math.round(porcentagem)}%
              </span>

            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">

              <div
                className="h-full bg-[#4F6B4A] rounded-full transition-all duration-500"
                style={{
                  width: `${porcentagem}%`,
                }}
              />

            </div>

            <p className="text-[14px] text-center text-gray-500 mt-1">
              Meta: R$ {preco}
            </p>

          </div>

          <button
            onClick={() => setDivAtual(3)}
            className="bg-[#4F6B4A] text-white rounded-lg text-xs py-1.5"
          >
            Contribuir
          </button>

        </div>
      )}

      {/* DIGITAR VALOR */}
      {divAtual === 3 && (
        <div className="flex-1 bg-white p-3 flex flex-col justify-center gap-2">

          <h2 className="text-sm font-semibold text-[#4F6B4A] text-center">
            Quanto você deseja contribuir?
          </h2>

          <input
            type="text"
            inputMode="decimal"
            placeholder="Digite o valor"
            value={valorDigitado}
            onChange={(e) =>
              setValorDigitado(
                e.target.value
              )
            }
            className="w-full text-xs px-2 py-1.5 rounded-lg border border-gray-300 focus:outline-none"
          />

          <button
            onClick={
              continuarContribuicao
            }
            className="bg-[#4F6B4A] text-white rounded-lg text-xs py-1.5"
          >
            Continuar
          </button>

          <button
            onClick={() => setDivAtual(2)}
            className="text-gray-400 text-xs"
          >
            Voltar
          </button>

        </div>
      )}

      {/* PIX */}
      {divAtual === 4 && (
        <div className="flex-1 bg-white p-3 flex flex-col justify-center gap-2">

          <h2 className="text-sm font-semibold text-[#4F6B4A] text-center">
            Faça sua contribuição via Pix
          </h2>

          <p className="text-[10px] text-center text-gray-500">
            Valor da contribuição:
          </p>

          <p className="text-lg font-semibold text-[#4F6B4A] text-center">
            R${" "}
            {Number(
              valorDigitado.replace(",", ".")
            )
              .toFixed(2)
              .replace(".", ",")}
          </p>

          <div className="bg-[#eef4e9] rounded-lg p-2 text-center">

            <p className="text-[10px] text-gray-500">
              Chave Pix
            </p>

            <p className="text-sm font-semibold text-[#4F6B4A] break-all">
              74988248014
            </p>

            <p className="text-[10px] text-gray-500 mt-1">
              Lavinea Souza
            </p>

            <p className="text-[10px] text-gray-500">
              Mercado Pago
            </p>

          </div>

          <p className="text-[9px] text-center text-gray-400">
            Após realizar o Pix, confirme sua contribuição.
          </p>

          <button
            onClick={() => setDivAtual(5)}
            className="bg-[#4F6B4A] text-white rounded-lg text-xs py-1.5"
          >
            Já fiz o Pix
          </button>

          <button
            onClick={() => setDivAtual(3)}
            className="text-gray-400 text-xs"
          >
            Voltar
          </button>

        </div>
      )}

      {/* NOME */}
      {divAtual === 5 && (
        <div className="flex-1 bg-white p-3 flex flex-col justify-center gap-2">

          <h2 className="text-sm font-semibold text-[#4F6B4A] text-center">
            Identificar contribuição
          </h2>

          <p className="text-[10px] text-center text-gray-500">
            Digite seu nome para registrar sua contribuição.
          </p>

          <input
            type="text"
            placeholder="Digite seu nome"
            value={nomeDigitado}
            onChange={(e) =>
              setNomeDigitado(
                e.target.value
              )
            }
            className="w-full text-xs px-2 py-1.5 rounded-lg border border-gray-300 focus:outline-none"
          />

          <button
            onClick={
              confirmarContribuicao
            }
            className="bg-[#4F6B4A] text-white rounded-lg text-xs py-1.5"
          >
            Confirmar contribuição
          </button>

          <button
            onClick={() => setDivAtual(4)}
            className="text-gray-400 text-xs"
          >
            Voltar
          </button>

        </div>
      )}

    </div>
  );
}

export default ItemContribuinte;