package lu.arthurmj.cnfpc_full_stack_project_assignment.mapper;

import java.util.List;
import java.util.stream.Collectors;

import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.ticket.CreateTicketRequestDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.response.TicketResponseDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.Ticket;

public class TicketMapper {
    public static TicketResponseDTO toResponse(Ticket ticket) {
        if (ticket == null) {
            return null;
        }
        TicketResponseDTO dto = new TicketResponseDTO();
        dto.setId(ticket.getId());
        dto.setTitle(ticket.getTitle());
        dto.setDescription(ticket.getDescription());
        dto.setStatus(ticket.getStatus());
        dto.setPriority(ticket.getPriority());
        dto.setAuthor(UserMapper.toResponse(ticket.getAuthor()));
        dto.setCreatedAt(ticket.getCreatedAt());
        dto.setUpdatedAt(ticket.getUpdatedAt());
        dto.setDueAt(ticket.getDueAt());
        dto.setCommentCount(ticket.getCommentCount());
        ticket.getAssignedTo().forEach(user -> dto.getAssignedTo().add(UserMapper.toResponse(user)));
        return dto;
    }

    public static TicketResponseDTO toResponseWithComments(Ticket ticket, boolean includeDeleted) {
        if (ticket == null) {
            return null;
        }
        TicketResponseDTO dto = toResponse(ticket);
        ticket.getComments().stream()
                .filter(comment -> includeDeleted || !comment.isDeleted())
                .forEach(comment -> dto.getComments().add(TicketCommentMapper.toResponse(comment)));
        return dto;
    }

    public static Ticket toEntity(CreateTicketRequestDTO dto) {
        if (dto == null) {
            return null;
        }
        Ticket ticket = new Ticket();
        ticket.setTitle(dto.getTitle());
        ticket.setDescription(dto.getDescription());
        ticket.setDueAt(dto.getDueAt());
        return ticket;
    }

    public static List<TicketResponseDTO> toResponseList(List<Ticket> tickets) {
        if (tickets == null) {
            return null;
        }
        return tickets.stream()
                .map(TicketMapper::toResponse)
                .collect(Collectors.toList());
    }

    public static List<TicketResponseDTO> toResponseListWithComments(List<Ticket> tickets, boolean includeDeleted) {
        if (tickets == null) {
            return null;
        }
        return tickets.stream()
                .map(ticket -> toResponseWithComments(ticket, includeDeleted))
                .collect(Collectors.toList());
    }
}
