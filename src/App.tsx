

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PokemonList from './pages/PokemonList';
import PokemonDetail from './pages/PokemonDetail';
import MyCollection from './pages/MyCollection';
import SearchResults from './pages/SearchResults';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<PokemonList />} />
                    <Route path="/pokemons" element={<PokemonList />} />
                    <Route path="/pokemon/:id" element={<PokemonDetail />} />
                    <Route path="/my-collection" element={<MyCollection />} />
                    <Route path="/search" element={<SearchResults />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
