import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTrendingMovies, apiKey } from 'API/API';
import css from './Home.module.css';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  color: rgb(14, 222, 14);
  letter-spacing: 0.3em;

  text-decoration: none;
`;

const Home = () => {
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
    <main className={css.main}>
      <h2 className={css.title}>Trending today</h2>
      <ul className={css.list}>
        {moviesData.map(movie => (
          <li key={movie.id} className={css.list_item}>
            <StyledLink to={`/movies/${movie.id}`}>
              {movie.original_name || movie.original_title}
            </StyledLink>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
