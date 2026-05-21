import React from "react";

import {
  Row,
  Col,
} from "react-bootstrap";

import ProducerCard from "../components/ProducerCard";

import SectionTitle from "../components/SectionTitle";

import { productores } from "../data/productores";

const Productores = () => {

  return (
    <div className="productores-page">

      {/* HERO */}
      <section className="hero-productores">

        <div className="container-custom">

          <SectionTitle
            tag="Nuestros productores"
            title="Cada alimento tiene una historia, conoce a quien lo cultivó y llévalo a tu mesa"
            description="Explora alimentos cultivados en Colombia, seleccionados directamente por nuestros productores."
            center={true}
          />

        </div>

      </section>

      {/* GRID */}
      <section className="productores-grid-section">

        <div className="container-custom">

          <Row className="g-4">

            {productores.map((productor) => (

              <Col
                lg={4}
                md={6}
                key={productor.id}
              >

                <ProducerCard productor={productor} />

              </Col>

            ))}

          </Row>

        </div>

      </section>

    </div>
  );
};

export default Productores;