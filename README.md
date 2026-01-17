# IT Service Desk
> - Scope: A simple ticketing system for reporting bugs.
> - Core Features:
>   - User: Create a Ticket (Subject, Description, Urgency).
>   - Admin: View list of tickets and change status (Open -> Solved).
> - Optional AI Integration: 
>   - "Sentiment Detector." AI analyses the ticket text. If the user sounds angry, it automatically  lags the urgency as "High" or a sentiment score.

## Readme TBA..



### Update Shared Enums

Run Spring Boot with updated `/shared/enums`
```cmd
cd .\backend\cnfpc_full_stack_project_assignment
.\mvnw.cmd clean process-classes spring-boot:run
```

Update `/shared/enums` without running Spring Boot
```cmd
cd .\backend\cnfpc_full_stack_project_assignment
.\mvnw.cmd clean process-classes
```
