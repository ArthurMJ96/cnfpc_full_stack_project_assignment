package lu.arthurmj.cnfpc_full_stack_project_assignment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.CreateTicketRequestDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.response.TicketResponseDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.service.TicketService;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @GetMapping
    public ResponseEntity<List<TicketResponseDTO>> getTickets() {
        return ResponseEntity.ok(ticketService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketResponseDTO> getTicketById(@PathVariable Long id) {
        return ResponseEntity.ok(ticketService.getById(id));
    }

    @PostMapping
    public ResponseEntity<TicketResponseDTO> createTicket(@Valid @RequestBody CreateTicketRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ticketService.save(dto));
    }
}
