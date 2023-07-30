import { getMovieByName } from 'API/API';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    try {
      const result = await getMovieByName(searchTerm);
      setMovies(result.results);
    } catch (error) {
      console.error('Error searching for movies:', error);
    }
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <input
        placeholder="Wpisz nazwę filmu..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown} // Call handleSearch when Enter key is pressed
      />
      <button onClick={handleSearch}>Szukaj</button>

      <div>
        {movies.map(movie => (
          <div key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};
