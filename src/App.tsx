// src/App.tsx

import React from 'react';
import PokemonList from './pages/PokemonList';
import PokemonDetail from './pages/PokemonDetail';
import MyCollection from './pages/MyCollection';
import SearchResults from './pages/SearchResults';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <Router>
            <main>
                <Routes>
                    <Route path="/pokemons" element={<PokemonList />} />
                    <Route path="/pokemon/:id" element={<PokemonDetail />} />
                    <Route path="/my-collection" element={<MyCollection />} />
                    <Route path="/search" element={<SearchResults />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;  // Додайте цей рядок
