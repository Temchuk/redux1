import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { Pokemon } from '../store/types';

const SearchResults: React.FC = () => {
    const [results, setResults] = useState<Pokemon[]>([]);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const term = query.get('term') || '';
        const type = query.get('type') || 'name';

        const fetchResults = async () => {
            try {
                let response;
                if (type === 'name') {
                    response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${term.toLowerCase()}`);
                    // Використовуємо переданий URL для зображення і формуємо посилання
                    setResults([{
                        name: response.data.name,
                        url: `https://pokeapi.co/api/v2/pokemon/${response.data.id}/`
                    }]);
                    setError(null);
                } else if (type === 'type') {
                    response = await axios.get(`https://pokeapi.co/api/v2/type/${term.toLowerCase()}`);
                    setResults(response.data.pokemon.map((p: any) => p.pokemon));
                    setError(null);
                } else if (type === 'ability') {
                    response = await axios.get(`https://pokeapi.co/api/v2/ability/${term.toLowerCase()}`);
                    setResults(response.data.pokemon.map((p: any) => p.pokemon));
                    setError(null);
                }
            } catch (error) {
                setError('Could not find pokemon. Please check that the name is spelled correctly or try something else.');
                setResults([]);
                console.error('Error fetching search results:', error);
            }
        };

        fetchResults();
    }, [location.search]);

    return (
        <div>
            <h1>Search results</h1>
            {error && <p>{error}</p>}
            <div className="pokemon-grid">
                {results.map((pokemon: Pokemon) => (
                    <div key={pokemon.name} className="pokemon-card">
                        <Link to={`/pokemon/${pokemon.name}`}>
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`}
                                alt={pokemon.name}
                            />
                        </Link>
                        <p style={{color: '#20bcc6', textDecoration: 'none'}}>{pokemon.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
