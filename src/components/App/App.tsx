import { useState } from 'react';
import css from './App.module.css';
import type { Movie } from '../../types/movie';
import { Toaster } from 'react-hot-toast';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import SearchBar from '../SearchBar/SearchBar';
import fetchMovies from '../../services/movieService';
import Loader from '../Loader/Loader';
import MovieGrid from '../MovieGrid/MovieGrid';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import Pagination from '../ReactPaginate/ReactPaginate.tsx';

export default function App() {
  // const [movies, setMovies] = useState<Movie[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [isError, setIsError] = useState<boolean>(false);
  const [title, setTitle] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['movies', title, page],
    enabled: title !== null,
    queryFn: () => fetchMovies(title!, page),
    placeholderData: keepPreviousData,
  });

  const handleQuery = (title: string): void => {
    setTitle(title);
    setPage(1);
  };

  function handleSelectMovie(movie: Movie) {
    setSelectedMovie(movie);
  }
  function handleCloseModal() {
    setSelectedMovie(null);
  }
  function handlePageChange(page: number) {
    setPage(page);
  }

  return (
    <div className={css.app}>
      <Toaster />
      <SearchBar onSubmit={handleQuery} />
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      {isSuccess && data.total_pages > 1 && (
        <Pagination
          pageCount={data.total_pages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={handlePageChange}
          forcePage={data.page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      {isSuccess && (
        <MovieGrid movies={data.results} onSelect={handleSelectMovie} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}
