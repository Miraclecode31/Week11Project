import { useState, useEffect } from "react";
import "./App.css";
import MovieList from "./_components/_MovieList";

const API_URL = " http://www.omdbapi.com/?i=tt3896198&apikey=fc85b922"; // Replace with your real key

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Movie Database</h1>
      {loading ? <p>Loading...</p> : <MovieList movies={movies} />}
    </div>
  );
}

export default App;
