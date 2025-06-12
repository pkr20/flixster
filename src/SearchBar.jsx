import { useState } from "react";

const apiKey = import.meta.env.VITE_API_KEY;

export default function SearchBar({setResults}) {
  const [searchInput, setSearchInput] = useState("");

  async function handleSearch(query) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${apiKey}&language=en-US`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      // only set results in the parent component
      setResults(data.results);
    } catch (error) {
      console.error("Failed to fetch search results:", error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("form submission")

    if (searchInput.trim() !== "") {
        handleSearch(searchInput);
    }
  }

  function inputChange(e) {
    setSearchInput(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit} className='search-form'>
      <input type="text" value={searchInput} onChange={inputChange} placeholder="Search for Movies..."/>
      <button className='search-button' type='submit'>Search</button>
    </form>
  )
}
///only search returns data to clear movie list
