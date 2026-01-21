# IT Service Desk

> - Scope: A simple ticketing system for reporting bugs.
> - Core Features:
>   - User: Create a Ticket (Subject, Description, Urgency).
>   - Admin: View list of tickets and change status (Open -> Solved).
> - Optional AI Integration:
>   - "Sentiment Detector." AI analyses the ticket text. If the user sounds angry, it automatically lags the urgency as "High" or a sentiment score.

## Tables

- tickets
  - id
  - title
  - description
  - priority
  - status
  - assignedTo[] (FKs-> users.id's)
  - author (FK-> users.id)
  - createdAt
  - updatedAt
  - dueAt?

- users
  - id
  - email
  - password
  - roles[] (enum values)
  - createdAt
  - username
  - firstname
  - lastname
  - job_title

- user_roles
  - user_id (FK-> users.id)
  - role_name (enum)

- comments
  - id
  - author (FK-> users.id)
  - ticket (FK-> ticket.id)
  - content

- ticket_assignees
  - userId (FK-> users.id) (PK)
  - ticketId (FK-> ticket.id) (PK)

Retations:
tickets >--(ticket_assignees)--< users
comments >-- users
comments >-- tickets

---

## Possible features

AI Features:
Sentiment Detector  
 Ticket creator assistent  
 Assignment suggestor (based on user profiles)

Admin can:  
 Change assignees on any tickets
force change status (aka close)  
 change user roles (user management maybe?)

## random notes

npm create vite@latest frontend

## API:

- `/api`
  - `/users`
    - [GET] `/` => get all users (profile info only)
    - [GET] `/support` => get all support users
    - [GET] `/{id}` => get user by id
    - [POST] `/` => create user (if admin)
    - [PUT] `/` => update user (Can only update user from token, unless sender has ADMIN role)
  - `/tickets`
    - [GET] `/` => get all tickets without comments
    - [GET] `/{id}` => get ticket details by id
    - [POST] `/` => create ticket
    - [PUT] `/` => update ticket
    - `/comment`
      - [POST] `/` => create comment
      - [PUT] `/` => update comment & set `edited` to true
      - [DELETE] `/{id}` => set comment `deleted` to true
    - `/{ticketId}/assign/{supportId}`
      - [POST] `/` => assign ticket to support user
      - [DELETE] `/` => unassign ticket from support user
    - `/ai`
      - [GET] `/{ticketId}` => get sentiment analysis for a ticket
  - `/auth`
    - [POST] `/login` => login as user
    - [POST] `/register` => create new user
    - [GET] `/test` => get current user info and roles

## Frontend folder structure hints

```
src/
├── components/           <-- ONLY generic, reusable UI (Buttons, Inputs, Modals)
│   ├── ui/               <-- shadcn components go here
│   └── layout/           <-- MainLayout, Navbar, Sidebar
│
├── features/             <-- The meat of your app. Grouped by domain.
│   ├── tickets/          <-- Everything related to Tickets
│   │   ├── components/   <-- TicketList, TicketCard (only used here)
│   │   ├── hooks/        <-- useTicketActions
│   │   ├── types.ts      <-- Ticket interfaces
│   │   └── api.ts        <-- fetchTickets (API calls)
│   │
│   └── users/            <-- Everything related to Users
│       ├── components/
│       └── ...
│
├── lib/                  <-- Configuration & Helpers (axios instance, utils.ts)
├── pages/                <-- Page components that bind features together (routes)
└── App.tsx
```

## Site Plan

- (Public)
  - /login
    - Redirects
  - /register
- (AUTHORIZED)
  - /
    - (AUTHOR)
      - show short list of owned tickets, sorted by recently updated
    - (ADMIN)
      - show short list of all tickets, sorted by recently updated
    - (SUPPORT)
      - custom layout of two columns [2*,3*]
        - [col1] show list of tickets I am assigned to and are OPEN.
          - With sort options (by newest, Almost due or past due dat, by CLOSED)
          - For quick access
        - [col2] show list of newest ticket that are not yet assigned to anyone and OPEN
  - /ticket
    - /list
      - (AUTHOR)
      - view list of owned tickets (pagination?)
    - /create
      - create ticket form
    - /:id
      - /
        - view ticket
        - view comments
        - make comment
      - /update
        - update ticket form

## Presentation notes

1. Add/Setup context/pitch before starting db schema section
2. Explain db schema
3. Explain API routes
   1. Explain sentiment analysis route (Gemini AI integration)
4. Explain frontend structure (Used UI library, folder structure, routing)
5. Demonstrate key features and user roles
   1. Show creating ticket as AUTHOR flow
   2. Logout, login as SUPPORT, show ticket self assignment flow
      1. Say stuff like, "Here the system detects our Role and shows me the according dashboard"
   3. Logout, login as ADMIN, show admin ticket overview and assign ticket to SUPPORT flow
   4. Shortly show user management (change roles) stuff
   5. End
6. End with Q&A

###
Presentation Structure 23/1 (Max 30 min.)
Introduction (Project Pitch)
Database Design & Architecture
Tech Stack & Tools
Live Demo
Q&A


