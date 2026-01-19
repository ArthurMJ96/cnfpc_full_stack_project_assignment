/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2026-01-19 09:08:07.

import { TicketPriority } from '../enums';
import { TicketStatus } from '../enums';
import { Role } from '../enums';

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

export interface UpdateUserRequestDTO {
    id: number;
    firstname: string;
    lastname: string;
    jobTitle: string;
    roles: Role[];
}
