import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

/* ESTILOS */
import "./styles/globals.css";
import "./styles/header.css";
import "./styles/footer.css";
import "./styles/home.css";
import "./styles/carousel.css";
import "./styles/buttons.css";
import "./styles/productores.css";
import "./styles/catalogo.css";
import "./styles/blog.css";

/* COMPONENTES */
import Header from "./components/Header";
import Footer from "./components/Footer";

/* PAGINAS */
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Catalogo from "./pages/Catalogo";
import Productores from "./pages/Productores";
import ProductorDetalle from "./pages/ProductorDetalle";
import Contacto from "./pages/Contacto";

function App() {
  return (
    <Router>

      <Header />

      <main className="main-content">

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/productores"
            element={<Productores />}
          />

          <Route
            path="/productores/:id"
            element={<ProductorDetalle />}
          />

          <Route
            path="/catalogo"
            element={<Catalogo />}
          />

          <Route
            path="/blog"
            element={<Blog />}
          />

          <Route
            path="/contacto"
            element={<Contacto />}
          />

        </Routes>

      </main>

      <Footer />

    </Router>
  );
}

export default App;