import React from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import { productores } from "../data/productores";
import ProductCard from "../components/ProductCard";
import ContactForm from "../components/Contactform";
import ButtonSecondary from '../components/ButtonSecondary';

const ProductorDetalle = () => {

  const { id } = useParams();

  const productor = productores.find(
    (item) => item.id === Number(id)
  );

  if (!productor) {
    return (
      <div className="container-custom section-spacing">
        <h2>Productor no encontrado - {id}</h2>
      </div>
    );
  }

  return (
    <div className="productor-detalle-page">

      {/* TITULO */}
      <section className="producer-title-section">

        <div className="container-custom">

          <span className="section-tag">
            Historias del campo
          </span>

          <h1 className="section-title">
            Cada fruto lleva tiempo, esfuerzo y esperanza
          </h1>

          <p className="section-description">
            Conoce a quienes cultivan con dedicación los alimentos
            que llegan diariamente a los hogares colombianos.
          </p>

        </div>

      </section>

      {/* INFORMACION */}
      <section className="producer-info-section">

        <div className="container-custom">

          <Row className="align-items-center g-5">

            {/* GALERIA */}
            <Col lg={6}>

              <div className="producer-gallery">

                <img
                  src={productor.galeria[0]}
                  alt={productor.nombre}
                  className="main-producer-image"
                />

                <div className="gallery-thumbnails">

                  {productor.galeria.map((img, index) => (

                    <img
                      key={index}
                      src={img}
                      alt={`foto-${index}`}
                      className="thumbnail-image"
                    />

                  ))}

                </div>

              </div>

            </Col>

            {/* INFO */}
            <Col lg={6}>

              <span className="section-tag">
                Productor verificado
              </span>

              <h2 className="producer-name">
                {productor.nombre}
              </h2>

              <h5 className="producer-category">
                {productor.categoria}
              </h5>

              <p className="producer-history">
                {productor.historia}
              </p>
              <ButtonSecondary >
                Escríbeme por WhatsApp
              </ButtonSecondary>

            </Col>

          </Row>

        </div>

      </section>

      {/* PRODUCTOS */}
      <section className="products-section">

        <div className="container-custom">

          <div className="text-center mb-5">

            <span className="section-tag">
              Productos
            </span>

            <h2 className="section-title">
              Elige tu producto ideal
            </h2>

            <p className="section-description">
              Productos frescos cultivados directamente por este productor.
            </p>

          </div>

          <Row className="g-4">

            {productor.productos.map((producto, index) => (

              <Col
                lg={4}
                md={6}
                key={index}
              >
                <ProductCard producto={producto} />
              </Col>

            ))}

          </Row>

        </div>

      </section>

      {/* MAPA */}
      <section className="producer-map-section">

        <div className="container-custom">

          <div className="text-center mb-5">

            <span className="section-tag">
              Ubicación
            </span>

            <h2 className="section-title">
              Estamos ubicados aquí
            </h2>

          </div>

          <iframe
            title="Mapa"
            src="https://maps.google.com/maps?q=bogota&t=&z=10&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="500"
            style={{
              border: 0,
              borderRadius: "24px"
            }}
            loading="lazy"
          />

        </div>

      </section>

      {/* CONTACTO */}
      <section className="section-spacing">

        <div className="container-custom">

          <ContactForm />

        </div>

      </section>

    </div>
  );
};

export default ProductorDetalle;