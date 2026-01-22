import { apiFetch } from "@/lib/api";
import type { RegisterRequestDTO, LoginRequestDTO, AuthResponseDTO } from "@shared/dtos";

// API for authentication
export const authApi = {
    register: (data: RegisterRequestDTO) => apiFetch<AuthResponseDTO>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    login: (data: LoginRequestDTO) => apiFetch<AuthResponseDTO>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
};