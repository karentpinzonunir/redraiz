// Slider.jsx
import React, { useState } from 'react';
import { Carousel, Row, Col, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import ButtonPrimary from './ButtonPrimary';
import ButtonSecondary from './ButtonSecondary';
import { useGet } from '../hooks/useGet';
import { useInterval } from '../hooks/useInterval';
import { useWindowSize } from '../hooks/useWindowSize';
import '../styles/slider.css';

// Componente para renderizar botones según su tipo
const SlideButton = ({ boton }) => {
  if (!boton) return null;

  if (boton.tipo === 'primary') {
    return (
      <ButtonPrimary as={NavLink} to={boton.url}>
        {boton.label}
      </ButtonPrimary>
    );
  }

  if (boton.tipo === 'secondary') {
    return (
      <ButtonSecondary as={NavLink} to={boton.url} className="ms-3">
        {boton.label}
      </ButtonSecondary>
    );
  }

  return null;
};

export default function Slider({ id = 1 }) {
  const { data: slider, loading, error } = useGet(`/api/sliders/${id}/completo`);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Disponible para lógica condicional por breakpoint si se necesita
  const { width } = useWindowSize();

  const slides = slider?.slides ?? [];

  // ── useInterval reemplaza el autoplay nativo de Bootstrap ─────────
  useInterval(
    () => setActiveIndex((i) => (i + 1) % slides.length),
    !isPaused && slides.length > 0 ? (slider?.interval ?? 4000) : null
  );

  // ── Navegación manual ─────────────────────────────────────────────
  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  // ── Estados de carga ──────────────────────────────────────────────
  if (loading) return <p>Cargando slider...</p>;
  if (error)   return <p>Error: {error}</p>;
  if (!slider || slides.length === 0) return null;

  // ── Render ────────────────────────────────────────────────────────
  return (
    <Carousel
      controls
      indicators
      interval={null}             // Desactivamos autoplay nativo de Bootstrap
      activeIndex={activeIndex}   // Índice controlado por estado
      onSelect={handleSelect}     // Sincroniza navegación manual
      pause={false}               // Nosotros manejamos la pausa
      className="rounded"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slides.map((slide) => (
        <Carousel.Item key={slide.id} className="pb-5 px-5">
          <Row className="align-items-center slider-item px-3">
            <Col md={7} className="pe-5">
              <h1
                className="text-start"
                dangerouslySetInnerHTML={{ __html: slide.titulo }}
              />
              <p
                className="fs-5"
                dangerouslySetInnerHTML={{ __html: slide.descripcion }}
              />
              <div className="slider-buttons">
                <SlideButton boton={slide.boton1} />
                <SlideButton boton={slide.boton2} />
              </div>
            </Col>
            <Col
              md={5}
              className="text-center rounded-5 d-flex justify-content-center align-items-center overflow-hidden div-image"
            >
              <Image
                src={`/assets/${slider.carpeta}/${slide.imagen}`}
                alt={slide.titulo}
                className="h-100"
              />
            </Col>
          </Row>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}