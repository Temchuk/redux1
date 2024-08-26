// src/pages/SearchResults.tsx

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Pokemon } from '../store/types';

const SearchResults: React.FC = () => {
    const [results, setResults] = useState<Pokemon[]>([]);
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const term = query.get('term') || '';
        const type = query.get('type') || 'name';

        const fetchResults = async () => {
            try {
                let response;
                if (type === 'name') {
                    response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${term}`);
                    setResults([response.data]);
                } else if (type === 'type') {
                    response = await axios.get(`https://pokeapi.co/api/v2/type/${term}`);
                    setResults(response.data.pokemon.map((p: any) => p.pokemon));
                } else if (type === 'ability') {
                    response = await axios.get(`https://pokeapi.co/api/v2/ability/${term}`);
                    setResults(response.data.pokemon.map((p: any) => p.pokemon));
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchResults();
    }, [location.search]);

    return (
        <div>
            <h1>Результати пошуку</h1>
            <div className="pokemon-grid">
                {results.map((pokemon: Pokemon) => (
                    <div key={pokemon.name} className="pokemon-card">
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`} alt={pokemon.name} />
                        <p>{pokemon.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
