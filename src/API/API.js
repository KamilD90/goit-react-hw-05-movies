import axios from 'axios';

export const apiKey = 'd416a06f75f7c918219a6b8fa9f2713c';

export async function getTrendingMovies(apiKey, currentPage) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day`,
      {
        params: {
          api_key: apiKey,
          page: currentPage,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
}

export async function getMovieByName(query) {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/search/movie',
      {
        params: {
          api_key: apiKey,
          query: query,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('nie znaleziono filmu z zadaną nazwą :', error);
    throw error;
  }
}

export const getMovieDetails = async movieId => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.error('Błąd podczas pobierania informacji o filmie:', error);
    throw error;
  }
};

export const getMovieCredits = async movieId => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.error('Blad podczas pobierania obsady filmu', error);
    throw error;
  }
};

export const getMovieReviews = async movieId => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.error('błąd podczas pobierania recenzji filmu', error);
    throw error;
  }
};
