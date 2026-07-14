import React from 'react';
import { Container, Image } from 'react-bootstrap';
import Slider from "../components/Slider";
import SectionTitle from "../components/SectionTitle";
import CardCarousel from "../components/CardCarousel";
import ContactForm from "../components/Contactform";
import banner from '/assets/home/banner.png';
import comunidad from '/assets/home/comunidad.jpg';
import '../styles/comunidad.css';

const Home = () => {
  return (
    <div>
      <section className="py-3 py-lg-5">
        <Slider />
      </section>
      <section className="py-3 py-lg-5">
        <Image
          src={banner} alt="Banner" fluid className="rounded-5"
        />
      </section>
      <section className="py-3 py-lg-5">
        <SectionTitle
          tag="Historias del campo"
          title="Gracias por alimentar a Colombia"
          description="Cada cosecha es una muestra de esfuerzo, dedicación y amor por la tierra."
          center
        />
        <CardCarousel interval={6000} />
      </section>

      <section className="py-3 py-lg-5">
        <Container>
          <div className="d-grid community-grid gap-4 align-items-center">
            <Image
              src={comunidad}
              alt="Comunidad RedRaíz" fluid className="rounded-5"
            />
            <SectionTitle
              tag="Comunidad RedRaíz"
              title="Conectamos productores locales con familias colombianas"
              description="Impulsamos el comercio justo para que cada compra
                fortalezca el trabajo del campo y apoye el crecimiento
                de miles de familias productoras."
            />
          </div>
        </Container>
      </section>

      <section className="py-3 py-lg-5">
        <ContactForm />
      </section>
    </div >
  );
};

export default Home;