
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

  // RESERVAR PRESENTE NORMAL
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

  // CANCELAR RESERVA DE PRESENTE NORMAL
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

  // REGISTRAR CONTRIBUIÇÃO
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

    // Busca o valor atual no Supabase
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

    // Atualiza somente o valor arrecadado
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

    // Guarda localmente quem contribuiu
    const contribuicoesSalvas =
      JSON.parse(
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

    // Atualiza a lista
    buscarPresentes();
  }

  useEffect(() => {
    buscarPresentes();
  }, []);

  return (
    <section>

      {/* TÍTULO */}
            <div className="w-full h-15 bg-[#4F6B4A] flex flex-col items-center justify-center gap-2">

                <h1 className=" text-[40px] nome-convidados font-semibold text-[#ffffff] text-center">

          Lista de Presentes
        </h1>
      </div>

      {/* AVISO SOBRE OS VALORES */}
      <div className="mx-4 mb-6 mt-2 rounded-xl bg-[#eef4e9] px-3 py-3 flex items-start gap-3">

        <div className="text-[#4F6B4A] text-[22px] leading-none mt-1">
          ⓘ
        </div>

        <p className="text-[13px] text-center leading-relaxed text-[#4F6B4A]">
  Sugestões escolhidas com carinho. <br /> <strong >O valor é apenas uma referência.</strong>
  <br />
   Você pode se juntar a um amigo ou familiar e dividir o presente.
  <br />
  Clique em <strong>“Reservar”</strong> para escolher.
</p>

      </div>

      {/* PRESENTES NORMAIS */}
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

      {/* OUTRAS FORMAS DE PRESENTEAR */}
      <div className="w-fulFl flex flex-col justify-center items-center py-6">

        <h1 className=" text-[40px] font-bold nome-convidados text-[#4F6B4A] text-center">
          Outras formas de presentear
        </h1>
        
      </div>

      {/* AVISO SOBRE OS VALORES */}
      <div className="mx-4 mb-6 mt-2 rounded-xl bg-[#eef4e9] px-3 py-3 flex items-start gap-3">

        <div className="text-[#4F6B4A] text-lg leading-none mt-1">
          ⓘ
        </div>

        <p className="text-[14px] text-center leading-relaxed text-[#4F6B4A]">
          <strong>
Caso nenhuma das opções acima seja ideal para você, também é possível contribuir com o valor que desejar para nos ajudar a montar nosso lar.            
           
          </strong>
        </p>

      </div>

      {/* CONTRIBUIÇÕES */}
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
              preco={presente.preco}
              valorArrecadado={
                Number(
                  presente.valorArrecadado
                ) || 0
              }
              reservado={false}
              onContribuir={
                registrarContribuicao
              }
              onCancelar={() => {}}
            />
          ))}

      </div>

    </section>
  );
}

export default List;
