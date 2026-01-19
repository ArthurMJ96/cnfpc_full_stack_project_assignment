import type { ErrorResponseDTO } from "@shared/dtos";

const API_BASE_URL = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api`
    : 'http://localhost:8080/api';

export type ErrorWithCause = Partial<Error> & { message?: string; cause?: string[] };

type FormatErrorResponse = [string, { cause: string[] }];
function formatErrorResponse({ message, errors }: ErrorResponseDTO): FormatErrorResponse {
    return [message, { cause: errors ? Object.values(errors) : [] }];
}

export const apiFetch = async <T, E extends string = `/${string}`>(endpoint: E extends `/${string}` ? E : never, options: RequestInit = {}): Promise<T | null> => {
    const url = `${API_BASE_URL}${endpoint}`;
    let errors: FormatErrorResponse = ['Network error', { cause: [] }]
    try {
        const res = await fetch(url, {
            ...options,
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers || {}),
            },
        });

        if (!res.ok) {
            errors[0] = res.statusText;
            try {
                const errorResponse = await res.json() as ErrorResponseDTO;
                errors = formatErrorResponse(errorResponse);

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (_e: unknown) {
                // Ignore JSON parse errors
            }
            throw new Error(...errors);
        }

        const text = await res.text();
        return text ? JSON.parse(text) : null;
    } catch (error: ErrorResponseDTO | unknown) {
        console.error('API fetch error:', error);
        throw new Error(...errors);
    }
}
