import { useEffect, useState } from "react";
import Item from "./components/item";
import ItemContribuinte from "./components/item-contribuinte";
import { supabase } from "./services/supabase";
import "./index.css";

interface Presente {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
  preco: string;
  link: string;
  valorArrecadado: number;
  tipo: string;
  reservado: boolean;
}

function List() {
  const [presentes, setPresentes] = useState<Presente[]>([]);

  // Controla somente o aviso de abertura
  const [avisoInicial, setAvisoInicial] = useState(true);
  const [textoDigitado, setTextoDigitado] = useState("");

  const textoAviso = `Apenas Sugestões

O valor é apenas uma referência.

Você pode se juntar a um amigo ou familiar e dividir o presente.

Clique em “Reservar” para escolher.`;

  // ===============================
  // BUSCAR PRESENTES
  // ===============================

  async function buscarPresentes() {
    const { data, error } = await supabase
      .from("presentes")
      .select("*")
      .order("id");

    if (error) {
      console.log(error);
      return;
    }

    setPresentes(data || []);
  }

  // ===============================
  // RESERVAR PRESENTE
  // ===============================

  async function reservarPresente(id: number, nome: string) {
    if (!nome.trim()) {
      alert("Digite seu nome");
      return;
    }

    localStorage.setItem(`reserva_${id}`, nome);

    const { error } = await supabase
      .from("presentes")
      .update({
        reservado: true,
        reservado_por: nome,
      })
      .eq("id", id);

    if (error) {
      console.log(error);
      return;
    }

    buscarPresentes();
  }

  // ===============================
  // CANCELAR RESERVA
  // ===============================

  async function cancelarReserva(id: number) {
    localStorage.removeItem(`reserva_${id}`);

    const { error } = await supabase
      .from("presentes")
      .update({
        reservado: false,
        reservado_por: null,
      })
      .eq("id", id);

    if (error) {
      console.log(error);
      return;
    }

    buscarPresentes();
  }

  // ===============================
  // REGISTRAR CONTRIBUIÇÃO
  // ===============================

  async function registrarContribuicao(
    id: number,
    nome: string,
    valor: number
  ) {
    if (!nome.trim()) {
      alert("Digite seu nome");
      return;
    }

    if (!valor || valor <= 0) {
      alert("Digite um valor válido");
      return;
    }

    const { data, error: erroBusca } = await supabase
      .from("presentes")
      .select("valorArrecadado")
      .eq("id", id)
      .single();

    if (erroBusca) {
      console.log(erroBusca);
      alert("Não foi possível buscar o valor arrecadado.");
      return;
    }

    const valorAtual = Number(data?.valorArrecadado) || 0;

    const novoValor = valorAtual + valor;

    const { error } = await supabase
      .from("presentes")
      .update({
        valorArrecadado: novoValor,
      })
      .eq("id", id);

    if (error) {
      console.log(error);
      alert("Não foi possível registrar a contribuição.");
      return;
    }

    const contribuicoesSalvas = JSON.parse(
      localStorage.getItem(`contribuicoes_${id}`) || "[]"
    );

    contribuicoesSalvas.push({
      nome,
      valor,
    });

    localStorage.setItem(
      `contribuicoes_${id}`,
      JSON.stringify(contribuicoesSalvas)
    );

    buscarPresentes();
  }

  // ===============================
  // BUSCAR AO ABRIR A PÁGINA
  // ===============================

  useEffect(() => {
    buscarPresentes();
  }, []);

  // ===============================
  // ANIMAÇÃO DO AVISO INICIAL
  // ===============================

  useEffect(() => {
    if (!avisoInicial) return;

    let indice = 0;

    const intervalo = setInterval(() => {
      setTextoDigitado(textoAviso.slice(0, indice + 1));

      indice++;

      if (indice >= textoAviso.length) {
        clearInterval(intervalo);

        // Tempo para visualizar o texto completo
        setTimeout(() => {
          // O aviso grande simplesmente desaparece
          setAvisoInicial(false);
        }, 1200);
      }
    }, 35);

    return () => {
      clearInterval(intervalo);
    };
  }, [avisoInicial]);

  return (
    <section className="relative">

      {/* ================================================= */}
      {/* TÍTULO */}
      {/* ================================================= */}

      <div className="w-full bg-[#4F6B4A] flex flex-col items-center justify-center py-2">
        <h1 className="text-[40px] nome-convidados font-semibold text-[#ffffff] text-center">
          Lista de Presentes
        </h1>
      </div>


      {/* ================================================= */}
      {/* AVISO PEQUENO DA PÁGINA */}
      {/* ================================================= */}
      {/* 
          ESTE AVISO SEMPRE EXISTE NO FLUXO NORMAL DA PÁGINA.

          Ele NÃO é fixed.
          Ele NÃO é sticky.
          Ele NÃO é absolute.

          Portanto, quando a página rolar, ele rola junto.
      */}

      <div
        className="
          relative
          w-auto
          mx-4
          mt-2
          mb-6
          px-3
          py-3
          rounded-xl
          bg-[#eef4e9]
          text-[#4F6B4A]
        "
      >
        <div
          className="
            flex
            items-start
            gap-3
            w-full
          "
        >

          {/* ÍCONE */}
          <div
            className="
              text-[#4F6B4A]
              text-[22px]
              leading-none
              mt-1
              flex-shrink-0
            "
          >
            ⓘ
          </div>

          {/* TEXTO */}
          <p
            className="
              text-[13px]
              text-center
              leading-relaxed
              text-[#4F6B4A]
              w-full
            "
          >
            Apenas Sugestões
            <br />

            <strong>
              O valor é apenas uma referência.
            </strong>

            <br />

            Você pode se juntar a um amigo ou familiar e dividir o presente.

            <br />

            Clique em <strong>“Reservar”</strong> para escolher.
          </p>

        </div>
      </div>


      {/* ================================================= */}
      {/* AVISO DE ABERTURA */}
      {/* ================================================= */}
      {/* 
          ESTE É OUTRO ELEMENTO.

          Ele começa fixed.
          Digita as letras.
          Depois desaparece completamente.

          Ele NÃO se transforma no aviso pequeno.
      */}

      {avisoInicial && (
        <div
          className="
            fixed
            inset-0
            z-[9999]
            w-full
            h-full
            bg-[#eef4e9]
            text-[#4F6B4A]
            flex
            items-center
            justify-center
          "
        >
          <div
            className="
              flex
              items-start
              gap-3
              w-[85%]
              max-w-[500px]
            "
          >

            {/* ÍCONE */}
            <div
              className="
                text-[#4F6B4A]
                text-[22px]
                leading-none
                mt-1
                flex-shrink-0
              "
            >
              ⓘ
            </div>

            {/* TEXTO DIGITANDO */}
            <p
              className="
                text-[18px]
                leading-relaxed
                text-[#4F6B4A]
                whitespace-pre-line
              "
            >
              {textoDigitado}
              <span className="animate-pulse">|</span>
            </p>

          </div>
        </div>
      )}


      {/* ================================================= */}
      {/* PRESENTES NORMAIS */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 gap-4 p-4">
        {presentes
          .filter(
            (presente) =>
              presente.tipo === "presente"
          )
          .map((presente) => (
            <Item
              key={presente.id}
              id={presente.id}
              nome={presente.nome}
              imagem={presente.imagem}
              descricao={presente.descricao}
              preco={presente.preco}
              link={presente.link}
              reservado={presente.reservado}
              onReservar={reservarPresente}
              onCancelar={cancelarReserva}
            />
          ))}
      </div>


      {/* ================================================= */}
      {/* CONTRIBUIÇÕES */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 gap-4 p-4">
        {presentes
          .filter(
            (presente) =>
              presente.tipo === "contribuicao"
          )
          .map((presente) => (
            <ItemContribuinte
              key={presente.id}
              id={presente.id}
              nome={presente.nome}
              imagem={presente.imagem}
              descricao={presente.descricao}
              preco={presente.preco}
              valorArrecadado={presente.valorArrecadado}
              onContribuir={registrarContribuicao}
            />
          ))}
      </div>

    </section>
  );
}

export default List;
