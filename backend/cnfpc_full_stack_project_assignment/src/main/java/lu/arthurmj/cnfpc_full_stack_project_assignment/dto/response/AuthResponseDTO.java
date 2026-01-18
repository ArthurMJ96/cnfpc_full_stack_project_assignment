package lu.arthurmj.cnfpc_full_stack_project_assignment.dto.response;

import java.util.Set;

import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.Role;

public class AuthResponseDTO {
    private String token;
    private String type = "Bearer";
    private Long userId;
    private String email;
    private Set<Role> roles;

    public AuthResponseDTO(String token, Long userId, String email, Set<Role> roles) {
        this.token = token;
        this.userId = userId;
        this.email = email;
        this.roles = roles;
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

}