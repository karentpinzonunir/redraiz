// src/components/ImageGallery.jsx
import React, { useState } from "react";
import { Modal, Carousel, Image, Button, Row, Col } from "react-bootstrap";

const ImageGallery = ({ images = [], basePath = "/assets/productores/", folder = "default" }) => {
    const [showModal, setShowModal] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const filledImages = images

    const getImageUrl = (img) => {
        if (!img) return "";
        if (img.startsWith("/assets/") || img.startsWith("http")) return img;
        return `${basePath}${folder}/${img}`;
    };

    const openGalleryAt = (index) => {
        if (!images[index]) return;
        setActiveIndex(index);
        setShowModal(true);
    };

    return (
        <>
            {/* GRID de 12 columnas exactas sin scroll */}
            <Row className="g-1 mt-2 flex-nowrap justify-content-center">
                {filledImages.map((img, index) => {
                    const url = getImageUrl(img);
                    const isPlaceholder = !img;

                    return (
                        <Col sm={2} key={index}>
                                {isPlaceholder ? (
                                    <Button
                                        variant="light"
                                        className="p-1 border rounded-2 w-100 d-flex align-items-center justify-content-center shadow-sm boton-galeria"
                                        disabled
                                        style={{ height: "200px" }}
                                    >
                                        <i className="fa-regular fa-image text-muted" style={{ fontSize: '0.8rem' }}></i>
                                    </Button>
                                ) : (
                                    <button
                                        className="p-0 border-0 rounded-2 shadow-sm boton-galeria"
                                        onClick={() => openGalleryAt(index)}
                                        style={{ height: "200px"}}
                                    >
                                        <Image
                                            src={url}
                                            alt={`Thumbnail ${index}`}
                                            className="w-100 h-100"
                                            style={{ objectFit: "cover" }}
                                            thumbnail
                                        />
                                    </button>
                                )}
                        </Col>
                    );
                })}
            </Row>

            {/* Modal con Carrusel (solo para imágenes reales) */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
                <Modal.Header closeButton className="bg-dark border-0">
                </Modal.Header>
                <Modal.Body className="bg-dark">
                    <Carousel
                        activeIndex={activeIndex}
                        onSelect={(idx) => setActiveIndex(idx)}
                        interval={null}
                        variant="dark"
                        className="carousel-light"
                    >
                        {images.map((img, idx) => (
                            <Carousel.Item key={idx}>
                                <div className="d-flex align-items-strat justify-content-center" style={{ height: "80vh" }}>
                                    <Image
                                        src={getImageUrl(img)}
                                        alt={`Slide ${idx}`}
                                        style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain", height: "74vh" }}
                                        fluid
                                    />
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ImageGallery;