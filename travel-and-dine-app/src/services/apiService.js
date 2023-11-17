const config = require('../var');

// Função para buscar restaurantes
export const getRestaurants = (filter = {}) => {
  const queryParams = new URLSearchParams();

  Object.entries(filter).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // Adiciona cada valor do array de filtros multiselect
      value.forEach(val => queryParams.append(key, val));
    } else if (value) {
      // Adiciona o valor de filtros de select simples
      queryParams.append(key, value);
    }
  });

  const queryString = queryParams.toString();
  return fetch(`${config.backURL}/rotas/search?${queryString}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao buscar dados da API');
      }
      return response.json();
    })
    .then(data => data.map(item => ({ item })))
    .catch(error => console.error('Erro ao buscar restaurantes:', error));
};
  
export const getFiltros = () => {
    return fetch(`${config.backURL}/rotas/filters`)
    .then(response => response.json())
    .then(data => {
            return data;
    })
    .catch(error => console.error('Erro ao buscar opções de filtro:', error));
};
  
  

// Função para buscar restaurantes
export const getRestaurantId = (id) => {
    return fetch(`http://localhost:3001/rotas/search/${id}`)
        .then(response => response.json())
        .then(data => {
            // Aqui você também pode transformar os dados conforme necessário
            return data;
        })
        .catch(error => console.error('Erro ao buscar detalhes do restaurante:', error));
};

// Função para buscar opções de viagem
export const getTravelOptions = () => {
    return fetch(`http://localhost:3001/rotas/buscar`)
        .then(response => response.json())
        .then(data => {
            // Aqui você também pode transformar os dados conforme necessário
            return data;
        })
        .catch(error => console.error('Erro ao buscar opções de viagem:', error));
};


