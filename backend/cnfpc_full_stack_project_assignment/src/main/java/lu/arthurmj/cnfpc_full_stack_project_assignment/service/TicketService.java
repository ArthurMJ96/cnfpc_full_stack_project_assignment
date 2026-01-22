package lu.arthurmj.cnfpc_full_stack_project_assignment.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.ticket.CreateTicketRequestDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.ticket.UpdateTicketRequestDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.response.TicketResponseDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.Role;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.Ticket;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.TicketComment;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.TicketCommentType;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.TicketStatus;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.User;
import lu.arthurmj.cnfpc_full_stack_project_assignment.exception.ForbiddenException;
import lu.arthurmj.cnfpc_full_stack_project_assignment.exception.ResourceNotFoundException;
import lu.arthurmj.cnfpc_full_stack_project_assignment.mapper.TicketMapper;
import lu.arthurmj.cnfpc_full_stack_project_assignment.repository.TicketCommentRepository;
import lu.arthurmj.cnfpc_full_stack_project_assignment.repository.TicketRepository;
import lu.arthurmj.cnfpc_full_stack_project_assignment.repository.UserRepository;
import lu.arthurmj.cnfpc_full_stack_project_assignment.security.UserPrincipal;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GeminiService geminiService;

    @Autowired
    private TicketCommentRepository ticketCommentRepository;

    public List<TicketResponseDTO> getAll() {
        return TicketMapper.toResponseList(ticketRepository.findAll());
    }

    public TicketResponseDTO getById(Long id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket", id));

        boolean isAdmin = UserPrincipal.isAdmin();

        // Can only get their own tickets, unless SUPPORT or ADMIN
        if (!isAdmin && !UserPrincipal.isSupport()) {
            if (!ticket.getAuthor().getId().equals(UserPrincipal.getCurrentUserId())) {
                throw new ForbiddenException(UserPrincipal.getCurrentUserId(), "view this ticket");
            }
        }

        // If ADMIN, return with deleted comments
        return TicketMapper.toResponseWithComments(ticket, isAdmin);
    }

    public TicketResponseDTO create(CreateTicketRequestDTO dto) {
        Long authorId = dto.getAuthorId();
        // Must be the user himself
        if (!UserPrincipal.getCurrentUserId().equals(authorId)) {
            throw new ForbiddenException(UserPrincipal.getCurrentUserId(), "create this ticket");
        }

        User author = userRepository.findById(authorId)
                .orElseThrow(() -> new ResourceNotFoundException("User", authorId));

        // Verify AUTHOR role
        if (!author.getRoles().contains(Role.AUTHOR)) {
            throw new ForbiddenException(authorId, "create tickets");
        }

        Ticket ticket = TicketMapper.toEntity(dto);
        ticket.setAuthor(author);
        ticket.setStatus(TicketStatus.OPEN);
        try {
            // Call Gemini service to analyze sentiment and get a priority suggestion
            GeminiService.SentimentResponse sentimentResponse = geminiService.getTicketSentiment(ticket);
            ticket.setSentiment(sentimentResponse.getSentiment());
            ticket.setPriority(sentimentResponse.getDetectedPriority());
        } catch (Exception e) {
            System.err.println("Error calling Gemini service: " + e.getMessage());
        }
        return TicketMapper.toResponse(ticketRepository.save(ticket));
    }

    public TicketResponseDTO update(UpdateTicketRequestDTO dto) {
        Long ticketId = dto.getId();
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket", ticketId));

        // Must be the author himself or an ADMIN to update the ticket
        if (!UserPrincipal.getCurrentUserId().equals(ticket.getAuthor().getId()) && !UserPrincipal.isAdmin()) {
            throw new ForbiddenException(UserPrincipal.getCurrentUserId(), "update this ticket");
        }

        // Must be ADMIN or SUPPORT to update status (if it was changed)
        if (dto.getStatus() != null && !ticket.getStatus().equals(dto.getStatus())) {
            if (!UserPrincipal.isAdmin() && !UserPrincipal.isSupport()) {
                throw new ForbiddenException(UserPrincipal.getCurrentUserId(), "update ticket status");
            }
            createSystemComment(ticket, UserPrincipal.getCurrentUserId(),
                    String.format("updated the Status from **%s** to **%s**", ticket.getStatus(), dto.getStatus()));
            ticket.setStatus(dto.getStatus());
        }

        // Must be ADMIN to update priority (if it was changed)
        if (dto.getPriority() != null && !ticket.getPriority().equals(dto.getPriority())) {
            if (!UserPrincipal.isAdmin()) {
                throw new ForbiddenException(UserPrincipal.getCurrentUserId(), "update ticket priority");
            }
            createSystemComment(ticket, UserPrincipal.getCurrentUserId(),
                    String.format("updated the Priority from **%s** to **%s**", ticket.getPriority(),
                            dto.getPriority()));
            ticket.setPriority(dto.getPriority());
        }

        ticket.setTitle(dto.getTitle());
        ticket.setDescription(dto.getDescription());
        if (dto.getDueAt() != null) {
            ticket.setDueAt(dto.getDueAt());
        }

        boolean isAdmin = UserPrincipal.isAdmin();
        return TicketMapper.toResponseWithComments(ticketRepository.save(ticket), isAdmin);
    }

    public TicketResponseDTO assignTicketToSupport(Long ticketId, Long supportId) {
        // User can only assign to themselves, unless he is ADMIN
        if (!UserPrincipal.getCurrentUserId().equals(supportId) && !UserPrincipal.isAdmin()) {
            throw new ForbiddenException(UserPrincipal.getCurrentUserId(), "assign this ticket");
        }

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket", ticketId));

        User support = userRepository.findById(supportId)
                .orElseThrow(() -> new ResourceNotFoundException("User", supportId));

        // Verify given user has SUPPORT role
        if (!support.getRoles().contains(Role.SUPPORT)) {
            throw new ForbiddenException(supportId, "be assigned to tickets");
        }

        ticket.getAssignedTo().add(support);
        createSystemComment(ticket, UserPrincipal.getCurrentUserId(),
                String.format("assigned **%s**", support.getFirstname() + " " + support.getLastname()));

        boolean isAdmin = UserPrincipal.isAdmin();
        return TicketMapper.toResponseWithComments(ticketRepository.save(ticket), isAdmin);
    }

    public TicketResponseDTO unassignTicketFromSupport(Long ticketId, Long supportId) {
        // User can only unassign themselves, unless he is ADMIN
        if (!UserPrincipal.getCurrentUserId().equals(supportId) && !UserPrincipal.isAdmin()) {
            throw new ForbiddenException(UserPrincipal.getCurrentUserId(), "unassign this ticket");
        }

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket", ticketId));

        User support = userRepository.findById(supportId)
                .orElseThrow(() -> new ResourceNotFoundException("User", supportId));

        ticket.getAssignedTo().remove(support);
        createSystemComment(ticket, UserPrincipal.getCurrentUserId(),
                String.format("unassigned **%s**", support.getFirstname() + " " + support.getLastname()));

        boolean isAdmin = UserPrincipal.isAdmin();
        return TicketMapper.toResponseWithComments(ticketRepository.save(ticket), isAdmin);
    }

    private void createSystemComment(Ticket ticket, Long authorId, String content) {
        User author = userRepository.findById(authorId).orElseThrow();
        TicketComment comment = new TicketComment();
        comment.setTicket(ticket);
        comment.setAuthor(author);
        comment.setContent(content);
        comment.setType(TicketCommentType.UPDATE);
        ticketCommentRepository.save(comment);
    }
}
