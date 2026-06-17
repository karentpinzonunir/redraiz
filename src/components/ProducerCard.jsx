// components/ProducerCard.jsx
import React from "react";
import { Card, Badge } from "react-bootstrap"; // Importamos Badge
import { NavLink } from "react-router-dom";
import ButtonPrimary from './ButtonPrimary';

const ProducerCard = ({ productor }) => {
  return (
    <Card className="producer-card h-100 border-0 rounded-4 overflow-hidden bg-white shadow-sm">

      {/* IMAGEN */}
      <div className="producer-image-wrapper">
        <Card.Img
          variant="top"
          src={productor.imagen}
          className="producer-image"
        />
      </div>

      {/* BODY */}
      <Card.Body className="p-4 d-flex flex-column">

        {/* CATEGORIA - Estilo Badge similar a Historia */}
        <Badge className="mb-3 align-self-start tag-historia">
          {productor.categoria?.nombre || 'Sin categoría'}
        </Badge>

        {/* REGION - Título verde */}
        <span className="text-success text-uppercase fw-bold small ls-1 mb-1">
          {productor.region?.nombre || 'Región no especificada'}
        </span>

        {/* NOMBRE */}
        <Card.Title className="fw-black fs-4 producer-card-title mb-3">
          {productor.nombre}
        </Card.Title>

        {/* DESCRIPCION */}
        <Card.Text className="text-secondary lh-lg producer-card-desc flex-grow-1">
          {productor.descripcion}
        </Card.Text>

        {/* BOTON */}
        <div className="mt-4">
          <ButtonPrimary as={NavLink} to={`/productores/${productor.id}`}>
            Leer más
          </ButtonPrimary>
        </div>

      </Card.Body>
    </Card>
  );
};

export default ProducerCard;