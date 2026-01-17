package lu.arthurmj.cnfpc_full_stack_project_assignment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.ticket_comment.CreateTicketCommentRequestDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.ticket_comment.UpdateTicketCommentRequestDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.response.TicketCommentResponseDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.Ticket;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.TicketComment;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.User;
import lu.arthurmj.cnfpc_full_stack_project_assignment.exception.ResourceNotFoundException;
import lu.arthurmj.cnfpc_full_stack_project_assignment.mapper.TicketCommentMapper;
import lu.arthurmj.cnfpc_full_stack_project_assignment.repository.TicketCommentRepository;
import lu.arthurmj.cnfpc_full_stack_project_assignment.repository.TicketRepository;
import lu.arthurmj.cnfpc_full_stack_project_assignment.repository.UserRepository;

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
    User author = userRepository.findById(authorId)
        .orElseThrow(() -> new ResourceNotFoundException("User", authorId));

    Long ticketId = dto.getTicketId();
    Ticket ticket = ticketRepository.findById(ticketId)
        .orElseThrow(() -> new ResourceNotFoundException("Ticket", ticketId));

    TicketComment ticketComment = TicketCommentMapper.toEntity(dto);

    ticketComment.setAuthor(author);
    ticketComment.setTicket(ticket);
    return TicketCommentMapper.toResponse(ticketCommentRepository.save(ticketComment));
  }

  public TicketCommentResponseDTO update(UpdateTicketCommentRequestDTO dto) {
    Long commentId = dto.getId();
    TicketComment ticketComment = ticketCommentRepository.findById(commentId)
        .orElseThrow(() -> new ResourceNotFoundException("Ticket Comment", commentId));

    ticketComment.setContent(dto.getContent());
    ticketComment.setEdited(true);
    return TicketCommentMapper.toResponse(ticketCommentRepository.save(ticketComment));
  }

  public void delete(Long id) {
    TicketComment ticketComment = ticketCommentRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Ticket Comment", id));
    ticketComment.setDeleted(true);
    ticketCommentRepository.save(ticketComment);
  }
}