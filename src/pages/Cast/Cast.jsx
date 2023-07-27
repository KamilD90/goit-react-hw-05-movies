import React from 'react';
import { getMovieCredits } from 'API/API';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { Outlet } from 'react-router-dom';

export const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieCredits();
  }, []);

  const fetchMovieCredits = async () => {
    try {
      const castData = await getMovieCredits(movieId);
      setCast(castData);
    } catch (error) {
      console.error(
        'Błąd podczas pobierania informacji o zespole aktorskim:',
        error
      );
    }
  };

  return (
    <div>
      <h2>Cast</h2>
      {cast.map(actor => (
        <div key={actor.id}>
          <p>{actor.name}</p>
          <p>{actor.character}</p>
        </div>
      ))}
    </div>
  );
};

export default Cast;
