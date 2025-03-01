import React from 'react';
import './App.css';
import _MovieList from './components/_MovieList'; // Import the _MovieList component

function App() {
  return (
    <div className="App">
      <h1>Trending Movies</h1>
      <_MovieList /> {/* Render the _MovieList component */}
    </div>
  );
}

export default App;
