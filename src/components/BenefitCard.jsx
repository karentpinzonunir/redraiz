import React from "react";
import { Card } from "react-bootstrap";

const BenefitCard = ({ titulo, descripcion }) => {
  return (
    <Card className="benefit-card border-0 h-100">

      <Card.Body>

        <h4>
          {titulo}
        </h4>

        <p>
          {descripcion}
        </p>

      </Card.Body>

    </Card>
  );
};

export default BenefitCard;