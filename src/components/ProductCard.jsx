import React from "react";
import { Card, Button } from "react-bootstrap";

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

        <Button className="btn-green w-100 mt-4">
          Reservar
        </Button>

      </Card.Body>

    </Card>
  );
};

export default ProductCard;