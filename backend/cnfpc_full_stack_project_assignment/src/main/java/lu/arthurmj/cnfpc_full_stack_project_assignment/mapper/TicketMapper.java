package lu.arthurmj.cnfpc_full_stack_project_assignment.mapper;

import java.util.List;
import java.util.stream.Collectors;

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
        ticket.getAssignedTo().forEach(user -> dto.getAssignedTo().add(UserMapper.toResponse(user)));
        return dto;
    }

    public static Ticket toEntity(TicketResponseDTO dto) {
        if (dto == null) {
            return null;
        }
        Ticket ticket = new Ticket();
        ticket.setId(dto.getId());
        ticket.setTitle(dto.getTitle());
        ticket.setDescription(dto.getDescription());
        ticket.setStatus(dto.getStatus());
        ticket.setPriority(dto.getPriority());
        ticket.setAuthor(UserMapper.toEntity(dto.getAuthor()));
        ticket.setCreatedAt(dto.getCreatedAt());
        ticket.setUpdatedAt(dto.getUpdatedAt());
        ticket.setDueAt(dto.getDueAt());
        dto.getAssignedTo().forEach(userDto -> ticket.getAssignedTo().add(UserMapper.toEntity(userDto)));
        return ticket;
    }

    public List<TicketResponseDTO> toResponseList(List<Ticket> tickets) {
        if (tickets == null) {
            return null;
        }
        return tickets.stream()
                .map(TicketMapper::toResponse)
                .collect(Collectors.toList());
    }
}
