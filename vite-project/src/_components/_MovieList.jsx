// _components/MovieList.jsx

import React, { useEffect, useState } from "react";
import SearchBar from './SearchBar'; 

const _MovieList = () => {
  const [movies, setMovies] = useState([]); // Store fetched movies
  const [filteredMovies, setFilteredMovies] = useState([]); // Store filtered movies

  // Fetch movies from OMDB API
  useEffect(() => {
    fetch("http://www.omdbapi.com/?apikey=fc85b922&s=Scar")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched movies:", data);
        setMovies(data.Search || []); // Ensure we set an array of movies
        setFilteredMovies(data.Search || []); // Set filteredMovies as well
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  // Handle search functionality
  const handleSearch = (query) => {
    if (!query) {
      setFilteredMovies(movies); // Show all movies if no search query
    } else {
      const filtered = movies.filter((movie) =>
        movie.Title.toLowerCase().includes(query.toLowerCase()) // Filter based on title
      );
      setFilteredMovies(filtered);
    }
  };

  return (
    <div>
      <h2>Movie List</h2>
      <SearchBar onSearch={handleSearch} /> {/* Pass the handleSearch function to the SearchBar */}
      
      {filteredMovies.length === 0 ? (
        <p>No movies found</p> // Display message if no movies match the search
      ) : (
        filteredMovies.map((movie) => (
          <div key={movie.imdbID}> {/* Use imdbID as the unique key */}
            <h3>{movie.Title}</h3> {/* Display movie title */}
          </div>
        ))
      )}
    </div>
  );
};

export default _MovieList;
