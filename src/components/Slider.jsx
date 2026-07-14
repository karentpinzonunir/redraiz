import React, { useState } from "react";
import { Carousel, Row, Col, Image, Spinner } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";
import { useGet } from "../hooks/useGet";
import { useInterval } from "../hooks/useInterval";
import { useWindowSize } from "../hooks/useWindowSize";
import "../styles/slider.css";

const SlideButton = ({ boton }) => {
  if (!boton) return null;

  if (boton.tipo === "primary") {
    return (
      <ButtonPrimary as={NavLink} to={boton.url}>
        {boton.label}
      </ButtonPrimary>
    );
  }

  if (boton.tipo === "secondary") {
    return (
      <ButtonSecondary as={NavLink} to={boton.url}>
        {boton.label}
      </ButtonSecondary>
    );
  }

  return null;
};

export default function Slider({ id = 1 }) {
  const {
    data: slider,
    loading,
    error,
  } = useGet(`/api/sliders/${id}/completo`);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { width } = useWindowSize();

  const slides = slider?.slides ?? [];

  useInterval(
    () => setActiveIndex((i) => (i + 1) % slides.length),
    !isPaused && slides.length > 0 ? (slider?.interval ?? 4000) : null,
  );

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  if (loading)
    return (
      <div className="slide-home d-flex justify-content-center align-items-center">
        <div className="text-center">
          <Spinner variant="dark" role="status"></Spinner>
          <p className="mt-2">Cargando Slider ...</p>
        </div>
      </div>
    );
  if (error) return <p>Error: {error}</p>;
  if (!slider || slides.length === 0) return null;

  return (
    <Carousel
      controls
      indicators
      interval={null}
      activeIndex={activeIndex}
      onSelect={handleSelect}
      pause={false}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slides.map((slide) => (
        <Carousel.Item key={slide.id} className="pb-5 px-3 px-lg-5">
          <Row className="align-items-center slider-item px-3">
            <Col md={7} className="px-0 pe-lg-5 order-2 0rder-lg-1">
              <h1
                className="text-start"
                dangerouslySetInnerHTML={{ __html: slide.titulo }}
              />
              <p
                dangerouslySetInnerHTML={{ __html: slide.descripcion }}
              />
              <div>
                <SlideButton boton={slide.boton1} />
                <SlideButton className="ms-2" boton={slide.boton2} />
              </div>
            </Col>
            <Col
              md={5}
              className="text-center rounded-5 d-flex justify-content-center align-items-center overflow-hidden div-image p-0 mb-3 mb-lg-0 order-1 order-lg-2"
            >
              <Image
                src={`/assets/${slider.carpeta}/${slide.imagen}`}
                alt={slide.titulo}
                className="img-fluid"
              />
            </Col>
          </Row>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
