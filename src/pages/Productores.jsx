import React from "react";
import { Row, Col, Spinner, Form, InputGroup, Container, Pagination } from "react-bootstrap";
import ProducerCard from "../components/ProducerCard";
import SectionTitle from "../components/SectionTitle";
import { useGet } from "../hooks/useGet";
import { useSearch } from "../hooks/useSearch";
import { usePagination } from "../hooks/usePagination";
import "../styles/productores.css";

const Productores = () => {
  const { data: productores, loading, error } = useGet("/api/productores");
  const listaProductores = Array.isArray(productores) ? productores : [];

  const { searchTerm, setSearchTerm, filteredData, resultsCount } = useSearch(
    listaProductores,
    ["nombre", "descripcion", "historia", "carpeta"]
  );

  const { currentData, currentPage, totalPages, goToPage } = usePagination(filteredData, 6);

  return (
    <div>
      <section className="py-3 py-lg-5 text-center">
        <Container>
          <SectionTitle
            tag="Nuestros productores"
            title="Cada alimento tiene una historia, conoce a quien lo cultivó"
            description="Explora alimentos cultivados en Colombia, seleccionados directamente por nuestros productores."
            center={true}
          />
        </Container>
      </section>

      <section className="pb-5">
        <div className="container-custom">
          <div className="mx-auto buscador">
            <InputGroup size="lg" className="shadow-sm rounded-pill overflow-hidden border">
              <InputGroup.Text className="bg-white border-0 ps-4">
                <i className="fa-solid fa-magnifying-glass text-success-redraiz"></i>
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Buscar en productores"
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

      <section className="pb-5">
        <div className="container-custom">
          {loading && (
            <div className="text-center py-3 py-lg-5">
              <Spinner animation="border" variant="success" />
            </div>
          )}

          {error && (
            <div className="text-center py-3 py-lg-5 text-danger">
              <p>Error al cargar los productores: {String(error)}</p>
            </div>
          )}

          {!loading && !error && filteredData.length === 0 && (
            <div className="text-center py-3 py-lg-5 gray-text">
              <p className="fs-5">No encontramos productores que coincidan con tu búsqueda.</p>
            </div>
          )}

          {!loading && !error && filteredData.length > 0 && (
            <>
              <Row className="g-4">
                {currentData.map((productor) => (
                  <Col lg={4} md={6} key={productor.id}>
                    <ProducerCard productor={productor} />
                  </Col>
                ))}
              </Row>

              {filteredData.length > 6 && (
                <div className="d-flex justify-content-center mt-5">
                  <Pagination>
                    <Pagination.Prev
                      disabled={currentPage === 1}
                      onClick={() => goToPage(currentPage - 1)}
                    />
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Pagination.Item
                        key={page}
                        active={page === currentPage}
                        onClick={() => goToPage(page)}
                      >
                        {page}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next
                      disabled={currentPage === totalPages}
                      onClick={() => goToPage(currentPage + 1)}
                    />
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Productores;