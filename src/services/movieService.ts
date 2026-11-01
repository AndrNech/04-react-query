import axios from 'axios';
import type { Movie } from '../types/movie';

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export default async function fetchMovies(
  title: string,
  page: number
): Promise<MoviesResponse> {
  const { data } = await axios.get<MoviesResponse>(
    'https://api.themoviedb.org/3/search/movie',
    {
      params: {
        query: title,
        page,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    }
  );

  return data;
}
