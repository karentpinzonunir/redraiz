import React, { useState, useRef, useEffect } from 'react';
import { Container, Card, Badge, Button } from 'react-bootstrap';

import ButtonPrimary from './ButtonPrimary';
import '../styles/carousel.css';

const historias = [
  {
    nombre: "Gracias campesino",
    region: "Colombia",
    imagen: "/assets/carousel/img1.jpg",
    historia:
      "Gracias por sembrar esperanza en cada cosecha y llevar alimento fresco a millones de hogares colombianos.",
  },
  {
    nombre: "Manos que alimentan",
    region: "Campo colombiano",
    imagen: "/assets/carousel/img2.jpg",
    historia:
      "Detrás de cada alimento hay esfuerzo, dedicación y amor por la tierra.",
  },
  {
    nombre: "Sembrando futuro",
    region: "Colombia",
    imagen: "/assets/carousel/img3.jpg",
    historia:
      "Cada semilla cultivada representa oportunidades para las futuras generaciones.",
  },
  {
    nombre: "Orgullo campesino",
    region: "RedRaíz",
    imagen: "/assets/carousel/img4.jpg",
    historia:
      "El campo colombiano es fuerza, tradición y el corazón de nuestro país.",
  },
];

export default function CardCarousel({ initial = 0 }) {
  const [index, setIndex] = useState(initial);
  const containerRef = useRef(null);
  const slideRef = useRef(null);
  const trackRef = useRef(null);
  const GAP = 24; // espacio entre slides (px)

  // Mueve el track para centrar el slide activo
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

  useEffect(() => {
    recalc();
    window.addEventListener('resize', recalc);
    return () => window.removeEventListener('resize', recalc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    // recalc inicial después del primer render
    setTimeout(recalc, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prev = () => setIndex((i) => (i - 1 + historias.length) % historias.length);
  const next = () => setIndex((i) => (i + 1) % historias.length);
  const goTo = (i) => setIndex(i);

  return (
    <div className="position-relative py-3">
      <Container>
        <div className="overflow-hidden w-100" ref={containerRef}>
          <div className="cf-track" ref={trackRef}>
            {historias.map((h, i) => {
              // Cálculo circular para saber la posición relativa
              const len = historias.length;
              const delta = (i - index + len) % len; // 0 => activo, 1 => right, len-1 => left
              let posClass = 'inactive';
              if (delta === 0) posClass = 'active';
              else if (delta === 1) posClass = 'right-adjacent';
              else if (delta === len - 1) posClass = 'left-adjacent';

              const className = `cf-slide ${posClass}`;

              return (
                <div
                  key={i}
                  className={className}
                  ref={i === 0 ? slideRef : null} // usamos la primera slide para medir ancho
                >
                  <Card className="cf-card h-100">
                    {/* Imagen arriba */}
                    <div className="cf-img-wrap">
                      <Card.Img variant="top" src={h.imagen} alt={h.nombre} loading="lazy" />
                    </div>

                    <Card.Body className="d-flex flex-column text-center">
                      {/* Región como etiqueta */}
                      <Badge className="mb-2 align-self-center tag-historia">{h.region}</Badge>

                      {/* Nombre */}
                      <h3>{h.nombre}</h3>

                      {/* Historia */}
                      <Card.Text className="text-muted flex-grow-1">
                        {h.historia}
                      </Card.Text>

                      {/* Botón de acción */}
                      <div className="mt-3">
                        <ButtonPrimary >
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
          <button className="cf-arrow cf-prev" onClick={prev} aria-label="Anterior">‹</button>
          <button className="cf-arrow cf-next" onClick={next} aria-label="Siguiente">›</button>
        </div>

        {/* Dots */}
        <div className="cf-dots">
          {historias.map((_, i) => (
            <button
              key={i}
              className={`cf-dot ${i === index ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Ir a historia ${i + 1}`}
            />
          ))}
        </div>


      </Container>
    </div>
  );
}