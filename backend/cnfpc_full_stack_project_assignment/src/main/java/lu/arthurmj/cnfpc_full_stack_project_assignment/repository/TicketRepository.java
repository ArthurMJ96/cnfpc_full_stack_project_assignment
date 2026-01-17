package lu.arthurmj.cnfpc_full_stack_project_assignment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

}
