import React, { useState } from "react";
import { Modal, Carousel, Image, Button, Row, Col } from "react-bootstrap";
import "../styles/productores.css";

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
            <Row className="mt-2 justify-content-center">
                {filledImages.map((img, index) => {
                    const url = getImageUrl(img);
                    const isPlaceholder = !img;

                    return (
                        <Col xs={6} sm={3} lg={2} key={index} className="d-flex justify-content-center">

                            <Button
                                variant="light"
                                className="p-0 border-0 rounded-2 shadow-sm boton-galeria"
                                onClick={() => openGalleryAt(index)}
                            >
                                {isPlaceholder ? (
                                    <i className="fa-regular fa-image text-muted fs-5"></i>

                                ) : (
                                    <Image
                                        src={url}
                                        alt={`Thumbnail ${index}`}
                                        className="w-100 h-100"
                                        thumbnail
                                    />
                                )}
                            </Button>
                        </Col>
                    );
                })}
            </Row>

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
                                <div className="d-flex align-items-strat justify-content-center galeria-productor">
                                    <Image
                                        src={getImageUrl(img)}
                                        alt={`Slide ${idx}`}
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