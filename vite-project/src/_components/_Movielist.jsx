import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const _MovieList = () => {
const [setMovies] = useState([]); // ✅ Correct way to define the state
 const [filteredMovies, setFilteredMovies] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query) {
      fetch(`http://www.omdbapi.com/?apikey=fc85b922&s=${query}`)
        .then((response) => response.json())
        .then((data) => {
          setMovies(data.Search || []);
          setFilteredMovies(data.Search || []);
        })
        .catch((error) => console.error("Error fetching movies:", error));
    }
  }, [query]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
  };

  return (
    <div className="container app-container">
      <h2 className="mb-3">Movie Database</h2>
      <p>Enjoy browsing movies with a cloud backdrop.</p>

      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Movie List */}
      <div className="movie-list">
        {filteredMovies.length === 0 ? (
          <p>No movies found</p>
        ) : (
          filteredMovies.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <h3>{movie.Title}</h3>
              <img src={movie.Poster} alt={movie.Title} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};


export default _MovieList;
