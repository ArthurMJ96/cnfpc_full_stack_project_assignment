package lu.arthurmj.cnfpc_full_stack_project_assignment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.ticket_comment.CreateTicketCommentRequestDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.ticket_comment.UpdateTicketCommentRequestDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.response.TicketCommentResponseDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.Ticket;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.TicketComment;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.User;
import lu.arthurmj.cnfpc_full_stack_project_assignment.exception.ForbiddenException;
import lu.arthurmj.cnfpc_full_stack_project_assignment.exception.ResourceNotFoundException;
import lu.arthurmj.cnfpc_full_stack_project_assignment.mapper.TicketCommentMapper;
import lu.arthurmj.cnfpc_full_stack_project_assignment.repository.TicketCommentRepository;
import lu.arthurmj.cnfpc_full_stack_project_assignment.repository.TicketRepository;
import lu.arthurmj.cnfpc_full_stack_project_assignment.repository.UserRepository;
import lu.arthurmj.cnfpc_full_stack_project_assignment.security.UserPrincipal;

@Service
public class TicketCommentService {
  @Autowired
  private TicketCommentRepository ticketCommentRepository;

  @Autowired
  private TicketRepository ticketRepository;

  @Autowired
  private UserRepository userRepository;

  public TicketCommentResponseDTO create(CreateTicketCommentRequestDTO dto) {
    Long authorId = dto.getAuthorId();

    // Must be the user himself
    if (!UserPrincipal.getCurrentUserId().equals(authorId)) {
      throw new ForbiddenException(UserPrincipal.getCurrentUserId(), "create this comment");
    }

    // Verify author exists
    User author = userRepository.findById(authorId)
        .orElseThrow(() -> new ResourceNotFoundException("User", authorId));

    // Verify ticket exists
    Long ticketId = dto.getTicketId();
    Ticket ticket = ticketRepository.findById(ticketId)
        .orElseThrow(() -> new ResourceNotFoundException("Ticket", ticketId));

    // Must be author of the ticket or SUPPORT/ADMIN to comment on it
    if (!ticket.getAuthor().getId().equals(authorId) && !UserPrincipal.isSupport() && !UserPrincipal.isAdmin()) {
      throw new ForbiddenException(authorId, "create comment on this ticket");
    }

    TicketComment ticketComment = TicketCommentMapper.toEntity(dto);

    ticketComment.setAuthor(author);
    ticketComment.setTicket(ticket);
    return TicketCommentMapper.toResponse(ticketCommentRepository.save(ticketComment));
  }

  public TicketCommentResponseDTO update(UpdateTicketCommentRequestDTO dto) {
    TicketComment ticketComment = ticketCommentRepository.findById(dto.getId())
        .orElseThrow(() -> new ResourceNotFoundException("Ticket Comment", dto.getId()));
    Long userId = UserPrincipal.getCurrentUserId();

    // Cannot update deleted comments
    if (ticketComment.isDeleted()) {
      throw new ForbiddenException(userId, "update this comment");
    }

    // Must be the author himself
    if (!userId.equals(ticketComment.getAuthor().getId())) {
      throw new ForbiddenException(userId, "update this comment");
    }

    ticketComment.setContent(dto.getContent());
    ticketComment.setEdited(true);
    return TicketCommentMapper.toResponse(ticketCommentRepository.save(ticketComment));
  }

  public void delete(Long id) {
    TicketComment ticketComment = ticketCommentRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Ticket Comment", id));

    // Must be the author himself or ADMIN
    if (!UserPrincipal.getCurrentUserId().equals(ticketComment.getAuthor().getId())
        && !UserPrincipal.isAdmin()) {
      throw new ForbiddenException(UserPrincipal.getCurrentUserId(), "delete this comment");
    }

    ticketComment.setDeleted(true);
    ticketCommentRepository.save(ticketComment);
  }
}