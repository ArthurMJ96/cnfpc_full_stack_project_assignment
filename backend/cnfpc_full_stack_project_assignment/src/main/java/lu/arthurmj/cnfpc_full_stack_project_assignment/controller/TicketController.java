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
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Tickets", description = "Manage tickets and their comments")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @Autowired
    private TicketCommentService ticketCommentService;

    // #region Ticket Endpoints
    @GetMapping
    @Operation(summary = "Get all tickets", description = "Retrieve a list of all tickets accessible to the authenticated user.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "List of tickets retrieved successfully", content = @Content(schema = @Schema(implementation = TicketResponseDTO.class)))
    })
    public ResponseEntity<List<TicketResponseDTO>> getTickets() {
        return ResponseEntity.ok(ticketService.getAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get ticket by ID", description = "Retrieve a specific ticket by its unique identifier. Access restricted to tickets accessible to the authenticated user.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Ticket found", content = @Content(schema = @Schema(implementation = TicketResponseDTO.class))),
        @ApiResponse(responseCode = "404", description = "Ticket not found", content = @Content)
    })
    public ResponseEntity<TicketResponseDTO> getTicketById(@PathVariable Long id) {
        return ResponseEntity.ok(ticketService.getById(id));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('AUTHOR', 'ADMIN')")
    @Operation(summary = "Create a new ticket", description = "Create a new ticket. Access restricted to AUTHOR and ADMIN roles.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Ticket created successfully", content = @Content(schema = @Schema(implementation = TicketResponseDTO.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input data", content = @Content),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content),
        @ApiResponse(responseCode = "403", description = "Forbidden - Insufficient permissions", content = @Content)
    })
    public ResponseEntity<TicketResponseDTO> createTicket(@Valid @RequestBody CreateTicketRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ticketService.create(dto));
    }

    @PutMapping
    @PreAuthorize("hasAnyRole('AUTHOR', 'ADMIN')")
    @Operation(summary = "Update an existing ticket", description = "Update details of an existing ticket. Access restricted to tickets owned by the authenticated user or ADMIN role.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Ticket updated successfully", content = @Content(schema = @Schema(implementation = TicketResponseDTO.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input data", content = @Content),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content),
        @ApiResponse(responseCode = "403", description = "Forbidden - Insufficient permissions", content = @Content),
        @ApiResponse(responseCode = "404", description = "Ticket not found", content = @Content)
    })
    public ResponseEntity<TicketResponseDTO> updateTicket(@Valid @RequestBody UpdateTicketRequestDTO dto) {
        return ResponseEntity.ok(ticketService.update(dto));
    }
    // #endregion

    // #region Ticket Comment Endpoints
    @PostMapping("/comment")
    @Operation(summary = "Add a comment to a ticket", description = "Create a new comment associated with a specific ticket. Access restricted to tickets accessible to the authenticated user.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Comment created successfully", content = @Content(schema = @Schema(implementation = TicketCommentResponseDTO.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input data", content = @Content),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content),
        @ApiResponse(responseCode = "404", description = "Ticket not found", content = @Content)
    })
    public ResponseEntity<TicketCommentResponseDTO> createTicketComment(
            @Valid @RequestBody CreateTicketCommentRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ticketCommentService.create(dto));
    }

    @PutMapping("/comment")
    @Operation(summary = "Update a ticket comment", description = "Update the content of an existing ticket comment. Access restricted to comments owned by the authenticated user or ADMIN role.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Comment updated successfully", content = @Content(schema = @Schema(implementation = TicketCommentResponseDTO.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input data", content = @Content),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content),
        @ApiResponse(responseCode = "404", description = "Comment not found", content = @Content)
    })
    public ResponseEntity<TicketCommentResponseDTO> updateTicketComment(
            @Valid @RequestBody UpdateTicketCommentRequestDTO dto) {
        return ResponseEntity.ok(ticketCommentService.update(dto));
    }

    @DeleteMapping("/comment/{id}")
    @Operation(summary = "Delete a ticket comment", description = "Mark a ticket comment as deleted by its ID. Access restricted to comments owned by the authenticated user or ADMIN role.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Comment deleted successfully", content = @Content),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content),
        @ApiResponse(responseCode = "404", description = "Comment not found", content = @Content)
    })
    public ResponseEntity<Void> deleteTicketComment(@PathVariable Long id) {
        ticketCommentService.delete(id);
        return ResponseEntity.noContent().build();
    }
    // #endregion

    // #region Ticket Assignment Endpoints
    @PostMapping("/{ticketId}/assign/{supportId}")
    @PreAuthorize("hasAnyRole('SUPPORT', 'ADMIN')")
    @Operation(summary = "Assign ticket to support user", description = "Assign a support user to a specific ticket. Access restricted to SUPPORT and ADMIN roles.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Ticket assigned successfully", content = @Content(schema = @Schema(implementation = TicketResponseDTO.class))),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content),
        @ApiResponse(responseCode = "403", description = "Forbidden - Insufficient permissions", content = @Content),
        @ApiResponse(responseCode = "404", description = "Ticket or user not found", content = @Content)
    })
    public ResponseEntity<TicketResponseDTO> assignTicketToSupport(
            @PathVariable Long ticketId,
            @PathVariable Long supportId) {
        return ResponseEntity.ok(ticketService.assignTicketToSupport(ticketId, supportId));
    }

    @DeleteMapping("/{ticketId}/assign/{supportId}")
    @PreAuthorize("hasAnyRole('SUPPORT', 'ADMIN')")
    @Operation(summary = "Unassign ticket from support user", description = "Remove the assignment of a support user from a ticket. Access restricted to SUPPORT and ADMIN roles.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Ticket unassigned successfully", content = @Content(schema = @Schema(implementation = TicketResponseDTO.class))),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content),
        @ApiResponse(responseCode = "403", description = "Forbidden - Insufficient permissions", content = @Content),
        @ApiResponse(responseCode = "404", description = "Ticket or user not found", content = @Content)
    })
    public ResponseEntity<TicketResponseDTO> unassignTicketFromSupport(
            @PathVariable Long ticketId,
            @PathVariable Long supportId) {
        return ResponseEntity.ok(ticketService.unassignTicketFromSupport(ticketId, supportId));
    }
    // #endregion
}
