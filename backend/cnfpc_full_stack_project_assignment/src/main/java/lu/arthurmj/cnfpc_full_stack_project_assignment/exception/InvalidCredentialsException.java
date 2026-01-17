package lu.arthurmj.cnfpc_full_stack_project_assignment.exception;

public class InvalidCredentialsException extends RuntimeException {
  public InvalidCredentialsException() {
    super("Invalid username or password");
  }
}
