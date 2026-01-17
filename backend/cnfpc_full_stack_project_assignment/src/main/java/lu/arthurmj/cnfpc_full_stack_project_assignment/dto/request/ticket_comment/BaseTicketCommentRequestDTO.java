package lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.ticket_comment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class BaseTicketCommentRequestDTO {

  @NotBlank(message = "Content is required")
  @Size(min = 2, max = 4096, message = "Content must be between 2 and 4096 characters")
  private String content;

  @NotNull(message = "Ticket ID is required")
  private Long ticketId;

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public Long getTicketId() {
    return ticketId;
  }

  public void setTicketId(Long ticketId) {
    this.ticketId = ticketId;
  }

}
