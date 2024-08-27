

import axios from 'axios';
import { Dispatch } from 'redux';
import { Pokemon, PokemonDetails } from './types';

// Типи дій для отримання списку покемонів
export const FETCH_POKEMONS_REQUEST = 'FETCH_POKEMONS_REQUEST';
export const FETCH_POKEMONS_SUCCESS = 'FETCH_POKEMONS_SUCCESS';
export const FETCH_POKEMONS_FAILURE = 'FETCH_POKEMONS_FAILURE';

// Типи дій для отримання деталей конкретного покемона
export const FETCH_POKEMON_DETAILS_REQUEST = 'FETCH_POKEMON_DETAILS_REQUEST';
export const FETCH_POKEMON_DETAILS_SUCCESS = 'FETCH_POKEMON_DETAILS_SUCCESS';
export const FETCH_POKEMON_DETAILS_FAILURE = 'FETCH_POKEMON_DETAILS_FAILURE';

// Інтерфейси для дій, пов'язаних зі списком покемонів
interface FetchPokemonsRequest {
    type: typeof FETCH_POKEMONS_REQUEST;
}

interface FetchPokemonsSuccess {
    type: typeof FETCH_POKEMONS_SUCCESS;
    payload: { results: Pokemon[] };
}

interface FetchPokemonsFailure {
    type: typeof FETCH_POKEMONS_FAILURE;
    error: string;
}

// Інтерфейси для дій, пов'язаних з деталями покемона
interface FetchPokemonDetailsRequest {
    type: typeof FETCH_POKEMON_DETAILS_REQUEST;
}

interface FetchPokemonDetailsSuccess {
    type: typeof FETCH_POKEMON_DETAILS_SUCCESS;
    payload: PokemonDetails;
}

interface FetchPokemonDetailsFailure {
    type: typeof FETCH_POKEMON_DETAILS_FAILURE;
    error: string;
}

// Об'єднання типів дій
export type PokemonActionTypes =
    | FetchPokemonsRequest
    | FetchPokemonsSuccess
    | FetchPokemonsFailure
    | FetchPokemonDetailsRequest
    | FetchPokemonDetailsSuccess
    | FetchPokemonDetailsFailure;

// Функція для отримання списку покемонів
export const fetchPokemons = (page: number) => {
    return async (dispatch: Dispatch<PokemonActionTypes>) => {
        dispatch({ type: FETCH_POKEMONS_REQUEST });

        try {
            const offset = (page - 1) * 20; // Кількість покемонів на сторінці
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);

            dispatch({ type: FETCH_POKEMONS_SUCCESS, payload: { results: response.data.results } });
        } catch (error: any) {
            dispatch({ type: FETCH_POKEMONS_FAILURE, error: error.message });
        }
    };
};

// Функція для отримання деталей конкретного покемона
export const fetchPokemonDetails = (id: string) => {
    return async (dispatch: Dispatch<PokemonActionTypes>) => {
        dispatch({ type: FETCH_POKEMON_DETAILS_REQUEST });

        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            dispatch({ type: FETCH_POKEMON_DETAILS_SUCCESS, payload: response.data });
        } catch (error: any) {
            dispatch({ type: FETCH_POKEMON_DETAILS_FAILURE, error: error.message });
        }
    };
};
