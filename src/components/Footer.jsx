import React from "react";

import {
  FiInstagram,
  FiLinkedin,
} from "react-icons/fi";

import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {

  return (
    <footer className="footer">

      <div className="container-custom">

        <div className="footer-grid">

          {/* INFO */}
          <div>

            <h3 className="footer-logo">
              RED RAIZ
            </h3>

            <p className="footer-description">
              La raíz de todo empieza en el campo.
            </p>

            <div className="footer-socials">

              <FiInstagram />

              <FiLinkedin />

              <FaXTwitter />

            </div>

          </div>

          {/* CONTACTO */}
          <div>

            <h5>
              Contacto
            </h5>

            <ul>

              <li>
                Email:
                info@nexus.com
              </li>

              <li>
                Teléfono:
                <br />
                +57 310 555 8899
              </li>

              <li>
                Dirección:
                Calle 21
                <br />
                #45-17, Aranjuez
              </li>

            </ul>

          </div>

          {/* CONTENIDO */}
          <div>

            <h5>
              Contenido
            </h5>

            <ul>

              <li>Catálogo</li>

              <li>Co-working</li>

              <li>Tienda</li>

              <li>Novedades</li>

            </ul>

          </div>

          {/* SOPORTE */}
          <div>

            <h5>
              Soporte
            </h5>

            <ul>

              <li>Contacto</li>

              <li>
                Horario:
                <br />
                Lunes a Sábado
                9:00am - 6:00pm
              </li>

              <li>Legal</li>

            </ul>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;