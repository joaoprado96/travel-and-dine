import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/fundo.jpg';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();

    const navigateTo = (path) => {
        navigate(path);
    };

    return (
        <div className="homePage" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <h1>Bem-vindo ao Nosso Portal de Comer e Viajar</h1>
            <div className="buttons-container">
                <button 
                    onClick={() => navigateTo('/comer')} 
                    className="button button-comer">
                    Comer
                </button>
                <button 
                    onClick={() => navigateTo('/viajar')} 
                    className="button button-viajar">
                    Viajar
                </button>
            </div>
        </div>
    );
};

export default HomePage;
