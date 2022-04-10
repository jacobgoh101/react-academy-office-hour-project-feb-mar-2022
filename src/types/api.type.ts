export interface ApiResponse<T> {
  success: boolean;
  client?: T;
  invoice?: T;
}
