import React from 'react';
import { getMovieReviews } from 'API/API';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiKey } from 'API/API'; // Importujemy apiKey z zewnętrznego modułu

export const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  const fetchMovieReviews = async () => {
    try {
      const movieReviewData = await getMovieReviews(movieId, apiKey); // Pass the movieId and apiKey
      setReviews(movieReviewData.results); // Use the 'results' property from the API response
    } catch (error) {
      console.error('Error fetching movie reviews:', error);
    }
  };

  useEffect(() => {
    fetchMovieReviews();
  }, [movieId]);

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
