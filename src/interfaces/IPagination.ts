export interface IPagination {
  page: number;
  size: number;
  changePage: (page: number, size: number) => void;
  resetPage: () => void;
}
