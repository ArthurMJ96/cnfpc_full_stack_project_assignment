package lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.ticket_comment;

import jakarta.validation.constraints.NotNull;

public class UpdateTicketCommentRequestDTO extends BaseTicketCommentRequestDTO {

  @NotNull(message = "ID is required")
  private Long id;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

}
