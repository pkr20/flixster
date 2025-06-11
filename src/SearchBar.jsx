import { useState } from "react";



export default function SearchBar({onChange}) {
  const [searchInput, setSearchInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("form submission")
    //search for movies
    if (onChange) {
        onChange(searchInput);
    }
  }

  function inputChange(e) {
    setSearchInput(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit} className='search-form'>
    <input type="text" value={searchInput} onChange={inputChange} placeholder="Search"/>
    <button className='search-button' type='submit'>Search</button>
    </form>
  )
}
