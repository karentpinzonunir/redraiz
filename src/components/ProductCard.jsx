// src/components/ProductCard.jsx
import React from "react";
import { Card, Badge } from "react-bootstrap";
import ButtonPrimary from "./ButtonPrimary";
import { useImageLazy } from "../hooks/useImageLazy";
import "../styles/catalogo.css";
import { Link } from "react-router-dom";

const formatPrice = (value) => {
  if (value == null) return "";
  try {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(Number(value));
  } catch {
    return String(value);
  }
};

const ProductCard = ({
  producto,
  precio,
  categoria,
  region,
  productor,
  showProducer = false,
}) => {
  const getImagePath = (img) => {
    if (!img) return "/assets/productos/default.jpg";
    if (typeof img !== "string") return "/assets/productos/default.jpg";
    if (img.startsWith("/assets/") || img.startsWith("http")) return img;
    return `/assets/productos/${img}`;
  };

  const { imgSrc, handleError, handleLoad, isLoaded } = useImageLazy(
    getImagePath(producto?.imagen)
  );

  const categoriaLabel =
    typeof categoria === "string"
      ? categoria
      : categoria?.nombre || `Categoría ${producto?.id_categoria ?? "-"}`;

  const regionLabel =
    typeof region === "string"
      ? region
      : region?.nombre || "";

  const precioFinal = precio !== undefined && precio !== null ? precio : producto?.precio;
  const telefono = productor?.telefono;

  const handleContact = (e) => {
    e.stopPropagation();

    const nombreProducto = producto?.nombre || "este producto";
    const precioTexto = formatPrice(precioFinal);

    let mensaje = `Hola, estoy interesado en "${nombreProducto}"`;
    if (precioTexto) {
      mensaje += ` por ${precioTexto}`;
    }
    mensaje += ". ¿Me puedes dar más información?";

    const textoCodificado = encodeURIComponent(mensaje);

    if (telefono) {
      window.open(`https://wa.me/${telefono}?text=${textoCodificado}`, "_blank");
    } else {
      window.open(`https://wa.me/?text=${textoCodificado}`, "_blank");
    }
  };

  return (
    <Card className="product-card h-100 border-0 rounded-4 overflow-hidden bg-white shadow-sm">
      <div className="product-image-wrapper p-2">
        <Card.Img
          variant="top"
          src={imgSrc}
          className={`product-image ${isLoaded ? "loaded" : "loading"}`}
          alt={producto?.nombre || "Producto"}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>

      <Card.Body className="p-4 d-flex flex-column">
        <Badge className="mb-2 align-self-start tag-categoria">
          {categoriaLabel}
        </Badge>

        {regionLabel && (
          <span className="section-tag mb-1">
            {regionLabel}
          </span>
        )}

        <Card.Title className="fw-black fs-4 redraiz-card-title mb-2">
          {producto?.nombre}
        </Card.Title>

        <Card.Text className="text-secondary redraiz-card-desc flex-grow-1 mb-3">
          {producto?.descripcion || "Sin descripción disponible."}
        </Card.Text>

        {showProducer && productor && (
          <div className="mb-3">
            <div className="small text-muted mb-1">Producido por</div>
            <div className="d-flex align-items-center">
              <img
                src={
                  productor.imagen?.startsWith("/assets/")
                    ? productor.imagen
                    : productor.imagen
                      ? `/assets/productores/${productor.carpeta || "default"}/${productor.imagen}`
                      : "/assets/productores/default.jpg"
                }
                alt={productor.nombre}
                className="rounded-circle me-2"
                style={{ width: "32px", height: "32px", objectFit: "cover" }}
              />
              <Link
                to={`/productores/${productor.id}`}
                className="small text-dark fw-medium text-decoration-none"
                onClick={(e) => e.stopPropagation()}
              >
                {productor.nombre}
              </Link>
            </div>
          </div>
        )}

        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h5 className="price mb-0">{formatPrice(precioFinal)}</h5>
          </div>

          <div style={{ minWidth: 130 }}>
            <ButtonPrimary onClick={handleContact} className="w-100">
              <i className="fa-brands fa-whatsapp me-2"></i>
              Contactar
            </ButtonPrimary>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;