package lu.arthurmj.cnfpc_full_stack_project_assignment.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.ticket.CreateTicketRequestDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.ticket.UpdateTicketRequestDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.response.TicketResponseDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.Role;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.Ticket;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.TicketStatus;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.User;
import lu.arthurmj.cnfpc_full_stack_project_assignment.exception.ForbiddenException;
import lu.arthurmj.cnfpc_full_stack_project_assignment.exception.ResourceNotFoundException;
import lu.arthurmj.cnfpc_full_stack_project_assignment.mapper.TicketMapper;
import lu.arthurmj.cnfpc_full_stack_project_assignment.repository.TicketRepository;
import lu.arthurmj.cnfpc_full_stack_project_assignment.repository.UserRepository;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private UserRepository userRepository;

    public List<TicketResponseDTO> getAll() {
        return TicketMapper.toResponseList(ticketRepository.findAll());
    }

    public TicketResponseDTO getById(Long id) {
        return TicketMapper.toResponseWithComments(ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket", id)), false);
    }

    public TicketResponseDTO create(CreateTicketRequestDTO dto) {
        Long authorId = dto.getAuthorId();
        User author = userRepository.findById(authorId)
                .orElseThrow(() -> new ResourceNotFoundException("User", authorId));

        // Verify author role
        if (!author.getRoles().contains(Role.AUTHOR)) {
            throw new ForbiddenException(authorId, "create tickets");
        }

        Ticket ticket = TicketMapper.toEntity(dto);
        ticket.setAuthor(author);
        ticket.setStatus(TicketStatus.OPEN);

        return TicketMapper.toResponse(ticketRepository.save(ticket));
    }

    public TicketResponseDTO update(UpdateTicketRequestDTO dto) {
        Long ticketId = dto.getId();
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket", ticketId));

        ticket.setTitle(dto.getTitle());
        ticket.setDescription(dto.getDescription());
        ticket.setPriority(dto.getPriority());
        if (dto.getDueAt() != null) {
            ticket.setDueAt(dto.getDueAt());
        }
        ticket.setStatus(dto.getStatus());

        return TicketMapper.toResponse(ticketRepository.save(ticket));
    }

    public TicketResponseDTO assignTicketToSupport(Long ticketId, Long supportId) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket", ticketId));

        User support = userRepository.findById(supportId)
                .orElseThrow(() -> new ResourceNotFoundException("User", supportId));

        // Verify support role
        if (!support.getRoles().contains(Role.SUPPORT)) {
            throw new ForbiddenException(supportId, "be assigned to tickets");
        }

        ticket.getAssignedTo().add(support);
        return TicketMapper.toResponse(ticketRepository.save(ticket));
    }

    public TicketResponseDTO unassignTicketFromSupport(Long ticketId, Long supportId) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket", ticketId));

        User support = userRepository.findById(supportId)
                .orElseThrow(() -> new ResourceNotFoundException("User", supportId));

        ticket.getAssignedTo().remove(support);
        return TicketMapper.toResponse(ticketRepository.save(ticket));
    }
}
