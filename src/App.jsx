import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Productores from "./pages/Productores";
import ProductorDetalle from "./pages/ProductorDetalle";
import Catalogo from "./pages/Catalogo";
import ProductoDetalle from "./pages/ProductoDetalle";
import Blog from "./pages/Blog";
import HistoriaDetalle from "./pages/HistoriaDetalle";
import Contacto from "./pages/Contacto";
import Busqueda from "./pages/Busqueda";
import './styles/globals.css';

function App() {
  return (
    <Router>
      <header className="fixed-top">
        <Header />
      </header>
      <Container className="mt-5 pt-5 pb-3 contenedor--raiz">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productores" element={<Productores />} />
          <Route path="/productores/:id" element={<ProductorDetalle />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/catalogo/:id" element={<ProductoDetalle />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:url-historia" element={<HistoriaDetalle />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/busqueda" element={<Busqueda />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
