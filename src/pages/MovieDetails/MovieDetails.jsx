import { Link, Outlet, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getGenres } from 'API/API';

export const MovieDetails = ({ moviesData }) => {
  const { movieId } = useParams();
  console.log('movieId:', movieId);

  const movie =
    movieId && moviesData.find(movie => movie.id === parseInt(movieId));
  console.log('movie:', movie);

  useEffect(() => {
    const fetchGenres = async () => {
      if (movie) {
        const genreIds = movie.genres.map(genre => genre.id);
        console.log('genreIds:', genreIds);

        try {
          const genres = await getGenres(genreIds);
          console.log('genres:', genres);
          // Tutaj możesz coś zrobić z wynikami, na przykład zaktualizować stan komponentu
        } catch (error) {
          console.error('Błąd pobierania nazw gatunków filmowych:', error);
          // Obsłuż ewentualne błędy
        }
      }
    };

    fetchGenres();
  }, [movie]);

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
