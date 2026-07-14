import React from "react";
import { Card, Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import ButtonPrimary from "./ButtonPrimary";
import { useImageLazy } from "../hooks/useImageLazy";

const ProducerCard = ({ productor }) => {
  const { imgSrc, handleError, handleLoad, isLoaded } = useImageLazy(
    productor?.imagen
  );

  const categoriaLabel =
    (productor && productor.categoria && productor.categoria.nombre) ||
    `Categoría ${productor?.id_categoria ?? "-"}`;

  const regionLabel =
    (productor && productor.region && productor.region.nombre) ||
    `Región ${productor?.id_region ?? "-"}`;

  const handleButtonClick = (e) => {
    e.stopPropagation();
  };

  return (
    <NavLink
      to={`/productores/${productor.id}`}
      className="text-decoration-none"
    >
      <Card className="redraiz-card h-100 border-0 rounded-4 overflow-hidden bg-white shadow-sm">
        <div className="producer-image-wrapper">
          <Card.Img
            variant="top"
            src={imgSrc}
            className={`producer-image ${isLoaded ? "loaded" : "loading"}`}
            alt={productor?.nombre || "Productor"}
            loading="lazy"
            decoding="async"
            onLoad={handleLoad}
            onError={handleError}
          />
        </div>

        <Card.Body className="p-4 d-flex flex-column">
          <Badge className="mb-3 align-self-start tag-categoria">
            {categoriaLabel}
          </Badge>

          <span className="section-tag">
            {regionLabel}
          </span>

          <Card.Title className="fw-bold">
            {productor?.nombre}
          </Card.Title>

          <Card.Text className="text-secondary redraiz-card-desc flex-grow-1">
            {productor?.historia || "Sin descripción disponible."}
          </Card.Text>

          <div className="mt-4">
            <ButtonPrimary
              as="button"
              onClick={handleButtonClick}
              className="stretched-link"
            >
              Leer más
            </ButtonPrimary>
          </div>
        </Card.Body>
      </Card>
    </NavLink>
  );
};

export default ProducerCard;