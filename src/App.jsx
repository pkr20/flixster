import React, { useState } from 'react'
import './App.css'
import MovieList from './MovieList.jsx'
import SearchBar from './SearchBar.jsx'

const App = () => {
  const [searchResults, setSearchResults] = useState(null);
  const [view, setView] = useState('nowPlaying')

  const handleViewChange = (viewType) => {
    setView(viewType);
    if (viewType === 'nowPlaying') {
      setSearchResults('nowPlaying');
    }
  }

  return (
    <div className="App">
      <SearchBar setResults={setSearchResults}/>
      <MovieList movies={searchResults}/>
    </div>
  )
}

export default App
