import React from "react";

import {
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";

import SectionTitle from "../components/SectionTitle";

const Contacto = () => {

  return (
    <div className="contact-page">

      {/* HERO */}
      <section className="contact-hero">

        <div className="container-custom">

          <SectionTitle
            tag="Contacto"
            title="Haz parte de RedRaíz"
            description="Conectamos productores locales con familias que valoran el trabajo del campo colombiano."
            center={true}
          />

        </div>

      </section>

      {/* FORM */}
      <section className="contact-form-section">

        <div className="container-custom">

          <Row className="justify-content-center">

            <Col lg={8}>

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
                        placeholder="Nombre de finca"
                      />

                    </Col>

                    <Col md={6}>

                      <Form.Control
                        type="email"
                        placeholder="Correo electrónico"
                      />

                    </Col>

                    <Col md={6}>

                      <Form.Control
                        type="text"
                        placeholder="Teléfono"
                      />

                    </Col>

                    <Col xs={12}>

                      <Form.Control
                        as="textarea"
                        rows={6}
                        placeholder="Cuéntanos tu historia"
                      />

                    </Col>

                    <Col xs={12}>

                      <Button className="btn-green w-100">

                        Quiero unirme a RedRaíz

                      </Button>

                    </Col>

                  </Row>

                </Form>

              </div>

            </Col>

          </Row>

        </div>

      </section>

    </div>
  );
};

export default Contacto;