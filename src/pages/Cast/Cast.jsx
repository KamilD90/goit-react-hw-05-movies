import React from 'react';
import { getMovieCredits } from 'API/API';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  const fetchMovieCredits = async () => {
    try {
      const movieCastData = await getMovieCredits(movieId);
      setCast(movieCastData.cast);
      console.log(movieCastData);
    } catch (error) {
      console.error('An error occured while fetching the data', error);
    }
  };

  useEffect(() => {
    fetchMovieCredits();
  }, []);

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
