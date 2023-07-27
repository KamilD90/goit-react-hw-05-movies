import React from 'react';
import { getMovieReviews } from 'API/API';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieReviews();
  }, []);

  const fetchMovieReviews = async () => {
    try {
      const reviewsData = await getMovieReviews(movieId);
      setReviews(reviewsData);
    } catch (error) {
      console.error('Błąd podczas pobierania recenzji:', error);
    }
  };

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map(review => (
          <div key={review.id}>
            <p>{review.author}</p>
            <p>{review.content}</p>
          </div>
        ))
      ) : (
        <p>No reviews available</p>
      )}
    </div>
  );
};

export default Reviews;
