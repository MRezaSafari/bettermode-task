interface IOptions {
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  body?: unknown;
}
type THttpMethod = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";

interface IFetchError {
  status: number;
  message: string;
  code: number;
  errors?: { field: string; message: string; validation: string }[];
  error_code: string | number;
}
export type { IFetchError, IOptions, THttpMethod };

