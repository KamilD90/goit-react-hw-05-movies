import { Route, Routes, NavLink } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';
import css from './App.module.css';
const Home = lazy(() => import('../pages/Home'));
const MovieSearch = lazy(() => import('../pages/MovieSearch'));
const MovieDetails = lazy(() => import('../pages/MovieDetails'));
const Cast = lazy(() => import('./Cast'));
const Reviews = lazy(() => import('./Reviews'));

const StyledLink = styled(NavLink)`
  color: rgb(14, 222, 14);
  width: 100px;
  font-size: 16px;
  font-weight: 500;
  padding: 10px 20px;
  margin: 20px;
  background-color: #4a3b3b;
  text-decoration: none;
  border-radius: 4px;

  &.active {
    color: orange;
    background-color: #b70000;
  }
`;

// Dodaj asynchroniczne ładownie kodu JS dla tras aplikacji, wykorzystując React.lazy() i <Suspense>.

export const App = () => {
  return (
    <div>
      <nav className={css.navigate}>
        <StyledLink to="/" end>
          Home
        </StyledLink>
        <StyledLink to="/movies">Movies</StyledLink>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MovieSearch />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
