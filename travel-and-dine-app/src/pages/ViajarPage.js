import React, { useState, useEffect } from 'react';
import { getTravelOptions } from '../services/apiService';

const ViajarPage = () => {
    const [travelOptions, setTravelOptions] = useState([]);

    useEffect(() => {
        getTravelOptions().then(data => setTravelOptions(data));
    }, []);

    return (
        <div>
            <h2>Explore Opções de Viagem</h2>
            <div>
                {travelOptions.map(option => (
                    <div key={option.id} style={{ margin: '20px', padding: '10px', border: '1px solid #ccc' }}>
                        <h3>{option.destination}</h3>
                        <p>Descrição: {option.description}</p>
                        {/* Adicione aqui outras informações do destino, como preços, datas disponíveis, etc. */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViajarPage;
