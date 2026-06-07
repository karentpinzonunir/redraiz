// Slider.jsx
import React from 'react';
import { Carousel, Row, Col, Image } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import ButtonPrimary from './ButtonPrimary';
import ButtonSecondary from './ButtonSecondary';
import { useApi } from '../hooks/useApi';
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
    const { data: slider, loading, error } = useApi(`/api/sliders/${id}/completo`);

    if (loading) return <p>Cargando slider...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!slider) return null;

    return (
        <Carousel
            controls
            indicators
            interval={slider.interval}
            pause="hover"
            className="rounded"
        >
            {slider.slides.map((slide) => (
                <Carousel.Item key={slide.id} className="pb-3 px-5">
                    <Row className="align-items-center slider-item px-3">
                        <Col md={7} className="pe-5">
                            {/* dangerouslySetInnerHTML permite renderizar HTML en el texto */}
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
                        <Col md={5} className="text-center rounded-5 d-flex justify-content-center align-items-center overflow-hidden div-image">
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