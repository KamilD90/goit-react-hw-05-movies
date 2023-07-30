import React from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieDetails } from 'API/API';
// import { Cast } from './pages';

export const MovieDetails = () => {
  const { movieId } = useParams();
  console.log(movieId);
  const [movie, setMovie] = useState({});

  const fetchMovieDetails = async () => {
    try {
      const movieData = await getMovieDetails(movieId);
      // Sprawdzamy, czy movieData.results jest poprawne, zanim je ustawić jako movie
      if (movieData) {
        setMovie(movieData);
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
    <main>
      <Link to="/">Go back</Link>

      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
      <h2>
        {movie.title}({movie.release_date})
      </h2>
      <p>User score: {movie.popularity}%</p>
      <h3>Overview</h3>
      <p>{movie.overview}</p>
      <h4>Genres:</h4>
      <p>
        {Array.isArray(movie.genres) &&
          movie.genres.map(genre => genre.name).join(', ')}
      </p>

      <ul>
        <li>
          <Link to={`/movies/${movieId}/cast`}>Cast</Link>
        </li>
        <li>
          <Link to={`/movies/${movieId}/reviews`}>Review</Link>
        </li>
      </ul>
      <Outlet />
    </main>
  );
};
