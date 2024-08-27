// // // src/pages/PokemonDetail.tsx
// //
// // import React, { useEffect } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { useParams } from 'react-router-dom';
// // import { AppDispatch, RootState } from '../store/store';
// // import { fetchPokemonDetails } from '../store/actions';
// // import { PokemonDetails } from '../store/types';
// //
// // const PokemonDetail: React.FC = () => {
// //     const { id } = useParams<{ id: string }>();
// //     const dispatch: AppDispatch = useDispatch();
// //     const { pokemon, loading, error } = useSelector(
// //         (state: RootState) => state.pokemonDetail
// //     );
// //
// //     useEffect(() => {
// //         if (id) {
// //             dispatch(fetchPokemonDetails(id));
// //         }
// //     }, [dispatch, id]);
// //
// //     const addToCollection = () => {
// //         const existingCollection = localStorage.getItem('myPokemonCollection');
// //         let collection = existingCollection ? JSON.parse(existingCollection) : [];
// //
// //         if (!collection.some((p: PokemonDetails) => p.name === pokemon?.name)) {
// //             collection.push(pokemon);
// //             localStorage.setItem('myPokemonCollection', JSON.stringify(collection));
// //             alert(`${pokemon?.name} додано до вашої колекції!`);
// //         } else {
// //             alert(`${pokemon?.name} вже є у вашій колекції.`);
// //         }
// //     };
// //
// //     if (loading) return <div>Loading...</div>;
// //     if (error) return <div>Error: {error}</div>;
// //
// //     return (
// //         <div>
// //             <h1>{pokemon?.name}</h1>
// //             <div className="pokemon-images">
// //                 <img src={pokemon?.sprites.front_default} alt={`${pokemon?.name} front_default`}/>
// //                 {pokemon?.sprites.front_shiny && (
// //                     <img src={pokemon.sprites.front_shiny} alt={`${pokemon?.name} front_shiny`}/>
// //                 )}
// //                 {pokemon?.sprites.front_female && (
// //                     <img src={pokemon.sprites.front_female} alt={`${pokemon?.name} front_female`}/>
// //                 )}
// //                 {pokemon?.sprites.front_shiny_female && (
// //                     <img src={pokemon.sprites.front_shiny_female} alt={`${pokemon?.name} front_shiny_female`}/>
// //                 )}
// //                 {pokemon?.sprites.back_default && (
// //                     <img src={pokemon.sprites.back_default} alt={`${pokemon?.name} back_default`}/>
// //                 )}
// //                 {pokemon?.sprites.back_shiny && (
// //                     <img src={pokemon.sprites.back_shiny} alt={`${pokemon?.name} back_shiny`}/>
// //                 )}
// //                 {pokemon?.sprites.back_female && (
// //                     <img src={pokemon.sprites.back_female} alt={`${pokemon?.name} back_female`}/>
// //                 )}
// //                 {pokemon?.sprites.back_shiny_female && (
// //                     <img src={pokemon.sprites.back_shiny_female} alt={`${pokemon?.name} back_shiny_female`}/>
// //                 )}
// //             </div>
// //
// //             <button onClick={addToCollection}>Додати до моєї колекції</button>
// //
// //             <h2>Forms</h2>
// //             <ul>
// //                 {evolutionData.map((evolution) => (
// //                     <li key={evolution.name}>
// //                         <Link to={`/pokemon/${evolution.name}`}>
// //                             <img src={evolution.sprites.front_default} alt={evolution.name}/>
// //                         </Link>
// //                     </li>
// //                 ))}
// //             </ul>
// //
// //             <h2>Abilities</h2>
// //             <ul>
// //                 {pokemon?.abilities.map((ability) => (
// //                     <li key={ability.ability.name}>{ability.ability.name}</li>
// //                 ))}
// //             </ul>
// //
// //             <h2>Stats</h2>
// //             <ul>
// //                 {pokemon?.stats.map((stat) => (
// //                     <li key={stat.stat.name}>
// //                         {stat.stat.name}: {stat.base_stat}
// //                     </li>
// //                 ))}
// //             </ul>
// //         </div>
// //     );
// // };
// //
// // export default PokemonDetail;
//
//
//
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams, Link } from 'react-router-dom';
// import { AppDispatch, RootState } from '../store/store';
// import { fetchPokemonDetails } from '../store/actions';
// import { PokemonDetails } from '../store/types';
//
// interface Species {
//     name: string;
//     url: string;
// }
//
// interface EvolutionChainLink {
//     species: Species;
//     evolves_to: EvolutionChainLink[];
// }
//
// interface EvolutionChain {
//     chain: EvolutionChainLink;
// }
//
// const PokemonDetail: React.FC = () => {
//     const { id } = useParams<{ id: string }>();
//     const dispatch: AppDispatch = useDispatch();
//
//     const { pokemon, loading, error } = useSelector(
//         (state: RootState) => state.pokemonDetail
//     );
//
//     const [evolutionData, setEvolutionData] = useState<PokemonDetails[]>([]);
//
//     useEffect(() => {
//         if (id) {
//             dispatch(fetchPokemonDetails(id)); // Викликаємо функцію для отримання даних про покемона
//         }
//     }, [dispatch, id]);
//
//     useEffect(() => {
//         if (pokemon?.species?.url) {
//             fetchEvolutionChain(pokemon.species.url);
//         }
//     }, [pokemon]);
//
//     const fetchEvolutionChain = async (speciesUrl: string) => {
//         try {
//             const speciesResponse = await fetch(speciesUrl);
//             const speciesData = await speciesResponse.json();
//
//             const evolutionChainResponse = await fetch(speciesData.evolution_chain.url);
//             const evolutionChainData: EvolutionChain = await evolutionChainResponse.json();
//
//             const fetchEvolutions = async (chain: EvolutionChainLink) => {
//                 const result: PokemonDetails[] = [];
//                 let currentChain = chain;
//
//                 while (currentChain) {
//                     const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentChain.species.name}`);
//                     const pokemonData: PokemonDetails = await pokemonResponse.json();
//                     result.push(pokemonData);
//
//                     if (currentChain.evolves_to.length > 0) {
//                         currentChain = currentChain.evolves_to[0];
//                     } else {
//                         break;
//                     }
//                 }
//
//                 setEvolutionData(result);
//             };
//
//             fetchEvolutions(evolutionChainData.chain);
//         } catch (error) {
//             console.error('Failed to fetch the evolution chain:', error);
//         }
//     };
//
//
//         const addToCollection = () => {
//         const existingCollection = localStorage.getItem('myPokemonCollection');
//         let collection = existingCollection ? JSON.parse(existingCollection) : [];
//
//         if (!collection.some((p: PokemonDetails) => p.name === pokemon?.name)) {
//             collection.push(pokemon);
//             localStorage.setItem('myPokemonCollection', JSON.stringify(collection));
//             alert(`${pokemon?.name} додано до вашої колекції!`);
//         } else {
//             alert(`${pokemon?.name} вже є у вашій колекції.`);
//         }
//     };
//
//
//
//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;
//
//     return (
//         <div>
//
//
//             {/*<div>*/}
//             <h1>{pokemon?.name}</h1>
//             <div className="pokemon-images">
//                     <img src={pokemon?.sprites.front_default} alt={`${pokemon?.name} front_default`}/>
//                 {pokemon?.sprites.back_default && (
//                     <img src={pokemon.sprites.back_default} alt={`${pokemon?.name} back_default`}/>
//                 )}
//                 {pokemon?.sprites.front_shiny && (
//                     <img src={pokemon.sprites.front_shiny} alt={`${pokemon?.name} front_shiny`}/>
//                 )}
//                 {pokemon?.sprites.back_shiny && (
//                     <img src={pokemon.sprites.back_shiny} alt={`${pokemon?.name} back_shiny`}/>
//                 )}
//
//             </div>
//
//             <button onClick={addToCollection}>Додати до моєї колекції</button>
//
//             <h2>Forms</h2>
//             <ul>
//                 {evolutionData.map((evolution) => (
//                     <li key={evolution.name}>
//                         <Link to={`/pokemon/${evolution.name}`}>
//                             <img src={evolution.sprites.front_default} alt={evolution.name}/>
//                         </Link>
//                     </li>
//                 ))}
//             </ul>
//
//             <h2>Abilities</h2>
//             <ul>
//                 {pokemon?.abilities.map((ability) => (
//                     <li key={ability.ability.name}>{ability.ability.name}</li>
//                 ))}
//             </ul>
//
//             <h2>Stats</h2>
//             <ul>
//                 {pokemon?.stats.map((stat) => (
//                     <li key={stat.stat.name}>
//                         {stat.stat.name}: {stat.base_stat}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };
//
// export default PokemonDetail;



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';
import { fetchPokemonDetails } from '../store/actions';
import { PokemonDetails } from '../store/types';
import './PokemonDetail.css';  // Імпорт CSS стилів

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

    const addToCollection = () => {
        const existingCollection = localStorage.getItem('myPokemonCollection');
        let collection = existingCollection ? JSON.parse(existingCollection) : [];

        if (!collection.some((p: PokemonDetails) => p.name === pokemon?.name)) {
            collection.push(pokemon);
            localStorage.setItem('myPokemonCollection', JSON.stringify(collection));
            alert(`${pokemon?.name} додано до вашої колекції!`);
        } else {
            alert(`${pokemon?.name} вже є у вашій колекції.`);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="pokemon-detail">
            <h1 className="pokemon-name">{pokemon?.name}</h1>
            <div className="pokemon-images">
                <img src={pokemon?.sprites.front_default} alt={`${pokemon?.name} front_default`} />
                {pokemon?.sprites.back_default && (
                    <img src={pokemon.sprites.back_default} alt={`${pokemon?.name} back_default`} />
                )}
                {pokemon?.sprites.front_shiny && (
                    <img src={pokemon.sprites.front_shiny} alt={`${pokemon?.name} front_shiny`} />
                )}
                {pokemon?.sprites.back_shiny && (
                    <img src={pokemon.sprites.back_shiny} alt={`${pokemon?.name} back_shiny`} />
                )}
            </div>

            <button onClick={addToCollection} className="collection-button">Додати до моєї колекції</button>

            <h2>Evolution Chain</h2>
            <div className="pokemon-grid-evol">
                {evolutionData.map((evolution) => (
                    <Link key={evolution.name} to={`/pokemon/${evolution.name}`}>
                        <div className="pokemon-card">
                            <img src={evolution.sprites.front_default} alt={evolution.name} />
                            <p>{evolution.name}</p>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="abilities-stats">
                <div>
                    <h2>Abilities</h2>
                    <ul>
                        {pokemon?.abilities.map((ability) => (
                            <li key={ability.ability.name}>{ability.ability.name}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2>Stats</h2>
                    <ul>
                        {pokemon?.stats.map((stat) => (
                            <li key={stat.stat.name}>
                                {stat.stat.name}: {stat.base_stat}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PokemonDetail;
