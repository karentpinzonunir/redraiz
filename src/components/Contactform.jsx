import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import ButtonPrimary from './ButtonPrimary';
import '../styles/contacto.css';

const ContactForm = () => {
  return (
    <div className="contact-form-box">

      <h2 className="text-center mb-5">
        Cuéntanos sobre tu producción
      </h2>

      <Form>

        <Row className="g-4">

          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Nombre completo"
            />
          </Col>

          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Nombre de finca o emprendimiento"
            />
          </Col>

          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Ciudad"
            />
          </Col>

          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Teléfono"
            />
          </Col>

          <Col md={6}>
            <Form.Control
              type="email"
              placeholder="Correo electrónico"
            />
          </Col>

          <Col md={6}>
            <Form.Select>
              <option>
                Tipo de productos
              </option>

              <option>
                Frutas
              </option>

              <option>
                Verduras
              </option>

              <option>
                Orgánicos
              </option>
            </Form.Select>
          </Col>

          <Col xs={12}>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Cuéntanos tu historia"
            />
          </Col>

          <Col xs={12} className="text-center">
            <div className="mt-3">
              <ButtonPrimary >
                Quiero unirme a RedRaíz
              </ButtonPrimary>
            </div>
          </Col>

        </Row>

      </Form>

    </div>
  );
};

export default ContactForm;
