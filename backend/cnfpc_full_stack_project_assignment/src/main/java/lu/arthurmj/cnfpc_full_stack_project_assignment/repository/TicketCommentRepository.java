package lu.arthurmj.cnfpc_full_stack_project_assignment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.TicketComment;

public interface TicketCommentRepository extends JpaRepository<TicketComment, Long> {

    long countByAuthor_Id(Long userId);
}
