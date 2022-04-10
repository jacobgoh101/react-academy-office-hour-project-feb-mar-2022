export interface PaginatedResponse<T> {
  clients?: T[];
  invoices?: T[];
  total: number;
}

export type Sort = Record<string, 'asc' | 'desc'>;

export interface ListingParams {
  sort?: Sort;
  limit?: number;
  offset?: number;
}

export interface TableData extends Object {
  id: string;
  rowHref?: string;
}
