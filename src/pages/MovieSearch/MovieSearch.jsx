import { getMovieByName } from 'API/API';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import css from './MovieSearch.module.css';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  color: rgb(14, 222, 14);
  letter-spacing: 0.3em;

  text-decoration: none;
`;

const MovieSearch = () => {
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
    <div className={css.wrapper}>
      <input
        className={css.input}
        placeholder="Wpisz nazwę filmu..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown} // Call handleSearch when Enter key is pressed
      />
      <button onClick={handleSearch} className={css.button}>
        Szukaj
      </button>

      <div className={css.search_results}>
        {movies.map(movie => (
          <div key={movie.id} className={css.single_record}>
            <StyledLink to={`/movies/${movie.id}`}>{movie.title}</StyledLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
