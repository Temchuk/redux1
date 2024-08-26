// src/components/Header.tsx

import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Header: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState<'name' | 'type' | 'ability'>('name');
    const history = useHistory();

    const handleSearch = () => {
        if (searchTerm.trim()) {
            history.push(`/search?term=${searchTerm}&type=${searchType}`);
        }
    };

    return (
        <header>
            <nav>
                <Link to="/pokemons">Покемони</Link>
                <Link to="/my-collection">Моя колекція</Link>
            </nav>
            <div className="search-bar">
                <select value={searchType} onChange={(e) => setSearchType(e.target.value as 'name' | 'type' | 'ability')}>
                    <option value="name">Назва</option>
                    <option value="type">Тип</option>
                    <option value="ability">Здатність</option>
                </select>
                <input
                    type="text"
                    placeholder={`Пошук за ${searchType}`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Пошук</button>
            </div>
        </header>
    );
};

export default Header;
