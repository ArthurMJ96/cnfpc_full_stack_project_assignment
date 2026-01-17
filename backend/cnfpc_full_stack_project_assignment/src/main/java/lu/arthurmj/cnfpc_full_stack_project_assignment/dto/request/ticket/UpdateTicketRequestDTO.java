package lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.ticket;

import jakarta.validation.constraints.NotNull;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.TicketStatus;

public class UpdateTicketRequestDTO extends BaseTicketRequestDTO {

  @NotNull(message = "ID is required")
  private Long id;

  @NotNull(message = "Status is required")
  private TicketStatus status;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public TicketStatus getStatus() {
    return status;
  }

  public void setStatus(TicketStatus status) {
    this.status = status;
  }

}
