import { combineReducers } from 'redux';


import pokemonsReducer from './pokemonsReducer';
import pokemonDetailReducer from './pokemonDetailReducer';

//  rootReducer, який об'єднує всі ред'юсери
const rootReducer = combineReducers({
    pokemons: pokemonsReducer,
    pokemonDetail: pokemonDetailReducer,
});

export default rootReducer;

// типізація стану для використання у useSelector
export type RootState = ReturnType<typeof rootReducer>;
