// pages/Productores.jsx
import React from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import ProducerCard from "../components/ProducerCard";
import SectionTitle from "../components/SectionTitle";
import { useGet } from "../hooks/useGet";
import "../styles/productores.css";

const Productores = () => {
  const { data: productores, loading, error } = useGet('/api/productores');

  return (
    <div>

      {/* HERO */}
      <section className="py-5 text-center">
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
      <section className="pb-5">
        <div className="container-custom">

          {loading && (
            <div className="text-center py-5">
              <Spinner animation="border" variant="success" />
            </div>
          )}

          {error && (
            <div className="text-center py-5 text-danger">
              <p>Error al cargar los productores: {error}</p>
            </div>
          )}

          {!loading && !error && (
            <Row className="g-4">
              {productores?.map((productor) => (
                <Col lg={4} md={6} key={productor.id}>
                  <ProducerCard productor={productor} />
                </Col>
              ))}
            </Row>
          )}

        </div>
      </section>

    </div>
  );
};

export default Productores;