package lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request;

import jakarta.validation.constraints.NotNull;

public class CreateTicketRequestDTO extends BaseTicketRequestDTO {

  @NotNull(message = "Author ID is required")
  private Long authorId;

  public CreateTicketRequestDTO() {
    super();
  }

  public Long getAuthorId() {
    return authorId;
  }

  public void setAuthorId(Long authorId) {
    this.authorId = authorId;
  }

}
