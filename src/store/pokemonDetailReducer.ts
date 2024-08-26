import {
    FETCH_POKEMON_DETAILS_REQUEST,
    FETCH_POKEMON_DETAILS_SUCCESS,
    FETCH_POKEMON_DETAILS_FAILURE,
    PokemonActionTypes // Використовуємо цей тип замість PokemonDetailsActionTypes
} from './actions';
import { PokemonDetails } from './types';

interface PokemonDetailState {
    pokemon: PokemonDetails | null;
    loading: boolean;
    error: string | null;
}

const initialPokemonDetailState: PokemonDetailState = {
    pokemon: null,
    loading: false,
    error: null,
};

const pokemonDetailReducer = (
    state = initialPokemonDetailState,
    action: PokemonActionTypes // Використовуємо правильний тип дій
): PokemonDetailState => {
    switch (action.type) {
        case FETCH_POKEMON_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_POKEMON_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                pokemon: action.payload,
            };
        case FETCH_POKEMON_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default pokemonDetailReducer;
