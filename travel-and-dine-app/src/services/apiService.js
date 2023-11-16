// Função para buscar restaurantes
export const getRestaurants = () => {
    return fetch('http://localhost:3001/rotas/buscar')
        .then(response => response.json())
        .then(data => {
            // Aqui você pode transformar os dados conforme necessário
            return data.map(item => ({
                item
            }));
        })
        .catch(error => console.error('Erro ao buscar restaurantes:', error));
};

// Função para buscar restaurantes
export const getRestaurantId = (id) => {
    return fetch(`http://localhost:3001/rotas/buscar/${id}`)
        .then(response => response.json())
        .then(data => {
            // Aqui você também pode transformar os dados conforme necessário
            return data;
        })
        .catch(error => console.error('Erro ao buscar detalhes do restaurante:', error));
};

// Função para buscar opções de viagem
export const getTravelOptions = () => {
    return fetch('http://localhost:3001/rotas/buscar')
        .then(response => response.json())
        .then(data => {
            // Aqui você também pode transformar os dados conforme necessário
            return data;
        })
        .catch(error => console.error('Erro ao buscar opções de viagem:', error));
};


