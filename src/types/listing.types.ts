export interface PaginatedResponse<T> {
  clients: T[];
  total: number;
}

export type Sort = Record<string, 'asc' | 'desc'>;

export interface ListingParams {
  sort?: Sort;
  limit?: number;
  offset?: number;
}
