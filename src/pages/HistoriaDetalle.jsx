import React from "react";
import { useParams, NavLink } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Badge,
  Breadcrumb,
} from "react-bootstrap";

import { useGet } from "../hooks/useGet";
import SectionTitle from "../components/SectionTitle";
import BlogCard from "../components/BlogCard";
import ComentarioForm from "../components/ComentarioForm";

import "../styles/blogDetalle.css";

const HistoriaDetalle = () => {
  const { id } = useParams();

  const { data: historia, loading, error } = useGet(`/api/historias/${id}`);

  const { data: comentariosData, loading: loadingComentarios } = useGet(
    `/api/historias/${id}/comentarios`
  );

  const { data: historiasRelacionadasData, loading: loadingRelacionadas } =
    useGet("/api/historias?limit=3");

  const comentarios = Array.isArray(comentariosData) ? comentariosData : [];

  const historiasRelacionadas = Array.isArray(historiasRelacionadasData)
    ? historiasRelacionadasData : [];

  if (loading) {
    return (
      <Container className="contenedor--raiz my-3 my-lg-5 text-center">
        <Spinner animation="border" variant="success" />
      </Container>
    );
  }

  if (error || !historia) {
    return (
      <Container className="contenedor--raiz my-3 my-lg-5">
        <Alert variant="danger">Historia no encontrada.</Alert>
      </Container>
    );
  }

  return (
    <div>
      <section className="pt-3 pt-lg-5">
        <Container>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={NavLink} linkProps={{ to: "/" }}>
              Inicio
            </Breadcrumb.Item>

            <Breadcrumb.Item linkAs={NavLink} linkProps={{ to: "/blog" }}>
              Blog
            </Breadcrumb.Item>

            <Breadcrumb.Item active>{historia.titulo}</Breadcrumb.Item>
          </Breadcrumb>
        </Container>
      </section>

      <section className="py-3 py-lg-5 text-center">
        <Container>
          <SectionTitle
            tag="Blog"
            title={historia.titulo}
            description={`${new Date(historia.fecha).toLocaleDateString(
              "es-CO",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}${historia.autor ? `  •  ${historia.autor}` : ""}`}
            center
          />

          {historia.categorias?.nombre && (
            <Badge className="tag-categoria mt-2">
              {historia.categorias.nombre}
            </Badge>
          )}
        </Container>
      </section>

      <section className="pb-3 pb-lg-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={9}>
              <img
                src={`/assets/historias/${historia.imagen}`}
                alt={historia.titulo}
                className="w-100 rounded-4 shadow-sm img-historia"
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="pb-2 pb-lg-4">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <p className="fs-5 fst-italic text-muted border-start border-4 ps-4">
                {historia.resumen}
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="pb-2 pb-lg-4">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="bg-white p-3 rounded-4 shadow-sm">
              {historia.contenido
                ?.split("\n")
                .filter((p) => p.trim() !== "")
                .map((parrafo, index) => (
                  <p key={index} className="mb-2 mb-lg-4 lh-lg">
                    {parrafo}
                  </p>
                ))}
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-3 py-lg-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <h4 className="fw-bold mb-2 mb-lg-4">
                <i className="fa-regular fa-comments me-2 text-success-redraiz"></i>
                Comentarios ({comentarios.length})
              </h4>

              {loadingComentarios ? (
                <Spinner animation="border" variant="success" size="sm" />
              ) : comentarios.length === 0 ? (
                <p className="text-muted">Sé el primero en comentar.</p>
              ) : (
                <div className="d-flex flex-column gap-3 mb-5">
                  {comentarios.map((c) => (
                    <div
                      key={c.id}
                      className="bg-light rounded-4 p-4 shadow-sm"
                    >
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <div
                          className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold icon-nombre"
                        >
                          {c.nombre ? c.nombre.charAt(0).toUpperCase() : "A"}
                        </div>

                        <div>
                          <p className="mb-0 fw-semibold">
                            {c.nombre || "Anónimo"}
                          </p>

                          {c.fecha && (
                            <small className="text-muted">
                              {new Date(c.fecha).toLocaleDateString("es-CO", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </small>
                          )}
                        </div>
                      </div>

                      <p className="mb-0 text-secondary">{c.comentario}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-white rounded-4 p-4 shadow-sm">
                <ComentarioForm historiaId={historia.id} />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-3 py-lg-5">
        <Container>
          <SectionTitle
            tag="Sigue explorando"
            title="Más historias del campo"
            description="Conoce otras historias, experiencias y saberes de nuestra comunidad."
            center
          />

          <div className="pt-4">
            {loadingRelacionadas ? (
              <div className="text-center">
                <Spinner animation="border" variant="success" />
              </div>
            ) : historiasRelacionadas.length === 0 ? (
              <p className="text-center text-muted">
                No hay más historias disponibles.
              </p>
            ) : (
              <Row className="g-4 justify-content-center">
                {historiasRelacionadas.map((articulo) => (
                  <Col lg={4} md={6} key={articulo.id}>
                    <BlogCard articulo={articulo} />
                  </Col>
                ))}
              </Row>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
};

export default HistoriaDetalle;