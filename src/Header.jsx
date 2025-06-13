import React from 'react';
import { useState } from 'react';
import './Header.css';
import SearchBar from './SearchBar';
import MovieList from './MovieList';

const Header = ({ view, onViewChange }) => {
    return (
        <header className="header">
            <div className="header-content">
                <div>
                    <img className="logo" src="./assets/flixster.png" alt="Flixster Logo" />
                    <h1>Flixster</h1>
                </div>
                <nav className="header-nav">
                    <button 
                        className={view === 'nowPlaying' ? 'active' : ''} 
                        onClick={() => onViewChange('nowPlaying')}
                    >
                        Now Playing
                    </button>
                    <button 
                        className={view === 'search' ? 'active' : ''} 
                        onClick={() => onViewChange('search')}
                    >
                        Search
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;