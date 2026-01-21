import { apiFetch } from "@/lib/api";
import type {
    UserResponseDTO,
    UpdateUserRequestDTO,
    CreateUserRequestDTO
} from "@shared/dtos";

// API for user-related operations
export const userApi = {
    getAll: () => apiFetch<UserResponseDTO[]>('/users', {
        method: 'GET',
    }),
    getAllSupports: () => apiFetch<UserResponseDTO[]>('/users/support', {
        method: 'GET',
    }),
    getById: (id: number) => apiFetch<UserResponseDTO>(`/users/${id}`, {
        method: 'GET',
    }),
    updateUser: (data: UpdateUserRequestDTO) => apiFetch<UserResponseDTO>('/users', {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    createUser: (data: CreateUserRequestDTO) => apiFetch<UserResponseDTO>('/users', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
};