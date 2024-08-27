// src/pages/MyCollection.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PokemonDetails } from '../store/types';

const MyCollection: React.FC = () => {
    const [collection, setCollection] = useState<PokemonDetails[]>([]);

    useEffect(() => {
        const storedCollection = localStorage.getItem('myPokemonCollection');
        if (storedCollection) {
            setCollection(JSON.parse(storedCollection));
        }
    }, []);

    return (
        <div>
            <h1>My Pokemon Collection</h1>
            {collection.length > 0 ? (
                <div className="pokemon-grid">
                    {collection.map((pokemon) => (
                        <div key={pokemon.name} className="pokemon-card">
                            <Link to={`/pokemon/${pokemon.name}`}>
                                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                                <p>{pokemon.name}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Your collection is empty.</p>
            )}
        </div>
    );
};

export default MyCollection;
