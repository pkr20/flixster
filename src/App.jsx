import React, { useState } from 'react'
import './App.css'
import MovieList from './MovieList.jsx'
import SearchBar from './SearchBar.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

const App = () => {
  const [searchResults, setSearchResults] = useState(null);

  // handles toggle between now playing and search results
  const [view, setView] = useState('nowPlaying')
  const handleViewChange = (viewType) => {
    setView(viewType);
    //clears search results when now playing
    if (viewType === 'nowPlaying') {
      setSearchResults(null);
    }
  }

  return (
    <div className="App">
      <Header view={view} onViewChange={handleViewChange} />
      <main className="main-content">
        {view === 'search' && <SearchBar setResults={setSearchResults}/>}
        <MovieList movies={view === 'search' ? searchResults : null}/>
      </main>
      <Footer />
    </div>
  )
}

export default App
