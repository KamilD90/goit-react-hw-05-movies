import React from 'react';
import { getMovieCredits } from 'API/API';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './Cast.module.css';

const Cast = () => {
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
    <div className={css.cast}>
      <h2 className={css.title}>Cast</h2>
      {cast.map(actor => (
        <div key={actor.id} className={css.actor}>
          <p className={css.name}>{actor.name}: </p>
          <p className={css.role}>{actor.character}</p>
        </div>
      ))}
    </div>
  );
};

export default Cast;
