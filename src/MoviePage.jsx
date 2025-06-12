import { useState } from "react";
import SearchBar from "./SearchBar";
import MovieList from "./MovieList";

export default function MoviePage({movie}) {
    //const [searchText, setSearchText] = useState("");
    return(
        <div>
            <SearchBar setResults={setSearchResults} />
            <MovieList movies={searchResults} />
        </div>
    )

}
