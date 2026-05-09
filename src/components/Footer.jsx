// src/components/layout/Footer.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer py-5 text-white">
      <Container>
        <Row className="gx-4 gy-4 align-items-start">
          <Col md={4}>
            <h3 className="mb-2 fw-bold text-uppercase">RED RAIZ</h3>
            <p className="mb-3" style={{ maxWidth: 360 }}>
              La raíz de todo empieza en el campo.
            </p>

            
          </Col>

          <Col md={4}>
            <h6 className="fw-bold">Contacto</h6>
            <ul className="list-unstyled mb-0">
              <li>Email: <a className="text-white" href="mailto:info@nexus.com">info@nexus.com</a></li>
              <li>Tel: <span className="d-block">+57 310 555 8899</span></li>
              <li>Dirección: <span className="d-block">Calle 21 #45-17, Aranjuez</span></li>
            </ul>
          </Col>

          <Col md={4}>
            <h6 className="fw-bold">Contenido</h6>
            <ul className="list-unstyled mb-0">
              <li><a className="text-white" href="#">Inicio</a></li>
              <li><a className="text-white" href="#">Productores</a></li>
              <li><a className="text-white" href="#">Catálogo</a></li>
              <li><a className="text-white" href="#">Blog</a></li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;