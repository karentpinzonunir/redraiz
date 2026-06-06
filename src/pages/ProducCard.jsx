import React from "react";
import { Card, Button } from "react-bootstrap";

const ProductCard = ({ producto }) => {
  return (
    <Card className="product-card h-100">

      <Card.Img
        variant="top"
        src={producto.imagen}
      />

      <Card.Body>

        <Card.Title>
          {producto.nombre}
        </Card.Title>

        <p className="producer-name">
          {producto.productor}
        </p>

        <h5 className="price">
          {producto.precio}
        </h5>

        <Button className="btn-green w-100">
          Agregar al carrito
        </Button>

      </Card.Body>

    </Card>
  );
};

export default ProductCard;