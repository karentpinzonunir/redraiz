import React from "react";
import { useParams, Link } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";

import ButtonPrimary from "../components/ButtonPrimary";
import Comentarios from "../components/Comentarios";

import historias from "../data/historias";

import "../styles/blogDetalle.css";

const HistoriaDetalle = () => {

  const { id } = useParams();

  const historia = historias.find(
    (h) => h.id === Number(id)
  );

  if (!historia) {

    return (

      <div className="historia-error">

        <h1>
          Historia no encontrada
        </h1>

        <Link
          to="/blog"
          className="btn-volver"
        >
          Volver al Blog
        </Link>

      </div>

    );

  }

  return (

    <div className="historia-detalle">

      {/* Encabezado */}

      <section className="banner-blog">

        <span>
          BLOG
        </span>

        <h1>
          {historia.titulo}
        </h1>

        <div className="info-blog">

          <p>{historia.fecha}</p>

          <p>•</p>

          <p>{historia.autor}</p>

        </div>

      </section>

      {/* Imagen principal */}

      <section className="imagen-blog">

        <img
          src={historia.imagen}
          alt={historia.titulo}
          className="featured-image"
        />

      </section>

      {/* Resumen */}

      <section className="contenido-blog">

        <p className="resumen">

          {historia.resumen}

        </p>

      </section>

      {/* Contenido de la historia */}

      <section className="contenido-blog">

        {

          historia.contenido

            .split("\n")

            .map(

              (parrafo, index) =>

                parrafo.trim() !== "" && (

                  <p
                    key={index}
                    className="texto-seccion"
                  >

                    {parrafo}

                  </p>

                )

            )

        }

      </section>

      {/* Más historias */}

      <section className="historias-relacionadas">

        <h3>
          Más historias
        </h3>

        <Row className="g-4">

          {

            historias

              .filter(
                (h) => h.id !== historia.id
              )

              .slice(0, 3)

              .map((h) => (

                <Col
                  lg={4}
                  md={6}
                  key={h.id}
                >

                  <Card className="blog-card">

                    <Card.Img
                      variant="top"
                      src={h.imagen}
                    />

                    <Card.Body>

                      <Card.Title>

                        {h.titulo}

                      </Card.Title>

                      <Card.Text>

                        {h.descripcion}

                      </Card.Text>

                      <Link
                        to={`/blog/${h.id}`}
                        style={{
                          textDecoration: "none"
                        }}
                      >

                        <ButtonPrimary>

                          Leer Más

                        </ButtonPrimary>

                      </Link>

                    </Card.Body>

                  </Card>

                </Col>

              ))

          }

        </Row>

      </section>

      {/* Comentarios */}

      <Comentarios
        historiaId={historia.id}
      />

      {/* Botón volver */}

      <div className="volver-blog">

        <Link
          to="/blog"
          className="btn-volver"
        >

          ← Volver al Blog

        </Link>

      </div>

    </div>

  );

};

export default HistoriaDetalle;