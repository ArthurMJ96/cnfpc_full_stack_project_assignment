package lu.arthurmj.cnfpc_full_stack_project_assignment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.Ticket;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.TicketStatus;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    long countByAssignedTo_Id(Long userId);

    long countByAssignedTo_IdAndStatus(Long userId, TicketStatus status);

    long countByAuthor_Id(Long userId);
}
