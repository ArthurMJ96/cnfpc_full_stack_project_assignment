package lu.arthurmj.cnfpc_full_stack_project_assignment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.response.TicketResponseDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.service.TicketService;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @GetMapping
    public List<TicketResponseDTO> getTickets() {
        return ticketService.getAll();
    }
}
