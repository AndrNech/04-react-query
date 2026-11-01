import axios from 'axios';
import type { MoviesResponse } from '../types/movie';
import toast from 'react-hot-toast';

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

  if (data.results.length === 0) {
    toast.error('No movies found for your request.');
  }

  return data;
}
