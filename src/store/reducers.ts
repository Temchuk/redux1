import { combineReducers } from 'redux';

// Імпорт ред'юсерів
import pokemonsReducer from './pokemonsReducer'; // Імпорт pokemonsReducer
import pokemonDetailReducer from './pokemonDetailReducer'; // Імпорт pokemonDetailReducer

// Створення rootReducer, який об'єднує всі ред'юсери
const rootReducer = combineReducers({
    pokemons: pokemonsReducer, // Додаємо pokemonsReducer
    pokemonDetail: pokemonDetailReducer, // Додаємо pokemonDetailReducer
});

export default rootReducer;

// Типізація стану для використання у useSelector
export type RootState = ReturnType<typeof rootReducer>;
