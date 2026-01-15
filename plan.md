# IT Service Desk
> - Scope: A simple ticketing system for reporting bugs.
> - Core Features:
>   - User: Create a Ticket (Subject, Description, Urgency).
>   - Admin: View list of tickets and change status (Open -> Solved).
> - Optional AI Integration: 
>   - "Sentiment Detector." AI analyses the ticket text. If the user sounds angry, it automatically  lags the urgency as "High" or a sentiment score.

## Tables

- tickets
  - id
  - subject
  - description
  - urgency
  - status
  - assigned[]  (FKs-> users.id[])
  - creator
  - createdAt
  - updatedAt
  - dueAt?

- users
  - id
  - email
  - password
  - role        (FK-> role.id)
  - createdAt
  - username
  - firstname
  - lastname
  - job_title

- roles
  - id
  - name
  - description

- comments
  - id
  - userId      (FK-> users.id)
  - ticketId    (FK-> ticket.id)

- ticket_assignments
  - userId      (FK-> users.id) (PK)
  - ticketId    (FK-> ticket.id) (PK)

Retations:
    tickets >--(ticket_assignments)--< users
    users --< roles
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