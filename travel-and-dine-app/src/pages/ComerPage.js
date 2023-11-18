import React, { useState, useEffect } from 'react';
import { getFiltros, getRestaurants } from '../services/apiService';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import Header from './components/Header';
import Footer from './components/Footer';
import WelcomeSection from './components/WelcomeSection';
import FeaturesSection from './components/FeaturesSection';
import './ComerPage.css';
const config = require('../var');

const ComerPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filter, setFilter] = useState({});
  const [opcoesFiltro, setOpcoesFiltro] = useState({
    culinaria: [],
    precos: [],
    tema: [],
    avaliacao: [],
    cartao: [],
    dias: [],
    horario: [],
    // ... outros campos se necessário ...
  });
  
  const [visibleSelects, setVisibleSelects] = useState({
    culinaria: false,
    tema: false,
    cartao: false,
    dias: false,
    horario: false,
    precos: false,
    avaliacao: false,
  });

  // Atualiza a visibilidade dos filtros
  const toggleSelectVisibility = (name) => {
    setVisibleSelects(prevState => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  // Verifica se o filtro tem opções selecionadas
  const hasSelection = (name) => {
    // Implemente a lógica para verificar se o filtro tem seleções
      return false;
      // return selectedOptions[name].length > 0;
  };

  const renderSelectWithImage = (name, handleChange) => (
    <div className="select-with-image">
      <img
        src={`${config.backURL}/image/${name}.png`}
        alt={name}
        onClick={() => toggleSelectVisibility(name)}
      />
      {(visibleSelects[name] || hasSelection(name)) && (
        <Select
          isMulti={name !== 'precos' && name !== 'avaliacao'}
          name={name}
          options={opcoesFiltro[name]}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleChange}
        />
      )}
    </div>
  );

  const [currentPage, setCurrentPage] = useState(0);
  const restaurantsPerPage = 30; // Número de restaurantes por página

  useEffect(() => {
    getFiltros().then(data => setOpcoesFiltro({
      culinaria: data.culinaria.map(option => ({ value: option, label: option })),
      precos: data.precos.map(option => ({ value: option, label: `${option}` })),
      avaliacao: data.avaliacao.map(option => ({ value: option, label: `${option}` })),
      tema: data.tema.map(option => ({ value: option, label: option })),
      cartao: data.cartao.map(option => ({ value: option, label: option })),
      dias: data.dias.map(option => ({ value: option, label: option })),
      horario: data.horario.map(option => ({ value: option, label: option }))
    }));
  }, []);
  
  useEffect(() => {
    setCurrentPage(0);
    getRestaurants(filter).then(data => setRestaurants(data));
  }, [filter]);
  
    // Funções adicionais para navegação completa
    const goToFirstPage = () => setCurrentPage(0);
    const goToLastPage = () => setCurrentPage(totalPages - 1);

   const handleFilterChange = (selectedOption, { name }) => {
    // Para multiselect, selectedOption é um array. Para select simples, é um objeto.
    if (Array.isArray(selectedOption)) {
      setFilter({
        ...filter,
        [name]: selectedOption.length > 0 ? selectedOption.map(option => option.value) : undefined
      });
    } else {
      // Para selects simples
      setFilter({
        ...filter,
        [name]: selectedOption ? selectedOption.value : undefined
      });
    }
  };
  const handleFilterChange2 = (selectedOption, { name }) => {
    setFilter({
      ...filter,
      [name]: selectedOption ? selectedOption.value : undefined
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // A função getRestaurants é chamada novamente devido à mudança de estado do filtro
  };

    // Dividindo a lista de restaurantes em páginas
    const indexOfLastRestaurant = (currentPage + 1) * restaurantsPerPage;
    const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
    const currentRestaurants = restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);
  
    const totalPages = Math.ceil(restaurants.length / restaurantsPerPage);
  
    // Funções para mudar a página
    const goToNextPage = () => setCurrentPage(currentPage => currentPage + 1);
    const goToPreviousPage = () => setCurrentPage(currentPage => Math.max(0, currentPage - 1));
  

  return (
    <div>
      <div className="menu-superior">
      <Header />
          <div className="menu-content">
              <form onSubmit={handleSubmit}>
                <div className="form-container">
                  {renderSelectWithImage('culinaria', handleFilterChange)}
                  {renderSelectWithImage('tema', handleFilterChange)}
                  {renderSelectWithImage('cartao', handleFilterChange)}
                  {renderSelectWithImage('dias', handleFilterChange)}
                  {renderSelectWithImage('horario', handleFilterChange)}
                  {renderSelectWithImage('precos', handleFilterChange2)}
                  {renderSelectWithImage('avaliacao', handleFilterChange2)}
                </div>
              </form>
          </div>
      </div>
        {currentRestaurants.map(restaurant => (
        <Link to={`/DetalhesRestaurante/${restaurant.item._id}`} key={restaurant.item._id} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ display: 'flex', alignItems: 'center', margin: '20px', padding: '10px', border: '1px solid #ccc' }}>
            <img 
              src={restaurant.item.caminhoFoto && restaurant.item.caminhoFoto.length > 0 ? `${config.backURL}/image/${restaurant.item.caminhoFoto[0]}` : `${config.backURL}/image/${config.imgpadrao}`}
              alt={restaurant.item.nome} 
              style={{ width: '100px', height: '100px', marginRight: '20px' }}
            />
            <div>
              <h3>{restaurant.item.nome}</h3>
              <div>Culinária: {restaurant.item.culinaria.map(c => <span key={c} style={{ padding: '5px', margin: '5px', border: '1px solid gray', borderRadius: '5px', display: 'inline-block' }}>{c}</span>)}</div>
              <div>Dias: {restaurant.item.dias.map(dia => <span key={dia} style={{ padding: '5px', margin: '5px', border: '1px solid gray', borderRadius: '5px', display: 'inline-block' }}>{dia}</span>)}</div>
              <div>Horário: {restaurant.item.horario.map(h => <span key={h} style={{ padding: '5px', margin: '5px', border: '1px solid gray', borderRadius: '5px', display: 'inline-block' }}>{h}</span>)}</div>
              <p>Faixa de Preço: {restaurant.item.precos}</p>
              <p>Avaliação: {restaurant.item.avaliacao}</p>
            </div>
          </div>
        </Link>
      ))}
      <div className="pagination-container">
        <button onClick={goToFirstPage} disabled={currentPage === 0}>Primeira</button>
        <button onClick={goToPreviousPage} disabled={currentPage === 0}>Anterior</button>
        <span>Página {currentPage + 1} de {totalPages}</span>
        <button onClick={goToNextPage} disabled={currentPage >= totalPages - 1}>Próxima</button>
        <button onClick={goToLastPage} disabled={currentPage >= totalPages - 1}>Última</button>
      </div>
      <Footer />
      </div>
  );
};

export default ComerPage;
