import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Productores from "./pages/Productores";
import Catalogo from "./pages/Catalogo";
import Blog from "./pages/Blog";
import './styles/globals.css';
import './styles/header.css';

function App() {
  return (

    <Router>
      <header className="fixed-top">
        <Header />
      </header>
      <Container className="mt-5 pt-5 pb-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productores" element={<Productores />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
