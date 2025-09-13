const baseURL = "https://api.themoviedb.org/3/";

export const fetchMovieDetails = async (movieId: number) => {
  const url = `${baseURL}movie/${movieId}?language=en-US`;
  console.log("Fetching movie details from:", url);
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch movie details failed:", error);
    return null;
  }
}

export const fetchMoviesByGenre = async (genres: string[] = ["878", "53"], page: number = 1) => {
  const genreString = genres.join("%7C");
  const url = `${baseURL}discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreString}`;
  console.log("Fetching movies from:", url);
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Fetched movies:", data.results);
    return data;
  } catch (error) {
    console.error("Fetch movies failed:", error);
    return [];
  }
}

export const fetchGenres = async () => {
  const url = `${baseURL}genre/movie/list?language=en-US`;
  console.log("Fetching genres from:", url);
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Fetched genres:", data.genres);
    return data.genres;
  } catch (error) {
    console.error("Fetch genres failed:", error);
    return [];
  }
}