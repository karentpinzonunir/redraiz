import React from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import SectionTitle from "../components/SectionTitle";

const productos = [
  {
    id: 1,
    nombre: "Tomate Orgánico",
    precio: "$6.000",
    imagen: "/assets/catalogo/tomate.jpg",
    productor: "Carlos Ramírez",
  },
  {
    id: 2,
    nombre: "Lechuga Fresca",
    precio: "$4.500",
    imagen: "/assets/catalogo/lechuga.jpg",
    productor: "María López",
  },
  {
    id: 3,
    nombre: "Cebolla Cabezona",
    precio: "$5.000",
    imagen: "/assets/catalogo/cebolla.jpg",
    productor: "Juan Pérez",
  },
  {
    id: 4,
    nombre: "Zanahoria",
    precio: "$4.000",
    imagen: "/assets/catalogo/zanahoria.jpg",
    productor: "Ana Torres",
  },
  {
    id: 5,
    nombre: "Brócoli",
    precio: "$7.000",
    imagen: "/assets/catalogo/brocoli.jpg",
    productor: "Carlos Ramírez",
  },
  {
    id: 6,
    nombre: "Papa Criolla",
    precio: "$5.500",
    imagen: "/assets/catalogo/papa.jpg",
    productor: "Pedro Gómez",
  },
];

const Catalogo = () => {
  return (
    <div className="catalogo-page">

      <section className="catalogo-hero">
        <div className="container-custom">

          <SectionTitle
            tag="Catálogo"
            title="Productos frescos del campo colombiano"
            description="Compra directamente a nuestros productores."
            center
          />

        </div>
      </section>

      <section className="catalogo-grid">
        <div className="container-custom">

          <Row className="g-4">

            {productos.map((producto) => (

              <Col lg={4} md={6} key={producto.id}>

                <ProductCard producto={producto} />

              </Col>

            ))}

          </Row>

        </div>
      </section>

    </div>
  );
};

export default Catalogo;