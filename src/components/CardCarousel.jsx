import React from 'react';
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap';
import slide1 from '/assets/slide1.jpg';
import slide2 from '/assets/slide1.jpg';

const SLIDES = [
  {
    id: 0,
    title: 'Título del Slide 1',
    description: 'Descripción más larga o corta; el contenedor de imagen se adaptará a esta altura.',
    buttons: [{ text: 'Acción 1', variant: 'primary' }, { text: 'Más info', variant: 'outline' }],
    image: slide1,
  },
  {
    id: 1,
    title: 'Título del Slide 2',
    description: 'Otro slide con distinta cantidad de texto para probar el ajuste de altura.',
    buttons: [{ text: 'Comenzar', variant: 'success' }],
    image: slide2,
  },
];

export default function CardCarousel({ interval = 5000 }) {
  return (
    <Carousel
      controls
      indicators
      interval={interval}
      pause="hover"
      slide
      className="bhc-carousel"
    >
      {SLIDES.map((s) => (
        <Carousel.Item key={s.id}>
          <Container>
            <Row className="bhc-slide-inner align-items-stretch">
              {/* Izquierda: texto */}
              <Col md={6} className="bhc-left d-flex flex-column justify-content-center">
                <h2 className="bhc-title">{s.title}</h2>
                <p className="bhc-desc">{s.description}</p>
                <div className="bhc-buttons mt-3">
                  {s.buttons.map((b, i) => (
                    <Button
                      key={i}
                      variant={b.variant === 'outline' ? 'light' : b.variant}
                      className={`me-2 bhc-btn ${b.variant === 'outline' ? 'bhc-outline' : ''}`}
                      onClick={() => console.log(`${b.text} clicked`)}
                    >
                      {b.text}
                    </Button>
                  ))}
                </div>
              </Col>

              {/* Derecha: imagen que toma la altura del contenedor de texto */}
              <Col md={6} className="bhc-right d-flex align-items-center justify-content-center">
                <div className="bhc-image-wrap">
                  <img src={s.image} alt={s.title} loading="lazy" />
                </div>
              </Col>
            </Row>
          </Container>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}