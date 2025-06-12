import React, { useState } from 'react'
import './App.css'
import MovieList from './MovieList.jsx'
import SearchBar from './SearchBar.jsx'

const App = () => {
  const [searchResults, setSearchResults] = useState(null);

  // handles toggle between now playing and search results
  const [view, setView] = useState('nowPlaying')
  const handleViewChange = (viewType) => {
    setView(viewType);
2    //clears search results when now playing
    if (viewType === 'nowPlaying') {
      setSearchResults(null);
    }
  }

  return (
    <div className="App">
      <div className="toggle-buttons">
      <button className ={view == 'nowPlaying' ? 'nowPlaying': 'not-active'} onClick={() => handleViewChange('nowPlaying')}>Now Playing</button>
      <button className ={view == 'search' ? 'search': 'not-active'} onClick={() => handleViewChange('search')}>Search</button>
      </div>

      {view == 'search' && <SearchBar setResults={setSearchResults}/>}
      <MovieList movies={view == 'search' ? searchResults : null}/>
    </div>
  )
}

export default App
