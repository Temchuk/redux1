import {
    FETCH_POKEMONS_REQUEST,
    FETCH_POKEMONS_SUCCESS,
    FETCH_POKEMONS_FAILURE,
    PokemonActionTypes
} from './actions';
import { Pokemon } from './types';

interface PokemonState {
    pokemons: Pokemon[];
    loading: boolean;
    error: string | null;
}

const initialPokemonState: PokemonState = {
    pokemons: [],
    loading: false,
    error: null,
};

const pokemonsReducer = (state = initialPokemonState, action: PokemonActionTypes): PokemonState => {
    switch (action.type) {
        case FETCH_POKEMONS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_POKEMONS_SUCCESS:
            return {
                ...state,
                loading: false,
                pokemons: action.payload.results,
            };
        case FETCH_POKEMONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default pokemonsReducer;
