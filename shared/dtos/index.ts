/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2026-01-22 10:01:44.

import { TicketPriority } from '../enums';
import { TicketStatus } from '../enums';
import { Role } from '../enums';
import { TicketCommentType } from '../enums';

export interface ErrorResponseDTO {
    status: number;
    message: string;
    timestamp: Date;
    errors: { [index: string]: string };
}

export interface LoginRequestDTO {
    email: string;
    password: string;
}

export interface RegisterRequestDTO {
    email: string;
    password: string;
    passwordConfirm: string;
    firstname: string;
    lastname: string;
    jobTitle: string;
}

export interface BaseTicketRequestDTO {
    title: string;
    description: string;
    dueAt: Date;
}

export interface CreateTicketRequestDTO extends BaseTicketRequestDTO {
    authorId: number;
}

export interface UpdateTicketRequestDTO extends BaseTicketRequestDTO {
    id: number;
    status: TicketStatus;
    priority: TicketPriority;
}

export interface BaseTicketCommentRequestDTO {
    content: string;
    ticketId: number;
}

export interface CreateTicketCommentRequestDTO extends BaseTicketCommentRequestDTO {
    authorId: number;
}

export interface UpdateTicketCommentRequestDTO extends BaseTicketCommentRequestDTO {
    id: number;
}

export interface CreateUserRequestDTO extends RegisterRequestDTO {
    roles: Role[];
}

export interface UpdatePasswordRequestDTO {
    id: number;
    currentPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
}

export interface UpdateUserRequestDTO {
    id: number;
    firstname: string;
    lastname: string;
    jobTitle: string;
    roles: Role[];
}

export interface AuthResponseDTO extends UserResponseDTO {
    token: string;
    type: string;
    email: string;
}

export interface TicketCommentResponseDTO {
    id: number;
    ticketId: number;
    edited: boolean;
    deleted: boolean;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    author: UserResponseDTO;
    type: TicketCommentType;
}

export interface TicketResponseDTO {
    id: number;
    title: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
    sentiment: string;
    author: UserResponseDTO;
    assignedTo: UserResponseDTO[];
    createdAt: Date;
    updatedAt: Date;
    dueAt: Date;
    commentCount: number;
    comments: TicketCommentResponseDTO[];
}

export interface UserResponseDTO {
    id: number;
    firstname: string;
    lastname: string;
    jobTitle: string;
    roles: Role[];
}

export interface UserStatsResponseDTO {
    assignedTickets: number;
    resolvedAssignedTickets: number;
    createdTickets: number;
    totalComments: number;
}
