package lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.ticket_comment;

import jakarta.validation.constraints.NotNull;

public class CreateTicketCommentRequestDTO extends BaseTicketCommentRequestDTO {

  @NotNull(message = "Author ID is required")
  private Long authorId;

  public Long getAuthorId() {
    return authorId;
  }

  public void setAuthorId(Long authorId) {
    this.authorId = authorId;
  }

}
