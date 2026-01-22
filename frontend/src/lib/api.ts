import type { ErrorResponseDTO } from "@shared/dtos";

const API_BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : "http://localhost:8080/api";

export const TOKEN_STORAGE_KEY = "tfl_token";
export const USER_STORAGE_KEY = "tfl_user";

export type ErrorWithCause = Partial<Error> & {
  message?: string;
  cause?: string[];
};

/**
 * @throws {ErrorWithCause}
 */
export const apiFetch = async <T, E extends string = `/${string}`>(
  endpoint: E extends `/${string}` ? E : never,
  options: RequestInit = {},
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);

  const res = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const errorResponse = (await res.json()) as ErrorResponseDTO;
    throw new Error(...formatErrorResponse(errorResponse)) as ErrorWithCause;
  }

  const text = await res.text();
  return (text ? JSON.parse(text) : null) as T;
};

function formatErrorResponse(
  data: ErrorResponseDTO,
): [string, { cause: string[] }] {
  const { message, errors } = data;
  return [message, { cause: errors ? Object.values(errors) : [] }];
}
