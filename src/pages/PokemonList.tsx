import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchPokemons } from '../store/actions';
import { Pokemon } from '../store/types';
import { Link } from 'react-router-dom';

const PokemonList: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1); // Додаємо стан для поточної сторінки
    const dispatch: AppDispatch = useDispatch();

    const { pokemons, loading, error } = useSelector(
        (state: RootState) => state.pokemons
    );

    useEffect(() => {
        dispatch(fetchPokemons(currentPage)); // Викликаємо fetchPokemons з поточною сторінкою
    }, [dispatch, currentPage]);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Pokemons</h1>
            <div className="pokemon-grid">
                {pokemons.map((pokemon: Pokemon) => (
                    <Link key={pokemon.name} to={`/pokemon/${pokemon.name}`}>
                        <div className="pokemon-card">
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`}
                                alt={pokemon.name}
                            />
                            <p>{pokemon.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage}</span>
                <button onClick={handleNextPage}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default PokemonList;
