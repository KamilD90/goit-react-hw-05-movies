import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTrendingMovies, apiKey } from 'API/API';

export const Home = () => {
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    const currentPage = 1;

    const fetchTrendingMovies = async () => {
      try {
        const trendingMoviesData = await getTrendingMovies(apiKey, currentPage);
        console.log('Trending movies data:', trendingMoviesData.results);
        setMoviesData(trendingMoviesData.results); // Ustawiamy tylko tablicę z wynikami, nie cały obiekt
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <main>
      <h2>Trending today</h2>
      <ul>
        {moviesData.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.original_title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
