package lu.arthurmj.cnfpc_full_stack_project_assignment.dto.error;

import java.time.LocalDateTime;
import java.util.Map;

public class ErrorResponseDTO {

    private int status;
    private String message;
    private LocalDateTime timestamp;
    private Map<String, String> errors;

    public ErrorResponseDTO(int status, String message) {
        this.status = status;
        this.message = message;
        this.timestamp = LocalDateTime.now();
    }

    public ErrorResponseDTO(int status, String message, Map<String, String> errors) {
        this.status = status;
        this.message = message;
        this.timestamp = LocalDateTime.now();
        this.errors = errors;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public Map<String, String> getErrors() {
        return errors;
    }

    public void setErrors(Map<String, String> errors) {
        this.errors = errors;
    }

}
