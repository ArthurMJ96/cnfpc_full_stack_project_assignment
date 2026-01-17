package lu.arthurmj.cnfpc_full_stack_project_assignment.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.error.ErrorResponseDTO;

@ControllerAdvice
public class GlobalExceptionHandler {

  // Handle MethodArgumentNotValidException (Validation) → 400 Bad Request
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ErrorResponseDTO> handleValidationExceptions(
      MethodArgumentNotValidException ex) {

    Map<String, String> errors = new HashMap<>();

    // Extract all field errors
    ex.getBindingResult().getAllErrors().forEach((error) -> {
      String fieldName = ((FieldError) error).getField();
      String errorMessage = error.getDefaultMessage();
      errors.put(fieldName, errorMessage);
    });

    ErrorResponseDTO response = new ErrorResponseDTO(
        HttpStatus.BAD_REQUEST.value(), // 400
        "Validation failed",
        errors);

    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  // Handle IllegalArgumentException → 400 Bad Request
  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<ErrorResponseDTO> handleIllegalArgument(
      IllegalArgumentException ex) {

    ErrorResponseDTO error = new ErrorResponseDTO(
        HttpStatus.BAD_REQUEST.value(), // 400
        ex.getMessage());

    return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
  }

  // Handle invalid credentials → 401 Unauthorized
  @ExceptionHandler(InvalidCredentialsException.class)
  public ResponseEntity<ErrorResponseDTO> handleInvalidCredentials(
      InvalidCredentialsException ex) {
    ErrorResponseDTO response = new ErrorResponseDTO(
        HttpStatus.UNAUTHORIZED.value(), // 401
        ex.getMessage());
    return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
  }

  // Handle ResourceNotFoundException → 404 Not Found
  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<ErrorResponseDTO> handleResourceNotFound(
      ResourceNotFoundException ex) {

    ErrorResponseDTO error = new ErrorResponseDTO(
        HttpStatus.NOT_FOUND.value(), // 404
        ex.getMessage());

    return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
  }

  // Handle DuplicateResourceException → 409 Conflict
  @ExceptionHandler(DuplicateResourceException.class)
  public ResponseEntity<ErrorResponseDTO> handleDuplicateResource(
      DuplicateResourceException ex) {

    ErrorResponseDTO error = new ErrorResponseDTO(
        HttpStatus.CONFLICT.value(), // 409
        ex.getMessage());

    return new ResponseEntity<>(error, HttpStatus.CONFLICT);
  }

  // Handle all other RuntimeExceptions → 500 Internal Server Error
  @ExceptionHandler(RuntimeException.class)
  public ResponseEntity<ErrorResponseDTO> handleRuntimeException(
      RuntimeException ex) {

    ErrorResponseDTO error = new ErrorResponseDTO(
        HttpStatus.INTERNAL_SERVER_ERROR.value(), // 500
        ex.getMessage());

    return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
