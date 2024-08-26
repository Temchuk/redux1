// src/components/Footer.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer>
            <p>&copy; 2024 Pokedex</p>
            <Link to="/pokemons">Всі покемони</Link>
        </footer>
    );
};

export default Footer;
