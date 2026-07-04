// CardCarousel.jsx
import React, { useState, useRef, useEffect } from "react";
import { Container, Card, Badge, Spinner } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import ButtonPrimary from "./ButtonPrimary";
import { useGet } from "../hooks/useGet";
import { useInterval } from "../hooks/useInterval";
import { useWindowSize } from "../hooks/useWindowSize";
import "../styles/carousel.css";

export default function CardCarousel({ id = 2, initial = 0 }) {
  const {
    data: slider,
    loading,
    error,
  } = useGet(`/api/sliders/${id}/completo`);

  const [index, setIndex] = useState(initial);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const slideRef = useRef(null);
  const trackRef = useRef(null);
  const GAP = 24;

  const slides = slider?.slides ?? [];

  // ── useWindowSize reemplaza el addEventListener manual ────────────
  const { width } = useWindowSize();

  // ── Centrar slide activo ──────────────────────────────────────────
  const recalc = () => {
    const container = containerRef.current;
    const slide = slideRef.current;
    const track = trackRef.current;
    if (!container || !slide || !track) return;

    const slideWidth = slide.offsetWidth;
    const step = slideWidth + GAP;
    const containerWidth = container.offsetWidth;
    const centerOffset = (containerWidth - slideWidth) / 2;
    const translateX = -index * step + centerOffset;
    track.style.transform = `translateX(${translateX}px)`;
  };

  // Se recalcula cuando cambia el índice, los slides o el ancho de ventana
  useEffect(() => {
    recalc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, slides, width]);

  // Recalc inicial con pequeño delay para que el DOM esté listo
  useEffect(() => {
    setTimeout(recalc, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── useInterval reemplaza el setInterval/clearInterval manual ─────
  useInterval(
    () => setIndex((i) => (i + 1) % slides.length),
    !isPaused && slider?.interval && slides.length > 0 ? slider.interval : null,
  );

  // ── Navegación ────────────────────────────────────────────────────
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);
  const goTo = (i) => setIndex(i);

  // ── Estados de carga ──────────────────────────────────────────────
  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center carrousel-home">
        <div className="text-center">
          <Spinner variant="dark" role="status"></Spinner>
          <p className="mt-2">Cargando Slider ...</p>
        </div>
      </div>
    );
  if (error)
    return <p className="text-center py-5 text-danger">Error: {error}</p>;
  if (!slider || slides.length === 0) return null;

  // ── Render ────────────────────────────────────────────────────────
  return (
    <div
      className="position-relative py-3"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Container>
        <div className="overflow-hidden w-100" ref={containerRef}>
          <div className="cf-track" ref={trackRef}>
            {slides.map((slide, i) => {
              const len = slides.length;
              const delta = (i - index + len) % len;
              let posClass = "inactive";
              if (delta === 0) posClass = "active";
              else if (delta === 1) posClass = "right-adjacent";
              else if (delta === len - 1) posClass = "left-adjacent";

              return (
                <div
                  key={slide.id}
                  className={`cf-slide ${posClass}`}
                  ref={i === index ? slideRef : null}
                >
                  <Card className="cf-card h-100">
                    <div className="cf-img-wrap">
                      <Card.Img
                        variant="top"
                        src={`/assets/${slider.carpeta}/${slide.imagen}`}
                        alt={slide.titulo}
                        loading="lazy"
                      />
                    </div>

                    <Card.Body className="d-flex flex-column text-center">
                      <Badge className="mb-2 align-self-center tag-categoria">
                        {slide.categoria?.nombre || "Sin categoría"}
                      </Badge>

                      <h3>{slide.titulo}</h3>

                      <Card.Text className="text-muted flex-grow-1">
                        {slide.descripcion}
                      </Card.Text>

                      <div className="mt-3">
                        <ButtonPrimary
                          as={NavLink}
                          to={`/historia/${slide.id}`}
                        >
                          Leer Más
                        </ButtonPrimary>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Controles */}
        <div className="cf-controls">
          <button
            className="cf-arrow cf-prev"
            onClick={prev}
            aria-label="Anterior"
          >
            ‹
          </button>
          <button
            className="cf-arrow cf-next"
            onClick={next}
            aria-label="Siguiente"
          >
            ›
          </button>
        </div>

        {/* Dots */}
        <div className="cf-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`cf-dot ${i === index ? "active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Ir a historia ${i + 1}`}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
