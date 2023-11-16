import React, { useState, useEffect } from 'react';
import { getRestaurantId } from '../services/apiService';
import { useParams } from 'react-router-dom';

const DetalhesRestaurante = () => {
  const [restaurante, setRestaurante] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getRestaurantId(id).then(data => setRestaurante(data));
  }, [id]);
  

  if (!restaurante) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2>{restaurante.nome}</h2>
      <p>Culinária: {restaurante.Categoria}</p>
      <p>Faixa de Preço: {restaurante.Preço}</p>
      <p>Endereço: {restaurante.endereco}</p>
      <div className="galeria-fotos">
        {restaurante.caminhoFoto.map((foto, index) => (
          <img key={index} src={`http://localhost:3001/image/${foto}`} alt={`Foto do restaurante ${restaurante.nome}`} style={{ width: '200px', margin: '10px' }} />
        ))}
      </div>
    </div>
  );
};

export default DetalhesRestaurante;
