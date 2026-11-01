import ReactPaginateModule from 'react-paginate';
import type { ReactPaginateProps } from 'react-paginate';
import type { ComponentType } from 'react';
import css from '../App/App.module.css';

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

interface PaginationProps {
  pageCount: number;
  pageRangeDisplayed: number;
  marginPagesDisplayed: number;
  onPageChange: (nextPage: number) => void;
  forcePage: number;
  containerClassName: string;
  activeClassName: string;
  nextLabel: string;
  previousLabel: string;
}

export default function Pagination(props: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={props.pageCount}
      pageRangeDisplayed={props.pageRangeDisplayed}
      marginPagesDisplayed={props.marginPagesDisplayed}
      onPageChange={({ selected }) => props.onPageChange(selected + 1)}
      forcePage={props.forcePage}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
