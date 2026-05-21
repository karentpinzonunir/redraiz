import React from "react";

import { Link } from "react-router-dom";

import { FiSearch } from "react-icons/fi";

const Header = () => {

  return (
    <header className="header">

      <div className="nav-container">

        {/* LOGO */}
        <Link
          to="/"
          className="logo"
        >

          <img
            src="/assets/logo-red-raiz.png"
            alt="RedRaiz"
          />

        </Link>

        {/* NAV */}
        <nav className="nav-links">

          <Link to="/">
            Inicio
          </Link>

          <Link to="/productores">
            Productores
          </Link>

          <Link to="/catalogo">
            Catálogo
          </Link>

          <Link to="/blog">
            Blog
          </Link>

          {/* NUEVO CONTACTO */}
          <Link to="/contacto">
            Contacto
          </Link>

          {/* SEARCH */}
          <div className="header-search">

            <FiSearch className="search-icon" />

            <input
              type="text"
              placeholder="Buscar..."
            />

          </div>

          {/* BTN */}
          <Link
            to="/contacto"
            className="btn-header"
          >
            SUSCRIPCIÓN
          </Link>

        </nav>

      </div>

    </header>
  );
};

export default Header;