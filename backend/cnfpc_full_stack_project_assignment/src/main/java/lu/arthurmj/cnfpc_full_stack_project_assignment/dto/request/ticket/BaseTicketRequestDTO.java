package lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.ticket;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.TicketPriority;

public class BaseTicketRequestDTO {

  @NotBlank(message = "Title is required")
  @Size(min = 2, max = 128, message = "Title must be between 2 and 128 characters")
  private String title;

  @NotBlank(message = "Description is required")
  @Size(min = 2, max = 4096, message = "Description must be between 2 and 4096 characters")
  private String description;

  @NotNull(message = "Invalid Priority.")
  private TicketPriority priority;

  @Future(message = "Due date must be in the future")
  private LocalDateTime dueAt;

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public TicketPriority getPriority() {
    return priority;
  }

  public void setPriority(TicketPriority priority) {
    this.priority = priority;
  }

  public LocalDateTime getDueAt() {
    return dueAt;
  }

  public void setDueAt(LocalDateTime dueAt) {
    this.dueAt = dueAt;
  }

}
