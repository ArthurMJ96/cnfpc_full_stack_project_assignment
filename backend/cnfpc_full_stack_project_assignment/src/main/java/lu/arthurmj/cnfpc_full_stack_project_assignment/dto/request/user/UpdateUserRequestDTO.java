package lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.user;

import java.util.Set;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.Role;

public class UpdateUserRequestDTO {

  @NotNull(message = "User ID is required")
  private Long id;

  @NotBlank(message = "First name is required")
  private String firstname;

  @NotBlank(message = "Last name is required")
  private String lastname;

  @Schema(description = "Job title of the user. Only updatable by admins.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  private String jobTitle;

  @Schema(description = "Roles of the user. Only updatable by admins.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  private Set<Role> roles;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getFirstname() {
    return firstname;
  }

  public void setFirstname(String firstname) {
    this.firstname = firstname;
  }

  public String getLastname() {
    return lastname;
  }

  public void setLastname(String lastname) {
    this.lastname = lastname;
  }

  public String getJobTitle() {
    return jobTitle;
  }

  public void setJobTitle(String jobTitle) {
    this.jobTitle = jobTitle;
  }

  public Set<Role> getRoles() {
    return roles;
  }

  public void setRoles(Set<Role> roles) {
    this.roles = roles;
  }

}
