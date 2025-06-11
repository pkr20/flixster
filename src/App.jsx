import React from 'react'
import './App.css'
import MovieList from './MovieList.jsx'
import SearchBar from './SearchBar.jsx'

const App = () => {
  return (
    <div className="App">
      <SearchBar/>
      <MovieList/>

    </div>
  )
}

export default App
