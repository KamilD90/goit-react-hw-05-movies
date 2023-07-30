import React from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieDetails } from 'API/API';
import css from './MovieDetails.module.css';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  padding: 4px 15px;
  margin: 10px 20px;
  border-radius: 4px;
  background-color: #4a3b3b;
  color: rgb(14, 222, 14);
  text-decoration: none;
`;

const MovieDetails = () => {
  const { movieId } = useParams();
  console.log(movieId);
  const [movie, setMovie] = useState({});

  const fetchMovieDetails = async () => {
    try {
      const movieData = await getMovieDetails(movieId);
      // Sprawdzamy, czy movieData.results jest poprawne, zanim je ustawić jako movie
      if (movieData) {
        setMovie(movieData);
        console.log(movieData);
        //warto sprawdzić jakie dane zwraca API
      } else {
        // Obsługujemy przypadki, gdy nie można znaleźć szczegółów filmu
        console.error('Nie znaleziono szczegółów filmu!');
      }
    } catch (error) {
      console.error('Błąd podczas pobierania szczegółów filmu:', error);
      // Obsługujemy błąd i wyświetlamy przyjazny dla użytkownika komunikat
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  if (!movie) {
    return <div>Film nie znaleziony!</div>;
  }

  return (
    <main className={css.wrapper}>
      <StyledLink to="/">Go back</StyledLink>
      <div className={css.movie_box}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt=""
        />
        <div className={css.info}>
          <h2>
            {movie.title} ({movie.release_date})
          </h2>
          {movie.vote_average !== undefined && (
            <p>User score: {movie.vote_average.toFixed(1)}</p>
          )}
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h4>Genres:</h4>
          <p>
            {Array.isArray(movie.genres) &&
              movie.genres.map(genre => genre.name).join(', ')}
          </p>
        </div>
      </div>
      <p className={css.additional}>Additional information:</p>
      <ul className={css.list}>
        <li>
          <StyledLink to={`/movies/${movieId}/cast`}>Cast</StyledLink>
        </li>
        <li>
          <StyledLink to={`/movies/${movieId}/reviews`}>Review</StyledLink>
        </li>
      </ul>
      <Outlet />
    </main>
  );
};

export default MovieDetails;
