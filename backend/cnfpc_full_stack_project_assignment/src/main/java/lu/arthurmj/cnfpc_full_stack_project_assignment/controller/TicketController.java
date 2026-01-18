package lu.arthurmj.cnfpc_full_stack_project_assignment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.ticket.CreateTicketRequestDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.ticket.UpdateTicketRequestDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.ticket_comment.CreateTicketCommentRequestDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.ticket_comment.UpdateTicketCommentRequestDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.response.TicketCommentResponseDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.response.TicketResponseDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.service.TicketCommentService;
import lu.arthurmj.cnfpc_full_stack_project_assignment.service.TicketService;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @Autowired
    private TicketCommentService ticketCommentService;

    // #region Ticket Endpoints
    @GetMapping
    public ResponseEntity<List<TicketResponseDTO>> getTickets() {
        return ResponseEntity.ok(ticketService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketResponseDTO> getTicketById(@PathVariable Long id) {
        return ResponseEntity.ok(ticketService.getById(id));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('AUTHOR', 'ADMIN')")
    public ResponseEntity<TicketResponseDTO> createTicket(@Valid @RequestBody CreateTicketRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ticketService.create(dto));
    }

    @PutMapping
    @PreAuthorize("hasAnyRole('AUTHOR', 'ADMIN')")
    public ResponseEntity<TicketResponseDTO> updateTicket(@Valid @RequestBody UpdateTicketRequestDTO dto) {
        return ResponseEntity.ok(ticketService.update(dto));
    }
    // #endregion

    // #region Ticket Comment Endpoints
    @PostMapping("/comment")
    public ResponseEntity<TicketCommentResponseDTO> createTicketComment(
            @Valid @RequestBody CreateTicketCommentRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ticketCommentService.create(dto));
    }

    @PutMapping("/comment")
    public ResponseEntity<TicketCommentResponseDTO> updateTicketComment(
            @Valid @RequestBody UpdateTicketCommentRequestDTO dto) {
        return ResponseEntity.ok(ticketCommentService.update(dto));
    }

    @DeleteMapping("/comment/{id}")
    public ResponseEntity<Void> deleteTicketComment(@PathVariable Long id) {
        ticketCommentService.delete(id);
        return ResponseEntity.noContent().build();
    }
    // #endregion

    // #region Ticket Assignment Endpoints
    @PostMapping("/{ticketId}/assign/{supportId}")
    @PreAuthorize("hasAnyRole('SUPPORT', 'ADMIN')")
    public ResponseEntity<TicketResponseDTO> assignTicketToSupport(
            @PathVariable Long ticketId,
            @PathVariable Long supportId) {
        return ResponseEntity.ok(ticketService.assignTicketToSupport(ticketId, supportId));
    }

    @DeleteMapping("/{ticketId}/assign/{supportId}")
    @PreAuthorize("hasAnyRole('SUPPORT', 'ADMIN')")
    public ResponseEntity<TicketResponseDTO> unassignTicketFromSupport(
            @PathVariable Long ticketId,
            @PathVariable Long supportId) {
        return ResponseEntity.ok(ticketService.unassignTicketFromSupport(ticketId, supportId));
    }
    // #endregion
}
