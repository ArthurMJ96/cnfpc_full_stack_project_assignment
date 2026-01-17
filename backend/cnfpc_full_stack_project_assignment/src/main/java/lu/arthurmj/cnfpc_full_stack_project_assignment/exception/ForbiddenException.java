package lu.arthurmj.cnfpc_full_stack_project_assignment.exception;

public class ForbiddenException extends RuntimeException {

  public ForbiddenException(Long id, String action) {
    super(String.format("User with ID %d does not have authorization to %s.", id, action));

  }
}
