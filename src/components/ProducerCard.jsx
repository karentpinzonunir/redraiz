import React from "react";

import {
  Card,
  Button,
} from "react-bootstrap";

import { NavLink } from "react-router-dom";
import ButtonPrimary from './ButtonPrimary';

const ProducerCard = ({ productor }) => {

  return (
    <Card className="producer-card h-100">

      {/* IMAGEN */}
      <div className="producer-image-wrapper">

        <Card.Img
          variant="top"
          src={productor.imagen}
          className="producer-image"
        />

      </div>

      {/* BODY */}
      <Card.Body>

        {/* REGION */}
        <span className="producer-region">
          {productor.region}
        </span>

        {/* NOMBRE */}
        <Card.Title>
          {productor.nombre}
        </Card.Title>

        {/* CATEGORIA */}
        <h6 className="producer-category">
          {productor.categoria}
        </h6>

        {/* DESCRIPCION */}
        <Card.Text>
          {productor.descripcion}
        </Card.Text>

        {/* BOTON */}
        <ButtonPrimary as={NavLink} to={`/productores/${productor.id}`}>
          Leer más
        </ButtonPrimary>

      </Card.Body>

    </Card>
  );
};

export default ProducerCard;