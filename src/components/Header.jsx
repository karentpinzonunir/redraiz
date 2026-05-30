import { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  InputGroup,
  FormControl,
  Image,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import ButtonPrimary from "./ButtonPrimary";
import SubscriptionModal from "./SubscriptionModal";
import logo from "/assets/logos/logo-red-raiz.png";
import "../styles/header.css";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSub, setShowSub] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/busqueda?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleClick = () => {
    setShowSub(true);
  };

  return (
    <>
      <Navbar expand="lg" className="py-3">
        <Container>
          {/* Logo */}
          <Navbar.Brand as={NavLink} to="/" className="fw-bold fs-4">
            <Image
              src={logo}
              alt="Logo RedRaiz"
              fluid
              className="me-2 logo-header"
            />
          </Navbar.Brand>

          {/* Menú y elementos a la derecha */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
            <Nav className="m-end gap-4 menu">
              <Nav.Link as={NavLink} to="/" end className="fw-bold">
                Inicio
              </Nav.Link>
              <Nav.Link as={NavLink} to="/productores" className="fw-bold">
                Productores
              </Nav.Link>
              <Nav.Link as={NavLink} to="/catalogo" className="fw-bold">
                Catálogo
              </Nav.Link>
              <Nav.Link as={NavLink} to="/blog" className="fw-bold">
                Blog
              </Nav.Link>
              <Nav.Link as={NavLink} to="/contacto" className="fw-bold">
                Contacto
              </Nav.Link>
            </Nav>

            {/* Campo de búsqueda + Botón de suscripción */}
            <div className="d-flex align-items-center ms-lg-3">
              <InputGroup className="header-search">
                <InputGroup.Text className="search-icon-wrapper">
                  <i className="fas fa-search search-icon"></i>
                </InputGroup.Text>
                <FormControl
                  type="text"
                  placeholder="Buscar..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </InputGroup>

              <ButtonPrimary onClick={handleClick} className="ms-3">
                Suscríbete
              </ButtonPrimary>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal de Suscripción */}
      <SubscriptionModal show={showSub} onHide={() => setShowSub(false)} />
    </>
  );
};

export default Header;