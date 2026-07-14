import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Card,
  Button,
  Image,
  ListGroup,
  Badge,
  Breadcrumb
} from "react-bootstrap";

import { useGet } from "../hooks/useGet";
import ProductCard from "../components/ProductCard";
import ContactForm from "../components/Contactform";
import ButtonPrimary from "../components/ButtonPrimary";
import SectionTitle from "../components/SectionTitle";
import ButtonSecondary from "../components/ButtonSecondary";
import ImageGallery from "../components/ImageGallery";

const ProductorDetalle = () => {
  const { id } = useParams();
  const { data, loading, error } = useGet(`/api/productores/${id}`);
  const [selectedImage, setSelectedImage] = useState(null);

  const productor = data;

  const galeria = Array.isArray(productor?.galeria) ? productor.galeria : [];
  const imagenPrincipalRaw = productor?.imagen || galeria[0] || null;

  const getImageUrl = (img) => {
    if (!img) return "/assets/productores/default.jpg";
    if (typeof img !== "string") return "/assets/productores/default.jpg";
    if (img.startsWith("/assets/") || img.startsWith("http")) return img;
    const carpeta = productor?.carpeta || "productor-default";
    return `/assets/productores/${carpeta}/${img}`;
  };

  const imagenPrincipal = getImageUrl(imagenPrincipalRaw);

  useEffect(() => {
    if (productor && !selectedImage) {
      setSelectedImage(imagenPrincipal);
    }
  }, [productor, imagenPrincipal, selectedImage]);

  if (loading) {
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

  if (!productor) {
    return (
      <Container className="contenedor--raiz my-3 my-lg-5">
        <h2>Productor no encontrado - {id}</h2>
      </Container>
    );
  }

  const lat = productor.latitud || "4.7110";
  const lng = productor.longitud || "-74.0721";
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(lat + "," + lng)}&z=14&output=embed`;

  const scrollToProductos = () => {
    document.getElementById("seccion-productos").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="productor-detalle-page">

      <section className="pt-3 pt-lg-5">
        <Container>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
              Inicio
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/productores" }}>
              Productores
            </Breadcrumb.Item>
            <Breadcrumb.Item active>{productor.nombre}</Breadcrumb.Item>
          </Breadcrumb>
        </Container>
      </section>

      <section className="py-3 py-lg-5 text-center">
        <Container>
          <SectionTitle
            tag="Historias del campo"
            title="Cada fruto lleva tiempo, esfuerzo y esperanza"
            description="Conoce a quienes cultivan con dedicación los alimentos que llegan diariamente a los hogares colombianos."
            center={true}
          />
        </Container>
      </section>

      <section className="pb-3 pb-lg-5">
        <Container>
          <Row>
            <Col lg={4}>
              <div className="producer-image-wrapper rounded-4">
                {selectedImage ? (
                  <Image
                    src={selectedImage}
                    alt={productor.nombre}
                    className="producer-image w-100 rounded"
                  />
                ) : (
                  <div className="d-flex align-items-center justify-content-center bg-light h-100 flex-column">
                    <i className="fa-regular fa-image text-muted fs-1"></i>
                    <p className="text-muted">No hay imagen disponible</p>
                  </div>
                )}
              </div>
            </Col>

            <Col lg={8} className="d-flex flex-column py-3">
              {productor.region?.nombre && (
                <span className="section-tag">
                  {productor.region?.nombre}
                </span>
              )}
              <h2 className="fw-bold mt-2">{productor.nombre}</h2>
              {productor.categoria?.nombre && (
                <Badge className="mb-2 align-self-start tag-categoria">
                  {productor.categoria?.nombre}
                </Badge>
              )}

              <p className="pt-2 mb-2">{productor.descripcion}</p>

              {productor.historia && (
                <div className="d-flex align-items-center text-muted">
                  <i className="fa-solid fa-quote-left text-success-redraiz fs-1 opacity-50"></i>
                  <p className="fst-italic ms-3 mb-0 d-inline text-muted">"{productor.historia}"</p>
                </div>
              )}

              <div className="d-sm-flex gap-2 mt-3">
                <ButtonPrimary
                  className="mb-3 mb-sm-0"
                  href={`https://wa.me/${productor.telefono}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-whatsapp me-2"></i>Contáctame vía WhatsApp
                </ButtonPrimary>
                <ButtonSecondary onClick={scrollToProductos}>
                  Ver mis productos
                </ButtonSecondary>
              </div>
            </Col>
          </Row>

          <h3 className="fw-bold mt-4 text-center">Fotos</h3>
          <ImageGallery images={galeria} folder={productor.carpeta} basePath="/assets/productores/" />
        </Container>
      </section>

      <section id="seccion-productos" className="py-3 py-lg-5">
        <Container>
          <SectionTitle
            tag="Productos"
            title="Elige tu producto ideal"
            description="Productos frescos cultivados directamente por este productor."
            center={true}
          />

          <Row xs={1} md={2} lg={3} className="pt-4 g-4 justify-content-center">
            {Array.isArray(productor.productos) && productor.productos.length > 0 ? (
              productor.productos.map((item) => (
                <Col key={item.id}>
                  <ProductCard
                    producto={item}
                    precio={item.precio}
                    categoria={item.categoria}
                    region={item.region}
                    productor={productor}
                    showProducer={false}
                  />
                </Col>
              ))
            ) : (
              <Col>
                <p className="text-center text-muted">No hay productos disponibles.</p>
              </Col>
            )}
          </Row>
        </Container>
      </section>

      <section className="pt-3 pt-lg-5">
        <Container>
          <SectionTitle
            tag="Ubicación"
            title="Estamos ubicados aquí"
            description=""
            center={true}
          />
        </Container>
      </section>

      <section className="py-3 py-lg-5">
        <Container>
          <div className="rounded overflow-hidden shadow producer-detalle">
            <iframe
              title="Mapa"
              src={mapSrc}
              width="100%"
              height="100%"
              className="border-0"
              loading="lazy"
            />
          </div>
        </Container>
      </section>

      <section className="pt-3 pt-lg-5">
        <Container>
          <ContactForm />
        </Container>
      </section>
    </div>
  );
};

export default ProductorDetalle;