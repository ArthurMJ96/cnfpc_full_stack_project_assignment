package lu.arthurmj.cnfpc_full_stack_project_assignment.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.CreateTicketRequestDTO;
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
        // return TicketMapper.toResponseList(ticketRepository.findAll());
        return TicketMapper.toResponseListWithComments(ticketRepository.findAll());
    }

    public TicketResponseDTO save(CreateTicketRequestDTO dto) {
        long authorId = dto.getAuthorId();
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

    public TicketResponseDTO getById(Long id) {
        return TicketMapper.toResponseWithComments(ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket", id)));
    }
}
