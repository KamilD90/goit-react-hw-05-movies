import React from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieDetails, getMovieCredits, getMovieReviews } from 'API/API';
// import { Cast } from './pages';

export const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState(null);
  const [reviews, setReviews] = useState(null);

  const fetchMovieDetails = async () => {
    try {
      const movieData = await getMovieDetails(movieId);
      setMovie(movieData);
      console.log(movieData);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const fetchMovieCredits = async () => {
    try {
      const movieCastData = await getMovieCredits(movieId);
      setCast(movieCastData.cast);
      console.log(movieCastData);
    } catch (error) {
      console.error('An error occured while fetching the data', error);
    }
  };

  const fetchMovieReviews = async () => {
    try {
      const movieReviewData = await getMovieReviews(movieId);
      setReviews(movieReviewData);
      console.log(movieReviewData);
    } catch (error) {
      console.error(
        'wystąpil błąd podczas pobierania danych o recenzjach',
        error
      );
      throw error;
    }
  };
  // const apiKey = 'd416a06f75f7c918219a6b8fa9f2713c';

  useEffect(() => {
    fetchMovieDetails();
    fetchMovieCredits();
    fetchMovieReviews();
  }, []);

  if (!movie) {
    return <div>Movie not found!</div>;
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
