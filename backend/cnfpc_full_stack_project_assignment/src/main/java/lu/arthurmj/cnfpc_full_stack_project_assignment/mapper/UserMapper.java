package lu.arthurmj.cnfpc_full_stack_project_assignment.mapper;

import java.util.List;
import java.util.stream.Collectors;

import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.response.UserResponseDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.User;

public class UserMapper {
    public static UserResponseDTO toResponse(User user) {
        if (user == null) {
            return null;
        }
        UserResponseDTO dto = new UserResponseDTO();
        dto.setId(user.getId());
        dto.setFirstname(user.getFirstname());
        dto.setLastname(user.getLastname());
        dto.setJobTitle(user.getJobTitle());
        dto.setRoles(user.getRoles());
        return dto;
    }

    public static User toEntity(UserResponseDTO dto) {
        if (dto == null) {
            return null;
        }
        User user = new User();
        user.setId(dto.getId());
        user.setFirstname(dto.getFirstname());
        user.setLastname(dto.getLastname());
        user.setJobTitle(dto.getJobTitle());
        user.setRoles(dto.getRoles());
        return user;
    }

    public static List<UserResponseDTO> toResponseList(List<User> users) {
        if (users == null) {
            return null;
        }
        return users.stream()
                .map(UserMapper::toResponse)
                .collect(Collectors.toList());
    }

}
