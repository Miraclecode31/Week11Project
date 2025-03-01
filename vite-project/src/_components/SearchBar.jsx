import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query); // Trigger search when user submits the form
  };

  return (
    <div style={{ 
      backgroundColor: 'rgba(255, 255, 255, 0.8)',  
      padding: '10px', 
      borderRadius: '5px',
      maxWidth: '400px', 
      margin: '20px auto', 
      textAlign: 'center' 
    }}>
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for movies..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
