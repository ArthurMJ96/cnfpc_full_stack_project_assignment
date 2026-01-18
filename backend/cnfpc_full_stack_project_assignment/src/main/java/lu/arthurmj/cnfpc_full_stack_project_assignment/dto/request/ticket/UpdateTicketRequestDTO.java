package lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.ticket;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.TicketPriority;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.TicketStatus;

public class UpdateTicketRequestDTO extends BaseTicketRequestDTO {

  @NotNull(message = "ID is required")
  private Long id;

  @NotNull(message = "Status is required")
  @Schema(description = "Status of the ticket", requiredMode = Schema.RequiredMode.REQUIRED)
  private TicketStatus status;

  @NotNull(message = "Invalid Priority.")
  @Schema(description = "Priority of the ticket. Only updatable by admins.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  private TicketPriority priority;

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

  public TicketPriority getPriority() {
    return priority;
  }

  public void setPriority(TicketPriority priority) {
    this.priority = priority;
  }

}
