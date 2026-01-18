package lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.user;

import java.util.Set;

import jakarta.validation.constraints.NotNull;
import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.auth.RegisterRequestDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.Role;

public class CreateUserRequestDTO extends RegisterRequestDTO {

  @NotNull(message = "Roles are required")
  private Set<Role> roles;

  public CreateUserRequestDTO(
      String email,
      String password,
      String passwordConfirm,
      String firstname,
      String lastname,
      String jobTitle,
      Set<Role> roles) {
    super(email, password, passwordConfirm, firstname, lastname, jobTitle);
    this.roles = roles;
  }

  public CreateUserRequestDTO() {
    super();
  }

  public Set<Role> getRoles() {
    return roles;
  }

  public void setRoles(Set<Role> roles) {
    this.roles = roles;
  }

}
