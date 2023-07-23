import { Link, Outlet, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getGenres } from './API/Api.js';

export const MovieDetails = ({ moviesData }) => {
  //pobieramy id filmu z linku URL
  const { movieId } = useParams();
  //pośród moviesData szukamy danych filmu o id takim jak w URL
  const movie = moviesData.find(movie => movie.id === parseInt(movieId));
  //jeśłi nie pasuje żaden zwórć odpowiednią informacje

  useEffect(() => {
    if (movie) {
      const genreIds = movie.genres.map(genre => genre.id);

      const fetchGenres = async () => {
        await getGenres(genreIds);
      };

      fetchGenres();
    }
  }, [movie]);

  if (!movie) {
    return <div>Movie not found! </div>;
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
      <h4>Genres</h4>
      <ul>
        {movie.genres.map(genre => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>

      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="review">Review</Link>
        </li>
      </ul>
      <Outlet />
    </main>
  );
};
