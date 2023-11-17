import React, { useState, useEffect } from 'react';
import { getRestaurants } from '../services/apiService';
import { Link } from 'react-router-dom';
const config = require('../var');

const ComerPage = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getRestaurants().then(data => setRestaurants(data));
  }, []);

  return (
    <div>
      <h2>Opções de Restaurantes</h2>
      <div>
        {restaurants.map(restaurant => (
          <Link to={`/DetalhesRestaurante/${restaurant.item._id}`} key={restaurant.item._id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ display: 'flex', alignItems: 'center', margin: '20px', padding: '10px', border: '1px solid #ccc' }}>
            <img 
                src={restaurant.item.caminhoFoto && restaurant.item.caminhoFoto.length > 0 ? `${config.backURL}/image/${restaurant.item.caminhoFoto[0]}` : `${config.backURL}/image/${config.imgpadrao}`}
                alt={restaurant.item.nome} 
                style={{ width: '100px', height: '100px', marginRight: '20px' }}
            />
              <div>
                <h3>{restaurant.item.nome}</h3>
                <p>Culinária: {restaurant.item.culinaria}</p>
                <p>Dias: {restaurant.item.dias}</p>
                <p>Horario: {restaurant.item.horario}</p>
                <p>Faixa de Preço: {restaurant.item.precos}</p>
                <p>Avaliação: {restaurant.item.avaliacao}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ComerPage;
