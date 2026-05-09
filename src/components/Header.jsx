// src/components/Header.jsx
import { useState } from "react";
import { Navbar, Nav, Container, InputGroup, FormControl, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ButtonPrimary from "./ButtonPrimary";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleClick = () => {
    
  }

  return (
    <>
      <Navbar expand="lg" className="py-3">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
            Redraiz
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="m-auto gap-4">
              <Nav.Link className="text-white" as={Link} to="/">Inicio</Nav.Link>
              <Nav.Link className="text-white" as={Link} to="/productores">Productores</Nav.Link>
              <Nav.Link className="text-white" as={Link} to="/catalogo">Catálogo</Nav.Link>
              <Nav.Link className="text-white" as={Link} to="/blog">Blog</Nav.Link>
            </Nav>

            {/* Barra de búsqueda estilo integrado */}
            <div className="d-flex align-items-center ms-lg-3">
              <InputGroup style={{ maxWidth: "300px" }}>
                <FormControl
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="border-end-0 rounded-start-pill ps-3"
                  style={{ borderRight: "none" }}
                />
                <Button
                  variant="outline-secondary"
                  onClick={handleSearch}
                  className="rounded-end-pill border-start-0"
                  style={{
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderLeft: "none",
                    zIndex: 0,
                  }}
                >
                  🔍
                </Button>
              </InputGroup>
              <ButtonPrimary onClick={handleClick}>
                Suscríbete
              </ButtonPrimary>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;