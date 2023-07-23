import axios from 'axios';

export async function TrendingMovies(apiKey, currentPage) {
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

export async function getGenres(apiKey, genreIds) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list`,
      {
        params: {
          api_key: apiKey,
        },
      }
    );
    const data = response.data;
    console.log('Data from API:', data);

    // Filtrujemy gatunki na podstawie dostarczonych identyfikatorów gatunków (genreIds)
    const genres = data.genres.filter(genre => genreIds.includes(genre.id));
    console.log('Filtered genres:', genres);

    // Mapujemy nazwy gatunków i zwracamy jako tablicę
    return genres.map(genre => genre.name);
  } catch (error) {
    console.error('Błąd podczas pobierania nazw gatunków filmowych:', error);
    throw error;
  }
}
