import React from 'react';
import { Image } from 'react-bootstrap';
import Slider from "../components/Slider";
import SectionTitle from "../components/SectionTitle";
import CardCarousel from "../components/CardCarousel";
import ContactForm from "../components/Contactform";
import banner from '/assets/home/banner.png';
import '../styles/comunidad.css';

const Home = () => {
  return (
    <div>
      <section className="py-5">
        <Slider />
      </section>
      <section className="py-5">
        <Image
          src={banner} alt="Banner" fluid className="rounded-5"
        />
      </section>
      <section className="py-5">
        <SectionTitle
          tag="Historias del campo"
          title="Gracias por alimentar a Colombia"
          description="Cada cosecha es una muestra de esfuerzo, dedicación y amor por la tierra."
          center
        />
        <CardCarousel interval={6000} />
      </section>

      {/* COMUNIDAD */}
      <section className="community-section">

        <div className="container-custom">

          <div className="community-grid">

            <div>

              <img
                src="/assets/carousel/img7.jpg"
                alt="Comunidad RedRaíz"
                className="community-image"
              />

            </div>

            <div>

              <span className="section-tag">
                Comunidad RedRaíz
              </span>

              <h2>
                Conectamos productores locales con familias colombianas
              </h2>

              <p>
                Impulsamos el comercio justo para que cada compra
                fortalezca el trabajo del campo y apoye el crecimiento
                de miles de familias productoras.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* CONTACTO */}
      <section className="section-spacing">

        <div className="w-75 mx-auto">

          <ContactForm />

        </div>

      </section>
    </div >
  );
};

export default Home;