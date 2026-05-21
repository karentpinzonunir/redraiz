import React from "react";

import { useParams } from "react-router-dom";

import {
  Row,
  Col,
  Button,
} from "react-bootstrap";

import { productores } from "../data/productores";

import ProductCard from "../components/ProductCard";

import ImageCarousel from "../components/ImageCarousel";

const ProductorDetalle = () => {

  const { id } = useParams();

  const productor = productores.find(
    (item) => item.id === Number(id)
  );

  if (!productor) {
    return <h2>Productor no encontrado</h2>;
  }

  return (
    <div className="productor-detalle-page">

      {/* HERO */}
      <section className="productor-hero">

        <div className="container-custom">

          <Row className="align-items-center g-5">

            {/* IMAGEN */}
            <Col lg={6}>

              <ImageCarousel
                images={productor.galeria}
              />

            </Col>

            {/* INFO */}
            <Col lg={6}>

              <span className="section-tag">
                Productor verificado
              </span>

              <h1 className="mt-4">
                {productor.nombre}
              </h1>

              <h5 className="producer-category mt-4">
                {productor.categoria}
              </h5>

              <p className="producer-history mt-4">
                {productor.historia}
              </p>

              <div className="d-flex gap-3 mt-4 flex-wrap">

                <Button className="btn-green">
                  Contactar
                </Button>

                <Button variant="outline-dark">
                  Ver catálogo
                </Button>

              </div>

            </Col>

          </Row>

        </div>

      </section>

      {/* PRODUCTOS */}
      <section className="products-section">

        <div className="container-custom">

          <div className="section-spacing">

            <Row className="g-4">

              {productor.productos.map((producto, index) => (

                <Col
                  lg={4}
                  key={index}
                >

                  <ProductCard producto={producto} />

                </Col>

              ))}

            </Row>

          </div>

        </div>

      </section>

    </div>
  );
};

export default ProductorDetalle;