import React from "react";
import { Row, Col, Card } from "react-bootstrap";

import SectionTitle from "../components/SectionTitle";

const articulos = [
  {
    id: 1,
    titulo: "Del cultivo a tu mesa",
    descripcion:
      "Conoce cómo los alimentos recorren un camino lleno de dedicación y esfuerzo.",
    imagen: "/assets/img1.jpg",
  },
  {
    id: 2,
    titulo: "Agricultura sostenible",
    descripcion:
      "Prácticas responsables que protegen el medio ambiente.",
    imagen: "/assets/img2.jpg",
  },
  {
    id: 3,
    titulo: "Huertas urbanas",
    descripcion:
      "Cultiva tus propios alimentos en casa.",
    imagen: "/assets/img3.jpg",
  },
  {
    id: 4,
    titulo: "El café colombiano",
    descripcion:
      "Tradición, calidad y trabajo campesino.",
    imagen: "/assets/img4.jpg",
  },
  {
    id: 5,
    titulo: "Alimentación saludable",
    descripcion:
      "Consume productos frescos y locales.",
    imagen: "/assets/img5.jpg",
  },
  {
    id: 6,
    titulo: "Comercio justo",
    descripcion:
      "Apoyando directamente a nuestros productores.",
    imagen: "/assets/img6.jpg",
  },
];

const Blog = () => {
  return (
    <div className="blog-page">

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

      <section className="featured-post">

        <div className="container-custom">

          <Row className="align-items-center g-5">

            <Col lg={6}>
              <img
                src="/assets/img1.jpg"
                alt="Artículo destacado"
                className="featured-image"
              />
            </Col>

            <Col lg={6}>

              <span className="section-tag">
                Artículo destacado
              </span>

              <h2 className="featured-title">
                Del cultivo a tu mesa: la historia detrás de cada alimento
              </h2>

              <p>
                Cada fruta, verdura o producto que llega a tu hogar tiene detrás una historia de esfuerzo, tradición y amor por la tierra.
              </p>

              <button className="btn-green">
                Leer artículo
              </button>

            </Col>

          </Row>

        </div>

      </section>

      <section className="blog-grid">

        <div className="container-custom">

          <Row className="g-4">

            {articulos.map((articulo) => (

              <Col lg={4} md={6} key={articulo.id}>

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

                    <button className="btn-green">
                      Leer más
                    </button>

                  </Card.Body>

                </Card>

              </Col>

            ))}

          </Row>

        </div>

      </section>

    </div>
  );
};

export default Blog;