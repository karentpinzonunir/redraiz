import React from "react";

import {
  Row,
  Col,
  Form,
  Button,
  Container
} from "react-bootstrap";

import SectionTitle from "../components/SectionTitle";
import ButtonPrimary from '../components/ButtonPrimary';
import ContactForm from "../components/Contactform";

const Contacto = () => {

  return (
    <div className="contact-page">

      {/* HERO */}
      <section className="py-5">

        <Container>

          <SectionTitle
            tag="Contacto"
            title="Haz parte de RedRaíz"
            description="Conectamos productores locales con familias que valoran el trabajo del campo colombiano."
            center={true}
          />

        </Container>

      </section>

      {/* FORM */}
      

          <ContactForm />
    </div>
  );
};

export default Contacto;