export interface LoginResponse {
  result: string;
  message: string;
  data: {
    token: string;
  };
}
