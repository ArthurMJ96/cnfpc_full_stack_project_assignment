package lu.arthurmj.cnfpc_full_stack_project_assignment.dto.response;

import java.util.Set;

import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.Role;

public class AuthResponseDTO extends UserResponseDTO {
    private String token;
    private String type = "Bearer";
    private String email;

    public AuthResponseDTO(
            String token,
            Long userId,
            String email,
            String firstname,
            String lastname,
            String jobTitle,
            Set<Role> roles) {
        super(userId, firstname, lastname, jobTitle, roles);
        this.token = token;
        this.email = email;
    }

    public AuthResponseDTO() {
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}