import { useState, useEffect, useRef } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const headerRef = useRef(null);

  useEffect(() => {
    if (headerRef.current) {
      menuOpen
        ? headerRef.current.classList.add("menu-abierto")
        : headerRef.current.classList.remove("menu-abierto");
    }
  }, [menuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 991) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/busqueda?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleClick = () => setShowSub(true);

  const handleNavClick = () => setMenuOpen(false);

  return (

    <header className="fixed-top" ref={headerRef}>
      <div className="header" >
        <Navbar
          expand="lg"
          className="py-3"
          variant="dark"
          expanded={menuOpen}
          onToggle={() => setMenuOpen((prev) => !prev)}
        >
          <Container>

            <Navbar.Brand as={NavLink} to="/" className="fw-bold fs-4 me-2">
              <Image
                src={logo}
                alt="Logo RedRaiz"
                fluid
                className="logo-header"
              />
            </Navbar.Brand>
            <ButtonPrimary onClick={handleClick} className="d-lg-none me-2">
              Suscríbete
            </ButtonPrimary>

            <Navbar.Toggle aria-controls="basic-navbar-nav p-2" className="p-2" />
            <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
              <Nav className="gap-2 gap-lg-4 pb-3 pb-lg-0 menu">
                <Nav.Link as={NavLink} to="/" end className="fw-bold" onClick={handleNavClick}>
                  Inicio
                </Nav.Link>
                <Nav.Link as={NavLink} to="/productores" className="fw-bold" onClick={handleNavClick}>
                  Productores
                </Nav.Link>
                <Nav.Link as={NavLink} to="/catalogo" className="fw-bold" onClick={handleNavClick}>
                  Catálogo
                </Nav.Link>
                <Nav.Link as={NavLink} to="/blog" className="fw-bold" onClick={handleNavClick}>
                  Blog
                </Nav.Link>
                <Nav.Link as={NavLink} to="/contacto" className="fw-bold" onClick={handleNavClick}>
                  Contacto
                </Nav.Link>
              </Nav>

              <div className="d-lg-flex align-items-center ms-lg-3">
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

                <ButtonPrimary onClick={handleClick} className="d-none d-lg-block ms-3">
                  Suscríbete
                </ButtonPrimary>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <SubscriptionModal show={showSub} onHide={() => setShowSub(false)} />
      </div>
    </header>
  );
};

export default Header;