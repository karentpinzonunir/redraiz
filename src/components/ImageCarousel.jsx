import React from "react";
import Carousel from "react-bootstrap/Carousel";

const ImageCarousel = ({ images }) => {
  return (
    <Carousel fade>

      {images.map((img, index) => (
        <Carousel.Item key={index}>

          <img
            src={img}
            alt={`slide-${index}`}
            className="carousel-image"
          />

        </Carousel.Item>
      ))}

    </Carousel>
  );
};

export default ImageCarousel;