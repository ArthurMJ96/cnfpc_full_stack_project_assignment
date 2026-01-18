package lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RegisterRequestDTO {

  @NotBlank(message = "Email is required")
  @Email(message = "Email must be valid")
  private String email;

  @NotBlank(message = "Password is required")
  @Size(min = 8, message = "Password must be at least 8 characters")
  private String password;

  @NotBlank(message = "Password confirmation is required")
  private String passwordConfirm;

  @NotBlank(message = "First name is required")
  private String firstname;

  @NotBlank(message = "Last name is required")
  private String lastname;

  @NotBlank(message = "Job title is required")
  private String jobTitle;

  public RegisterRequestDTO(
      String email,
      String password,
      String passwordConfirm,
      String firstname,
      String lastname,
      String jobTitle) {
    this.email = email;
    this.password = password;
    this.passwordConfirm = passwordConfirm;
    this.firstname = firstname;
    this.lastname = lastname;
    this.jobTitle = jobTitle;
  }

  public RegisterRequestDTO() {
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

  public String getPasswordConfirm() {
    return passwordConfirm;
  }

  public void setPasswordConfirm(String passwordConfirm) {
    this.passwordConfirm = passwordConfirm;
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

}
