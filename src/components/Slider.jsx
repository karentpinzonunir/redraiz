// Slider.jsx
import React from 'react';
import { Carousel, Container, Row, Col, Button, Image } from 'react-bootstrap';
// Importa tus imágenes desde /src/assets o usa rutas en /public
import slide1 from '/assets/slider/slide1.jpg';
import '../styles/slider.css'; // estilos opcionales abajo
import ButtonPrimary from './ButtonPrimary';
import ButtonSecondary from './ButtonSecondary';
import { NavLink } from "react-router-dom";

export default function Slider() {
    return (
        <Carousel controls indicators interval={4000} pause="hover" className="rounded">
            <Carousel.Item className="pb-3 px-5">
                <Row className="align-items-center slider-item px-3">
                    <Col md={7} className="pe-5">
                        <h1 className="text-start">Detrás de cada alimento hay un campesino</h1>
                        <p className="fs-5">En RedRaíz creemos en el comercio justo. Cada compra que realizas contribuye al desarrollo económico de pequeños productores.</p>
                        <div className="slider-buttons">
                            <ButtonPrimary as={NavLink} to="/catalogo">
                                Explora aquí
                            </ButtonPrimary>
                            <ButtonSecondary as={NavLink} to="/productores" className="ms-3">
                                Productores
                            </ButtonSecondary>
                        </div>
                    </Col>
                    <Col md={5} className="text-center rounded-5 d-flex justify-content-center align-items-center overflow-hidden div-image">
                        <Image
                            src={slide1} alt="Slide 1" className="h-100"
                        />
                    </Col>
                </Row>
            </Carousel.Item>
        </Carousel>
    );
}