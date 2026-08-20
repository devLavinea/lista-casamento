import { useState } from "react";
import "../index.css";

interface ItemProps {
  id: number;
  nome: string;
  imagem: string;
  preco: string;
  descricao: string;
  valorArrecadado: number;
  onContribuir: (
    id: number,
    nome: string,
    valor: number
  ) => void;
}

function ItemContribuinte({
  id,
  nome,
  imagem,
  preco,
  valorArrecadado,
  onContribuir,
}: ItemProps) {
  const [divAtual, setDivAtual] = useState(2);

  const [nomeDigitado, setNomeDigitado] = useState("");

  const [valorDigitado, setValorDigitado] = useState("");

  const valorMeta =
    Number(String(preco).replace(",", ".")) || 0;

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
      <div className="flex min-h-[135px] w-[40%] items-center justify-center bg-gray-100">

        <img
          src={imagem}
          alt={nome}
          className="h-full w-full object-cover"
        />

      </div>

      {/* TELA PRINCIPAL */}
      {divAtual === 2 && (
        <div className="flex flex-1 flex-col justify-center gap-2 bg-white p-3 px-4">

          <h2 className="text-center text-[17px] font-semibold text-[#4F6B4A]">
            {nome}
          </h2>

          {/* BARRA */}
          <div className="w-full">

            <div className="mb-1 flex justify-between text-[10px] text-gray-500">

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

            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">

              <div
                className="h-full rounded-full bg-[#4F6B4A] transition-all duration-500"
                style={{
                  width: `${porcentagem}%`,
                }}
              />

            </div>

            <p className="mt-1 text-center text-[14px] text-gray-500">
              Meta: R$ {preco}
            </p>

          </div>

          <button
            onClick={() => setDivAtual(3)}
            className="rounded-lg bg-[#4F6B4A] py-1.5 text-[13px] text-white"
          >
            Contribuir
          </button>

        </div>
      )}

      {/* DIGITAR VALOR */}
      {divAtual === 3 && (
        <div className="flex flex-1 flex-col justify-center gap-2 bg-white p-3">

          <h2 className="text-center text-[13px] font-semibold text-[#4F6B4A]">
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
            className="w-full rounded-lg border border-gray-300 px-2 py-1.5 text-[13px] focus:outline-none"
          />

          <button
            onClick={continuarContribuicao}
            className="rounded-lg bg-[#4F6B4A] py-1.5 text-[13px] text-white"
          >
            Continuar
          </button>

          <button
            onClick={() => setDivAtual(2)}
            className="text-[13px] text-gray-400"
          >
            Voltar
          </button>

        </div>
      )}

      {/* PIX */}
      {divAtual === 4 && (
        <div className="flex flex-1 flex-col justify-center gap-2 bg-white p-3">

          <h2 className="text-center text-[13px] font-semibold text-[#4F6B4A]">
            Faça sua contribuição via Pix
          </h2>

          <p className="text-center text-[12px] text-gray-500">
            Valor da contribuição:
          </p>

          <p className="text-center text-lg font-semibold text-[#4F6B4A]">
            R${" "}
            {Number(
              valorDigitado.replace(",", ".")
            )
              .toFixed(2)
              .replace(".", ",")}
          </p>

          <div className="rounded-lg bg-[#eef4e9] p-2 text-center">

            <p className="text-[13px] text-gray-500">
              Chave Pix
            </p>

            <p className="break-all text-[14px] font-semibold text-[#4F6B4A]">
              74988248014
            </p>

            <p className="mt-1 text-[13px] text-gray-500">
              Lavinea Souza
            </p>

            <p className="text-[13px] text-gray-500">
              Mercado Pago
            </p>

          </div>

          <p className="text-center text-[11px] text-gray-400">
            Após realizar o Pix, confirme sua contribuição.
          </p>

          <button
            onClick={() => setDivAtual(5)}
            className="rounded-lg bg-[#4F6B4A] py-1.5 text-[13px] text-white"
          >
            Já fiz o Pix
          </button>

          <button
            onClick={() => setDivAtual(3)}
            className="text-[13px] text-gray-400"
          >
            Voltar
          </button>

        </div>
      )}

      {/* NOME */}
      {divAtual === 5 && (
        <div className="flex flex-1 flex-col justify-center gap-2 bg-white p-3">

          <h2 className="text-center text-[13px] font-semibold text-[#4F6B4A]">
            Identificar contribuição
          </h2>

          <p className="text-center text-[11px] text-gray-500">
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
            className="w-full rounded-lg border border-gray-300 px-2 py-1.5 text-[13px] focus:outline-none"
          />

          <button
            onClick={confirmarContribuicao}
            className="rounded-lg bg-[#4F6B4A] py-1.5 text-[13px] text-white"
          >
            Confirmar contribuição
          </button>

          <button
            onClick={() => setDivAtual(4)}
            className="text-[13px] text-gray-400"
          >
            Voltar
          </button>

        </div>
      )}

    </div>
  );
}

export default ItemContribuinte;
