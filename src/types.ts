
export interface Paged<T> {
  items: T[];
  pageSize: number;
  page: number;
  totalItems: number;
}
