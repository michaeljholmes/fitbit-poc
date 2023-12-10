export interface Organisation {
  id: string;
  name: string;
}

export interface Paged<T> {
  items: T[],
  pageSize: number,
  page: number,
  totalItems: number;
}