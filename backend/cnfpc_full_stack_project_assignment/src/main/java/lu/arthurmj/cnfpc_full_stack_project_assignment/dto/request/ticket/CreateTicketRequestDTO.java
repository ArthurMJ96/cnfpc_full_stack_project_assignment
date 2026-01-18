package lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.ticket;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

public class CreateTicketRequestDTO extends BaseTicketRequestDTO {

  @NotNull(message = "Author ID is required")
  @Schema(description = "ID of the author creating the ticket", requiredMode = Schema.RequiredMode.REQUIRED)
  private Long authorId;

  public Long getAuthorId() {
    return authorId;
  }

  public void setAuthorId(Long authorId) {
    this.authorId = authorId;
  }

}
