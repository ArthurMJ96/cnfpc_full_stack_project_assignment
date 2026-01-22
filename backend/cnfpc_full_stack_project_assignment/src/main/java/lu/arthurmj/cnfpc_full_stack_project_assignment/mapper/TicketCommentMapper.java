package lu.arthurmj.cnfpc_full_stack_project_assignment.mapper;

import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.ticket_comment.CreateTicketCommentRequestDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.response.TicketCommentResponseDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.TicketComment;

public class TicketCommentMapper {

    public static TicketCommentResponseDTO toResponse(TicketComment ticketComment) {
        if (ticketComment == null) {
            return null;
        }
        TicketCommentResponseDTO dto = new TicketCommentResponseDTO();
        dto.setId(ticketComment.getId());
        dto.setContent(ticketComment.getContent());
        dto.setAuthor(UserMapper.toResponse(ticketComment.getAuthor()));
        dto.setTicketId(ticketComment.getTicket().getId());
        dto.setEdited(ticketComment.isEdited());
        dto.setDeleted(ticketComment.isDeleted());
        dto.setType(ticketComment.getType());
        dto.setCreatedAt(ticketComment.getCreatedAt());
        dto.setUpdatedAt(ticketComment.getUpdatedAt());
        return dto;
    }

    public static TicketComment toEntity(CreateTicketCommentRequestDTO dto) {
        if (dto == null) {
            return null;
        }
        TicketComment ticketComment = new TicketComment();
        ticketComment.setContent(dto.getContent());
        return ticketComment;
    }
}
