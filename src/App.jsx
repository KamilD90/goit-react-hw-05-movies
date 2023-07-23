import { Routes, Route, NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { TrendingMovies } from 'API/API';
import { Cast, Home, MovieDetails, MovieSearch, Reviews } from './pages';
const StyledLink = styled(NavLink)`
  color: black;

  &.active {
    color: orange;
  }
`;

// Dodaj asynchroniczne ładownie kodu JS dla tras aplikacji, wykorzystując React.lazy() i <Suspense>.

export const App = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiKey = 'd416a06f75f7c918219a6b8fa9f2713c';
    const currentPage = 1;

    const getTrendingMovies = async () => {
      try {
        const data = await TrendingMovies(apiKey, currentPage);
        setMoviesData(data.results);
        setIsLoading(false);
      } catch (error) {
        console.error('Błąd pobiarania danych z serwera:', error);
        setIsLoading(false);
      }
    };
    getTrendingMovies();
  }, []);

  if (isLoading) {
    return <div> Loading... </div>;
  }

  return (
    <div>
      <nav>
        <StyledLink to="/" end>
          Home
        </StyledLink>
        <StyledLink to="/movies">Movies</StyledLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home moviesData={moviesData} />} />
        <Route path="/movies" element={<MovieSearch />} />
        <Route
          path="/movies/:movieId"
          element={<MovieDetails moviesData={moviesData} />}
        />
        <Route path="cast" element={<Cast />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="*" element={<Home moviesData={moviesData} />} />
      </Routes>
    </div>
  );
};
