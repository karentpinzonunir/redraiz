// src/pages/Productos.jsx
import React from "react";
import { Row, Col, Spinner, Form, InputGroup, Container } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import SectionTitle from "../components/SectionTitle";
import { useGet } from "../hooks/useGet";
import { useSearch } from "../hooks/useSearch";

const Catalogo = () => {
  const { data, loading, error } = useGet("/api/productos");
  const listaRaw = Array.isArray(data) ? data : [];

  // Normalizamos para que useSearch encuentre campos planos.
  // Cada item del endpoint viene con: producto, categoria, productor, precio, ...
  const listaProductos = listaRaw.map((item) => ({
    ...item,
    // Campos planos para buscar
    nombre: item.producto?.nombre || "",
    descripcion: item.producto?.descripcion || "",
    categoria: item.categoria?.nombre || item.producto?.categoria?.nombre || "",
    productor_nombre: item.productor?.nombre || "",
    region: item.region?.nombre || "",
    precio: item.precio ?? ""
  }));

  // Usamos useSearch sobre campos relevantes (igual que en Productores)
  const { searchTerm, setSearchTerm, filteredData, resultsCount } = useSearch(
    listaProductos,
    ["nombre", "descripcion", "categoria", "productor_nombre", "region"]
  );

  return (
    <div>
      {/* HERO */}
      <section className="py-5 text-center">
        <Container>
          <SectionTitle
            tag="Catálogo"
            title="Productos frescos del campo colombiano"
            description="Compra directamente a nuestros productores."
            center={true}
          />
        </Container>
      </section>

      {/* BUSCADOR SIMPLE */}
      <section className="pb-5">
        <div className="container-custom">
          <div className="mx-auto buscador">
            <InputGroup size="lg" className="shadow-sm rounded-pill overflow-hidden border">
              <InputGroup.Text className="bg-white border-0 ps-4">
                <i className="fa-solid fa-magnifying-glass text-success"></i>
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Buscar en productos"
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
              <p>Error al cargar los productos: {String(error)}</p>
            </div>
          )}

          {!loading && !error && filteredData.length === 0 && (
            <div className="text-center py-5 gray-text">
              <p className="fs-5">No encontramos productos que coincidan con tu búsqueda.</p>
            </div>
          )}

          {!loading && !error && (
            <Row xs={1} md={2} lg={3} className="g-4">
              {filteredData.map((item) => (
                <Col key={item.id}>
                  <ProductCard
                    producto={item.producto}
                    precio={item.precio}
                    categoria={item.categoria}
                    region={item.region}
                    productor={item.productor}
                    showProducer={true}
                  />
                </Col>
              ))}
            </Row>
          )}
        </div>
      </section>
    </div>
  );
};

export default Catalogo;