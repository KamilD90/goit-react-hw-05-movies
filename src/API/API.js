export async function TrendingMovies(apiKey, currentPage) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&page=${currentPage}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
}

export async function getGenres(genreIds) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
    );
    const data = await response.json();

    // Filter the genres based on the provided genreIds
    const genres = data.genres.filter(genre => genreIds.includes(genre.id));

    // Map the genre names and return as an array
    return genres.map(genre => genre.name);
  } catch (error) {
    console.error('Error fetching genre names:', error);
    throw error;
  }
}
