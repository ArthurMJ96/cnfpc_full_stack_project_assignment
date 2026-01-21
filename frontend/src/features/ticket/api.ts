import { apiFetch } from "@/lib/api";
import type {
    TicketResponseDTO,
    CreateTicketRequestDTO,
    UpdateTicketRequestDTO,
    TicketCommentResponseDTO,
    CreateTicketCommentRequestDTO,
    UpdateTicketCommentRequestDTO
} from "@shared/dtos";

// API for ticket-related operations
export const ticketApi = {
    getAll: () => apiFetch<TicketResponseDTO[]>('/tickets', {
        method: 'GET',
    }),
    getById: (id: number) => apiFetch<TicketResponseDTO>(`/tickets/${id}`, {
        method: 'GET',
    }),
    create: (data: CreateTicketRequestDTO) => apiFetch<TicketResponseDTO>('/tickets', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    update: (data: UpdateTicketRequestDTO) => apiFetch<TicketResponseDTO>('/tickets', {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    assignSupport: (ticketId: number, supportId: number) => apiFetch<TicketResponseDTO>(`/tickets/${ticketId}/assign/${supportId}`, {
        method: 'POST',
    }),
    unassignSupport: (ticketId: number, supportId: number) => apiFetch<TicketResponseDTO>(`/tickets/${ticketId}/assign/${supportId}`, {
        method: 'DELETE',
    }),
    addComment: (data: CreateTicketCommentRequestDTO) => apiFetch<TicketCommentResponseDTO>('/tickets/comment', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    updateComment: (data: UpdateTicketCommentRequestDTO) => apiFetch<TicketCommentResponseDTO>('/tickets/comment', {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    deleteComment: (id: number) => apiFetch<void>(`/tickets/comment/${id}`, {
        method: 'DELETE',
    }),
};