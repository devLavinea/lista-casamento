import { useEffect, useState } from "react";
import Item from "./components/item";
import { supabase } from "./services/supabase";

interface Presente {
  id: number;
  nome: string;
  imagem: string;
  reservado: boolean;
  reservado_por: string | null;
}

function List() {

  const [presentes, setPresentes] = useState<Presente[]>([]);

  async function buscarPresentes() {

    const { data, error } = await supabase
      .from("presentes")
      .select("*")
      .order("id");

    if(error){
      console.log(error);
      return;
    }

    setPresentes(data);

  }

  async function reservarPresente(id:number, nome:string){

    if(!nome.trim()){
      alert("Digite seu nome");
      return;
    }

    localStorage.setItem(
      `reserva_${id}`,
      nome
    );

    const { error } = await supabase
      .from("presentes")
      .update({
        reservado:true,
        reservado_por:nome
      })
      .eq("id", id);

    if(error){
      console.log(error);
      return;
    }

    buscarPresentes();

  }

  async function cancelarReserva(id:number){

    localStorage.removeItem(
      `reserva_${id}`
    );

    const {error} = await supabase
      .from("presentes")
      .update({
        reservado:false,
        reservado_por:null
      })
      .eq("id",id);

    if(error){
      console.log(error);
      return;
    }

    buscarPresentes();

  }

  useEffect(()=>{

    buscarPresentes();

  },[]);

  return (

    <section className="w-screen min-h-screen bg-[#f5f5f5]">

      <div className="grid grid-cols-1 gap-4 p-4">

        {
          presentes.map((presente)=>(

            <Item
              key={presente.id}
              id={presente.id}
              nome={presente.nome}
              imagem={presente.imagem}
              reservado={presente.reservado}
              onReservar={reservarPresente}
              onCancelar={cancelarReserva}
            />

          ))
        }

      </div>

    </section>

  );

}

export default List;