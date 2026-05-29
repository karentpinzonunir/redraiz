import React from "react";
import { Link } from "react-router-dom";

import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";

const HeroSection = () => {
  return (
    <section className="hero-section">

      <div className="container-custom">

        <div className="hero-grid">

          <div className="hero-content">

            <h1>
              Detrás de cada alimento
              <br />
              hay un campesino
            </h1>

            <p>
              En RedRaíz creemos en el comercio justo.
              Cada compra que realizas contribuye al
              desarrollo económico de pequeños productores.
            </p>

            <div className="hero-buttons">

              <Link to="/catalogo">
                <ButtonPrimary>
                  Explora aquí
                </ButtonPrimary>
              </Link>

              <Link to="/productores">
                <ButtonSecondary>
                  Productores
                </ButtonSecondary>
              </Link>

            </div>

          </div>

          <div className="hero-image">

            <img
              src="/assets/img7.jpg"
              alt="Productora"
            />

          </div>

        </div>

      </div>

    </section>
  );
};

export default HeroSection;