package lu.arthurmj.cnfpc_full_stack_project_assignment.mapper;

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
        return dto;
    }
}
