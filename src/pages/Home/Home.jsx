import { Link } from 'react-router-dom';

export const Home = ({ moviesData }) => {
  return (
    <main>
      <h2>Trending today</h2>
      <ul>
        {moviesData &&
          moviesData.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.original_title}</Link>
            </li>
          ))}
      </ul>
    </main>
  );
};

export default Home;
