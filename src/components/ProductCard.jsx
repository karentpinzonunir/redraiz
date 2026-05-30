import React from "react";
import { Card, Button } from "react-bootstrap";
import ButtonSecondary from './ButtonSecondary';
import "../styles/catalogo.css";

const ProductCard = ({ producto }) => {
  return (
    <Card className="product-card border-0 h-100">

      <div className="fake-product-image"></div>

      <Card.Body>

        <Card.Title>
          {producto.nombre}
        </Card.Title>

        <h5 className="mt-3">
          {producto.precio}
        </h5>

        <ButtonSecondary >
          Contactar
        </ButtonSecondary>

      </Card.Body>

    </Card>
  );
};

export default ProductCard;