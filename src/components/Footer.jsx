import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer mt-3 mt-lg-5 px-3 px-lg-0 pt-5 pb-3">
      <div className="container">
        <div className="footer-grid d-grid gap-2">
          <div>
            <Link
              to="/"
              className="logo"
            >
              <img
                src="/assets/logos/logo-red-raiz.png"
                width="150px"
                alt="RedRaíz"
                className="footer-logo-image"
              />
            </Link>
            <p className="footer-description">
              La raíz de todo empieza en el campo.
            </p>
          </div>
          <div>
            <h5>Contacto</h5>
            <ul>
              <li>contacto@redraiz.com</li>
              <li>+57 300 123 4567</li>
              <li>Colombia</li>
            </ul>
          </div>
          <div>
            <h5>Contenido</h5>
            <ul>
              <li>
                <Link to="/">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/productores">
                  Productores
                </Link>
              </li>
              <li>
                <Link to="/catalogo">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link to="/blog">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5>Soporte</h5>
            <ul>
              <li>
                <Link to="/contacto">
                  Contacto
                </Link>
              </li>
              <li>
                Política de privacidad
              </li>
              <li>
                Términos y condiciones
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;