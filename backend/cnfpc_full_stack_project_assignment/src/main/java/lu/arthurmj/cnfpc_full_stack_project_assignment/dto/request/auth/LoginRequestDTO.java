package lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.auth;

import jakarta.validation.constraints.NotBlank;

public class LoginRequestDTO {

  @NotBlank(message = "Email required")
  private String email;

  @NotBlank(message = "Password required")
  private String password;

  public LoginRequestDTO() {
  }

  public LoginRequestDTO(String email, String password) {
    this.email = email;
    this.password = password;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

}
