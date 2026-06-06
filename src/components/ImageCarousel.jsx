import React from "react";
import Carousel from "react-bootstrap/Carousel";

import "../styles/carousel.css";

const ImageCarousel = ({ stories }) => {
  return (
    <Carousel fade indicators controls>

      {stories.map((story, index) => (

        <Carousel.Item key={index}>

          <div className="story-card">

            <img
              src={story.imagen}
              alt={story.nombre}
              className="story-image"
            />

            <div className="story-content">

              <span className="story-region">
                {story.region}
              </span>

              <h3>{story.nombre}</h3>

              <p>{story.historia}</p>

            </div>

          </div>

        </Carousel.Item>

      ))}

    </Carousel>
  );
};

export default ImageCarousel;