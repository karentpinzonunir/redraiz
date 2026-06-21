import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";

import "../styles/blog.css";

import SectionTitle from "../components/SectionTitle";
import ButtonPrimary from "../components/ButtonPrimary";

import historias from "../data/historias";

const Blog = () => {

return (

<div className="blog-page">

  {/* Hero */}

  <section className="blog-hero">

    <div className="container-custom">

      <SectionTitle

        tag="Blog"

        title="Historias que nacen en el campo"

        description="Descubre consejos, historias de productores y contenidos sobre alimentación consciente."

        center

      />

    </div>

  </section>



  {/* Artículo destacado */}

  <section className="featured-post">

    <div className="container-custom">

      <Row className="align-items-center g-5">

        <Col lg={6}>

          <img

            src={historias[0].imagen}

            alt={historias[0].titulo}

            className="featured-image"

          />

        </Col>



        <Col lg={6}>

          <span className="section-tag">

            Artículo destacado

          </span>



          <h2 className="featured-title">

            {historias[0].titulo}

          </h2>



          <p>

            {historias[0].resumen}

          </p>



          <div className="mt-3">

            <Link

              to={`/blog/${historias[0].id}`}

              style={{ textDecoration: "none" }}

            >

              <ButtonPrimary>

                Leer Más

              </ButtonPrimary>

            </Link>

          </div>

        </Col>

      </Row>

    </div>

  </section>



  {/* Todas las historias */}

  <section className="blog-grid">

    <div className="container-custom">

      <Row className="g-4">

        {

          historias.map((articulo) => (

            <Col

              lg={4}

              md={6}

              key={articulo.id}

            >

              <Card className="blog-card">

                <Card.Img

                  variant="top"

                  src={articulo.imagen}

                />



                <Card.Body>

                  <Card.Title>

                    {articulo.titulo}

                  </Card.Title>



                  <Card.Text>

                    {articulo.descripcion}

                  </Card.Text>



                  <Link

                    to={`/blog/${articulo.id}`}

                    style={{

                      textDecoration:"none"

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

    </div>

  </section>

</div>


);

};

export default Blog;
