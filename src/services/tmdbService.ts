import { Request } from 'express';

const baseURL = "https://api.themoviedb.org/3/";

export const fetchMovieDetails = async (movieId: number) => {
  const url = `${baseURL}movie/${movieId}?language=en-US`;
  console.log("Fetching movie details from:", url);
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
        'Content-Type': 'application/json;charset=utf-8',
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

export const fetchMoviesByQuery = async (req: Request) => {
  const baseURL = "https://api.themoviedb.org/3/";
  const queryString = req.url?.split('?')[1] || '';
  const url = `${baseURL}discover/movie?${queryString}`;
  console.log("Fetching movies by query from:", url);
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