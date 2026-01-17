package lu.arthurmj.cnfpc_full_stack_project_assignment.dto.response;

import java.util.Set;

import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.Role;

public class UserResponseDTO {
    private Long id;
    private String firstname;
    private String lastname;
    private String jobTitle;
    private Set<Role> roles;

    public UserResponseDTO(Long id, String firstname, String lastname, String jobTitle, Set<Role> roles) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.jobTitle = jobTitle;
        this.roles = roles;
    }

    public UserResponseDTO() {
    }

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
