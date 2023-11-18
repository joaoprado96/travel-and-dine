import React, { useState, useEffect } from 'react';
import { getRestaurantId } from '../services/apiService';
import { useParams } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PhotoCarousel from './components/PhotoCarousel';
import PhotoGallery from './components/PhotoGallery';
import './DetalhesRestaurante.css'; // Adicione esta linha
const config = require('../var');

const DetalhesRestaurante = () => {
  const [restaurant, setRestaurante] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getRestaurantId(id).then(data => setRestaurante(data));
  }, [id]);
  

  if (!restaurant) {
    return <div>Carregando...</div>;
  }

  const imageUrls = restaurant.caminhoFoto.map(foto => `${config.backURL}/image/${foto}`);

  const renderPrice = (priceLevel) => {
    return <span className="price-icons">{'$'.repeat(priceLevel)}</span>;
  };
  
  const renderRating = (rating) => {
    return <span className="rating-icons">
             {'★'.repeat(rating)}
             {'☆'.repeat(5 - rating)}
           </span>;
  };
  

  return (
    <div>
        <Header />
    <div className="container">
      <h2 className="title">{restaurant.nome}</h2>
      <section className="info-box">
        <div className="info-item">
        <strong>Culinária:</strong>
        {restaurant.culinaria.map(c => (
            <span key={c} style={{ padding: '5px', margin: '5px', border: '1px solid gray', borderRadius: '5px', display: 'inline-block',backgroundColor: '#dfdfdf'  }}>
            {c}
            </span>
        ))}
        </div>
        <div className="info-item">
        <strong>Dias:</strong>
        {restaurant.dias.map(dia => (
            <span key={dia} style={{ padding: '5px', margin: '5px', border: '1px solid gray', borderRadius: '5px', display: 'inline-block',backgroundColor: '#dfdfdf'  }}>
            {dia}
            </span>
        ))}
        </div>
        <div className="info-item">
        <strong>Horário:</strong>
        {restaurant.horario.map(h => (
            <span key={h} style={{ padding: '5px', margin: '5px', border: '1px solid gray', borderRadius: '5px', display: 'inline-block',backgroundColor: '#dfdfdf'  }}>
            {h}
            </span>
        ))}
        </div>

        <div className="info-item">
        <strong>Cartões:</strong>
        {restaurant.cartao.map(h => (
            <span key={h} style={{ padding: '5px', margin: '5px', border: '1px solid gray', borderRadius: '5px', display: 'inline-block',backgroundColor: '#dfdfdf'  }}>
            {h}
            </span>
        ))}
        </div>
        
        <div className="info-item">
        <strong>Tema:</strong>
        {restaurant.tema.map(h => (
            <span key={h} style={{ padding: '5px', margin: '5px', border: '1px solid gray', borderRadius: '5px', display: 'inline-block',backgroundColor: '#dfdfdf'  }}>
            {h}
            </span>
        ))}
        </div>

        <p className="info-item">
            <strong>Faixa de Preço:</strong> {renderPrice(restaurant.precos)}
        </p>
        <p className="info-item">
            <strong>Avaliação:</strong> {renderRating(restaurant.avaliacao)}
        </p>
        <p className="info-item"><strong>Endereço:</strong> {restaurant.endereco}</p>
        <p className="info-item"><strong>Telefone:</strong> {restaurant.telefone}</p>
        <p className="info-item"><strong>Instagram:</strong> {restaurant.instagram}</p>
      </section>
      <div>
      <PhotoGallery photos={imageUrls} />
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default DetalhesRestaurante;
