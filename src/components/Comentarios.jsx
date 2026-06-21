import React, { useEffect, useState } from "react";

const Comentarios = ({ historiaId }) => {

  const [nombre, setNombre] = useState("");

  const [texto, setTexto] = useState("");

  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {

    const guardados = JSON.parse(

      localStorage.getItem(`comentarios-${historiaId}`)

    ) || [];

    setComentarios(guardados);

  }, [historiaId]);



  const publicar = () => {

    if (!nombre || !texto) return;

    const nuevo = {

      nombre,

      texto,

      fecha: new Date().toLocaleDateString()

    };

    const actualizados = [

      nuevo,

      ...comentarios

    ];

    setComentarios(actualizados);

    localStorage.setItem(

      `comentarios-${historiaId}`,

      JSON.stringify(actualizados)

    );

    setNombre("");

    setTexto("");

  };



  return (

    <section className="comentarios">

      <h2>

        Comentarios

      </h2>



      <input

        type="text"

        placeholder="Tu nombre"

        value={nombre}

        onChange={(e)=>setNombre(e.target.value)}

      />



      <textarea

        placeholder="Escribe tu comentario"

        value={texto}

        onChange={(e)=>setTexto(e.target.value)}

      />



      <button onClick={publicar}>

        Publicar

      </button>



      {

        comentarios.map((c,i)=>(

          <div

            key={i}

            className="comentario-card"

          >

            <h4>

              {c.nombre}

            </h4>



            <small>

              {c.fecha}

            </small>



            <p>

              {c.texto}

            </p>

          </div>

        ))

      }

    </section>

  );

};

export default Comentarios;