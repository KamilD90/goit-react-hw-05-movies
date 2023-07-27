import { Routes, Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Cast, Home, MovieDetails, MovieSearch, Reviews } from './pages';
const StyledLink = styled(NavLink)`
  color: black;

  &.active {
    color: orange;
  }
`;

// Dodaj asynchroniczne ładownie kodu JS dla tras aplikacji, wykorzystując React.lazy() i <Suspense>.

export const App = () => {
  return (
    <div>
      <nav>
        <StyledLink to="/" end>
          Home
        </StyledLink>
        <StyledLink to="/movies">Movies</StyledLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MovieSearch />} />
        <Route path="/movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
};
