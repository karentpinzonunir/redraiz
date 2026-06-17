import React from "react";

import {
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";

import SectionTitle from "../components/SectionTitle";
import ButtonPrimary from '../components/ButtonPrimary';
import ContactForm from "../components/Contactform";

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
      

          <ContactForm />
    </div>
  );
};

export default Contacto;