// src/pages/Productores.jsx
import React from "react";
import { Row, Col, Spinner, Form, InputGroup } from "react-bootstrap";
import ProducerCard from "../components/ProducerCard";
import SectionTitle from "../components/SectionTitle";
import { useGet } from "../hooks/useGet";
import { useSearch } from "../hooks/useSearch";
import "../styles/productores.css";

const Productores = () => {
  const { data: productores, loading, error } = useGet("/api/productores");
  const listaProductores = Array.isArray(productores) ? productores : [];

  // Buscamos en los campos relevantes de tu tabla
  const { searchTerm, setSearchTerm, filteredData, resultsCount } = useSearch(
    listaProductores,
    ["nombre", "descripcion", "historia", "carpeta"]
  );

  return (
    <div>
      {/* HERO */}
      <section className="py-5 text-center">
        <div className="container-custom">
          <SectionTitle
            tag="Nuestros productores"
            title="Cada alimento tiene una historia, conoce a quien lo cultivó"
            description="Explora alimentos cultivados en Colombia, seleccionados directamente por nuestros productores."
            center={true}
          />
        </div>
      </section>

      {/* BUSCADOR SIMPLE */}
      <section className="pb-4">
        <div className="container-custom">
          <div className="mx-auto" style={{ maxWidth: 600 }}>
            <InputGroup size="lg" className="shadow-sm rounded-pill overflow-hidden border">
              <InputGroup.Text className="bg-white border-0 ps-4">
                <i className="bi bi-search text-success" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Buscar"
                className="border-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>

            {searchTerm && (
              <div className="mt-2 text-center text-muted small">
                Se encontraron {resultsCount} resultados para "{searchTerm}"
              </div>
            )}
          </div>
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
              <p>Error al cargar los productores: {String(error)}</p>
            </div>
          )}

          {!loading && !error && filteredData.length === 0 && (
            <div className="text-center py-5 gray-text">
              <p className="fs-5">No encontramos productores que coincidan con tu búsqueda.</p>
            </div>
          )}

          {!loading && !error && (
            <Row className="g-4">
              {filteredData.map((productor) => (
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