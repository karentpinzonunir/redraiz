import React from "react";
import "../styles/home.css";

import HeroSection from "../components/HeroSection";
import ImageCarousel from "../components/ImageCarousel";
import SectionTitle from "../components/SectionTitle";
import ContactForm from "../components/Contactform";

const historias = [
  {
    nombre: "Gracias campesino",
    region: "Colombia",
    imagen: "/assets/img1.jpg",
    historia:
      "Gracias por sembrar esperanza en cada cosecha y llevar alimento fresco a millones de hogares colombianos.",
  },

  {
    nombre: "Manos que alimentan",
    region: "Campo colombiano",
    imagen: "/assets/img2.jpg",
    historia:
      "Detrás de cada alimento hay esfuerzo, dedicación y amor por la tierra.",
  },

  {
    nombre: "Sembrando futuro",
    region: "Colombia",
    imagen: "/assets/img3.jpg",
    historia:
      "Cada semilla cultivada representa oportunidades para las futuras generaciones.",
  },

  {
    nombre: "Orgullo campesino",
    region: "RedRaíz",
    imagen: "/assets/img4.jpg",
    historia:
      "El campo colombiano es fuerza, tradición y el corazón de nuestro país.",
  },
];

const Home = () => {
  return (
    <div className="home-page">

      {/* INTRODUCCIÓN */}
      <section className="home-intro">

        <div className="container-custom">

          <span className="section-tag">
            REDRAÍZ
          </span>

          <h1>
            Alimenta tu hogar con propósito y con alma
          </h1>

          <p>
            Cuando compras al campesino, siembras esperanza.
          </p>

        </div>

      </section>

      {/* HERO */}
      <HeroSection />

      {/* BANNER */}
      <section className="banner-section">

        <div className="container-custom">

          <img
            src="/assets/BANNER.png"
            alt="Productos sin intermediarios"
            className="home-banner"
          />

        </div>

      </section>

      {/* HISTORIAS DEL CAMPO */}
      <section className="section-spacing">

        <div className="container-custom">

          <SectionTitle
            tag="Historias del campo"
            title="Gracias por alimentar a Colombia"
            description="Cada cosecha es una muestra de esfuerzo, dedicación y amor por la tierra."
            center
          />

          <ImageCarousel
            stories={historias}
          />

        </div>

      </section>

      {/* COMUNIDAD */}
      <section className="community-section">

        <div className="container-custom">

          <div className="community-grid">

            <div>

              <img
                src="/assets/img7.jpg"
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

        <div className="container-custom">

          <ContactForm />

        </div>

      </section>

    </div>
  );
};

export default Home;