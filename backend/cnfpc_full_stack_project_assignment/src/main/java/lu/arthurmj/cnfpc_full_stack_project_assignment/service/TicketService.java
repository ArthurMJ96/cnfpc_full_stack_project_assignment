package lu.arthurmj.cnfpc_full_stack_project_assignment.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.response.TicketResponseDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.Ticket;
import lu.arthurmj.cnfpc_full_stack_project_assignment.exception.ResourceNotFoundException;
import lu.arthurmj.cnfpc_full_stack_project_assignment.mapper.TicketMapper;
import lu.arthurmj.cnfpc_full_stack_project_assignment.repository.TicketRepository;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    public List<TicketResponseDTO> getAll() {
        // return TicketMapper.toResponseList(ticketRepository.findAll());
        return TicketMapper.toResponseListWithComments(ticketRepository.findAll());
    }

    public TicketResponseDTO save(Ticket ticket) {
        return TicketMapper.toResponse(ticketRepository.save(ticket));
    }

    public TicketResponseDTO getById(Long id) {
        return TicketMapper.toResponseWithComments(ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket", id)));
    }
}
