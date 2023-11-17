import React, { useState, useEffect } from 'react';
import { getRestaurantId } from '../services/apiService';
import { useParams } from 'react-router-dom';
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

  return (
    <div>
      <h2>{restaurant.nome}</h2>
        <p>Culinária: {restaurant.culinaria}</p>
        <p>Dias: {restaurant.dias}</p>
        <p>Horario: {restaurant.horario}</p>
        <p>Faixa de Preço: {restaurant.precos}</p>
        <p>Cartões: {restaurant.cartao}</p>
        <p>Tema: {restaurant.tema}</p>
        <p>Avaliação: {restaurant.avaliacao}</p>
        <p>Endereço: {restaurant.endereco}</p>
        <p>Telefone: {restaurant.telefone}</p>
        <p>Instagram: {restaurant.instagram}</p>
      <div className="galeria-fotos">
        {restaurant.caminhoFoto.map((foto, index) => (
          <img key={index} src={`http://localhost:3001/image/${foto}`} alt={`Foto do restaurante ${restaurant.nome}`} style={{ width: '200px', margin: '10px' }} />
        ))}
      </div>
    </div>
  );
};

export default DetalhesRestaurante;
