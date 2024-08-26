import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';
import { fetchPokemonDetails } from '../store/actions';
import { PokemonDetails } from '../store/types';

interface Species {
    name: string;
    url: string;
}

interface EvolutionChainLink {
    species: Species;
    evolves_to: EvolutionChainLink[];
}

interface EvolutionChain {
    chain: EvolutionChainLink;
}

const PokemonDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch: AppDispatch = useDispatch();

    const { pokemon, loading, error } = useSelector(
        (state: RootState) => state.pokemonDetail
    );

    const [evolutionData, setEvolutionData] = useState<PokemonDetails[]>([]);

    useEffect(() => {
        if (id) {
            dispatch(fetchPokemonDetails(id)); // Викликаємо функцію для отримання даних про покемона
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (pokemon?.species?.url) {
            fetchEvolutionChain(pokemon.species.url);
        }
    }, [pokemon]);

    const fetchEvolutionChain = async (speciesUrl: string) => {
        try {
            const speciesResponse = await fetch(speciesUrl);
            const speciesData = await speciesResponse.json();

            const evolutionChainResponse = await fetch(speciesData.evolution_chain.url);
            const evolutionChainData: EvolutionChain = await evolutionChainResponse.json();

            const fetchEvolutions = async (chain: EvolutionChainLink) => {
                const result: PokemonDetails[] = [];
                let currentChain = chain;

                while (currentChain) {
                    const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentChain.species.name}`);
                    const pokemonData: PokemonDetails = await pokemonResponse.json();
                    result.push(pokemonData);

                    if (currentChain.evolves_to.length > 0) {
                        currentChain = currentChain.evolves_to[0];
                    } else {
                        break;
                    }
                }

                setEvolutionData(result);
            };

            fetchEvolutions(evolutionChainData.chain);
        } catch (error) {
            console.error('Failed to fetch the evolution chain:', error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>{pokemon?.name}</h1>
            <img src={pokemon?.sprites.front_default} alt={pokemon?.name} />

            <h2>Forms</h2>
            <ul>
                {evolutionData.map((evolution) => (
                    <li key={evolution.name}>
                        <Link to={`/pokemon/${evolution.name}`}>
                            <img src={evolution.sprites.front_default} alt={evolution.name} />
                        </Link>
                    </li>
                ))}
            </ul>

            <h2>Abilities</h2>
            <ul>
                {pokemon?.abilities.map((ability) => (
                    <li key={ability.ability.name}>{ability.ability.name}</li>
                ))}
            </ul>

            <h2>Stats</h2>
            <ul>
                {pokemon?.stats.map((stat) => (
                    <li key={stat.stat.name}>
                        {stat.stat.name}: {stat.base_stat}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PokemonDetail;
