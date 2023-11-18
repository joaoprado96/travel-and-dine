import React from 'react';
import Slider from 'react-slick';
import './PhotoCarousel.css'

const PhotoCarousel = ({ images }) => {
  const settings = {
    dots: true,            // Ativa os pontos de navegação
    infinite: true,        // Loop infinito
    speed: 500,            // Velocidade da transição
    slidesToShow: 1,       // Quantidade de slides para mostrar
    slidesToScroll: 1,     // Quantos slides rolar de uma vez
    autoplay: false,       // Desabilita o autoplay
    arrows: true,          // Ativa as setas de navegação
  };

  return (
      <div className="carrossel-container">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img 
                src={image} 
                alt={`Slide ${index}`} 
                className="carrossel-imagem"
              />
            </div>
          ))}
        </Slider>
      </div>
  );
};

export default PhotoCarousel;
