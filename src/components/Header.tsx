
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState<'name' | 'type' | 'ability'>('name');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/search?term=${searchTerm}&type=${searchType}`);
        }
    };

    return (
        <header className="header">
            <nav>
                <Link className="link" to="/pokemons">Pokemons</Link>
                <Link className="link" to="/my-collection">My Collection</Link>
            </nav>
            <div >
                <select value={searchType} onChange={(e) => setSearchType(e.target.value as 'name' | 'type' | 'ability')}>
                    <option value="name">Name</option>
                    <option value="type">Type</option>
                    <option value="ability">Ability</option>
                </select>
                <input
                    type="text"
                    placeholder={`Search by ${searchType}`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    style={{
                        backgroundColor: '#0070f3',
                        color: 'white',
                        height: '25px',
                        width: '60px',
                        borderRadius: '5px',
                        marginLeft: '5px',
                    }}
                    onClick={handleSearch}>Search</button>
            </div>
        </header>
    );
};

export default Header;
