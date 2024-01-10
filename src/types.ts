export interface Organisation {
  id: string;
  name: string;
  users: string[];
}

export interface Paged<T> {
  items: T[],
  pageSize: number,
  page: number,
  totalItems: number;
}

export interface User {
  id: string;
  name: string;
}