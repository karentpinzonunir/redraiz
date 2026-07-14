import React from "react";
import { NavLink } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Badge,
} from "react-bootstrap";


import { useGet } from "../hooks/useGet";
import SectionTitle from "../components/SectionTitle";
import ButtonPrimary from "../components/ButtonPrimary";
import BlogCard from "../components/BlogCard";

const Blog = () => {
  const { data, loading, error } = useGet("/api/historias");
  const { data: destacada, loading: loadingDestacada } = useGet("/api/historias/destacada");

  const historias = Array.isArray(data) ? data : [];

  if (loading || loadingDestacada) {
    return (
      <Container className="contenedor--raiz my-3 my-lg-5 text-center">
        <Spinner animation="border" variant="success" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="contenedor--raiz my-3 my-lg-5">
        <Alert variant="danger">Error: {String(error)}</Alert>
      </Container>
    );
  }

  return (
    <div>
      <section className="py-3 py-lg-5 text-center">
        <Container>
          <SectionTitle
            tag="Blog"
            title="Historias que nacen en el campo"
            description="Descubre consejos, historias de productores y contenidos sobre alimentación consciente."
            center
          />
        </Container>
      </section>

      {destacada && (
        <section className="pb-3 pb-lg-5">
          <Container>
            <Row className="align-items-center g-5">
              <Col lg={6}>
                <img
                  src={`assets/historias/${destacada.imagen}`}
                  alt={destacada.titulo}
                  className="featured-image w-100 rounded-4"
                />
              </Col>

              <Col lg={6} className="d-flex flex-column">
                <span className="section-tag mb-2">Artículo destacado</span>

                {destacada.categorias?.nombre && (
                  <Badge className="mb-2 align-self-start tag-categoria">
                    {destacada.categorias.nombre}
                  </Badge>
                )}

                <h2>{destacada.titulo}</h2>

                <p className="text-muted">
                  <i className="fa-regular fa-calendar me-2"></i>
                  {new Date(destacada.fecha).toLocaleDateString("es-CO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  {destacada.autor && (
                    <span className="ms-3">
                      <i className="fa-regular fa-user me-2"></i>
                      {destacada.autor}
                    </span>
                  )}
                </p>

                <p>{destacada.resumen}</p>

                <div className="mt-3">
                  <NavLink
                    to={`/blog/${destacada.id}`}
                    className="text-decoration-none"
                  >
                    <ButtonPrimary
                      as="button"
                      onClick={(e) => e.stopPropagation()}
                      className="stretched-link"
                    >
                      Leer Más
                    </ButtonPrimary>
                  </NavLink>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}

      <section className="py-3 py-lg-5 text-center">
        <Container>
          <SectionTitle
            tag="Todas las historias"
            title="Más historias del campo"
            description=""
            center
          />
        </Container>
      </section>

      <section>
        <Container>
          {historias.length === 0 ? (
            <p className="text-center text-muted">No hay historias disponibles.</p>
          ) : (
            <Row className="g-4 pt-3">
              {historias.map((articulo) => (
                <Col lg={4} md={6} key={articulo.id}>
                  <BlogCard articulo={articulo} />
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>

    </div>
  );
};

export default Blog;