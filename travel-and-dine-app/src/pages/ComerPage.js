import React, { useState, useEffect } from 'react';
import { getRestaurants } from '../services/apiService';

const ComerPage = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getRestaurants().then(data => setRestaurants(data));
  }, []);
  console.log(restaurants);
  return (
    <div>
      <h2>Opções de Restaurantes</h2>
      <div>
        {restaurants.map(restaurant => (
          <div key={restaurant.item._id} style={{ display: 'flex', alignItems: 'center', margin: '20px', padding: '10px', border: '1px solid #ccc' }}>
            <img 
              src={restaurant.item._id}
              alt={restaurant.item._id} 
              style={{ width: '100px', height: '100px', marginRight: '20px' }} // Ajuste conforme necessário
            />
            <div>
              <h3>{restaurant._id}</h3>
              <p>Culinária: {restaurant.item._id}</p>
              <p>Faixa de Preço: {restaurant.item._id}</p>
              {/* Aqui você pode adicionar mais informações ou ações para cada restaurante */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComerPage;
