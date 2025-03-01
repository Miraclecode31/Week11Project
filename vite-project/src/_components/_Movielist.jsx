import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
<<<<<<< HEAD

const apiKey = "fd3311ecfd2af752b2fea9aad18cbd0b";
const trendingUrl = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`;
const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

const _MovieList = () => {
  const [movies, setMovies] = useState([]); // Store fetched movies
  const [filteredMovies, setFilteredMovies] = useState([]); // Store filtered movies
  const [genres, setGenres] = useState([]); // Store movie genres
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [selectedGenre, setSelectedGenre] = useState(""); // Selected genre
  const [selectedYear, setSelectedYear] = useState(""); // Selected year

  // Fetch trending movies & genres on page load
  useEffect(() => {
    fetch(trendingUrl)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results || []);
        setFilteredMovies(data.results || []);
      })
      .catch((error) => console.error("Error fetching movies:", error));

    fetch(genreUrl)
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.genres || []);
      })
      .catch((error) => console.error("Error fetching genres:", error));
  }, []);

  // Fetch movies based on search, genre, or year
  const searchMovies = async () => {
    let searchUrl;

    if (searchQuery) {
      // If searching by title
      searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`;
      if (selectedYear) {
        searchUrl += `&primary_release_year=${selectedYear}`;
      }
    } else if (selectedGenre) {
      // If searching only by genre
      searchUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenre}`;
      if (selectedYear) {
        searchUrl += `&primary_release_year=${selectedYear}`;
      }
    } else {
      // If nothing is entered, fetch trending again
      searchUrl = trendingUrl;
    }

    try {
      const response = await fetch(searchUrl);
      const data = await response.json();
      setFilteredMovies(data.results || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
=======
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
>>>>>>> 5f9b58ae78de102e9f76668b13ae02716b83139d
    }
  }, [query]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
  };

  return (
<<<<<<< HEAD
    <div>
      <h2>Search Movies</h2>
      <div>
        <input
          type="text"
          placeholder="Search by title (optional)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select onChange={(e) => setSelectedGenre(e.target.value)}>
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Year (optional)"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        />
        <button onClick={searchMovies}>Search</button>
      </div>

      {filteredMovies.length === 0 ? (
        <p>No movies found</p>
      ) : (
        filteredMovies.map((movie) => (
          <div key={movie.id}>
            <h3>{movie.title}</h3>
            <p>Release Date: {movie.release_date || "N/A"}</p>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
            )}
          </div>
        ))
      )}
=======
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
>>>>>>> 5f9b58ae78de102e9f76668b13ae02716b83139d
    </div>
  );
};


export default _MovieList;
