package lu.arthurmj.cnfpc_full_stack_project_assignment.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.Ticket;
import lu.arthurmj.cnfpc_full_stack_project_assignment.repository.TicketRepository;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    public List<Ticket> getAll() {
        return ticketRepository.findAll();
    }

    public Ticket save(Ticket ticket) {
        return ticketRepository.save(ticket);
    }
}
