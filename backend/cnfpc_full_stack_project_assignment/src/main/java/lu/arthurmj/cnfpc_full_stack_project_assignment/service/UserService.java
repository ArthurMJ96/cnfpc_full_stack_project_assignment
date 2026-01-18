package lu.arthurmj.cnfpc_full_stack_project_assignment.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.user.CreateUserRequestDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.user.UpdateUserRequestDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.response.UserResponseDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.Role;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.User;
import lu.arthurmj.cnfpc_full_stack_project_assignment.exception.DuplicateResourceException;
import lu.arthurmj.cnfpc_full_stack_project_assignment.exception.ForbiddenException;
import lu.arthurmj.cnfpc_full_stack_project_assignment.exception.ResourceNotFoundException;
import lu.arthurmj.cnfpc_full_stack_project_assignment.mapper.UserMapper;
import lu.arthurmj.cnfpc_full_stack_project_assignment.repository.UserRepository;
import lu.arthurmj.cnfpc_full_stack_project_assignment.security.UserPrincipal;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<UserResponseDTO> getAll() {
        return UserMapper.toResponseList(userRepository.findAll());
    }

    public UserResponseDTO getById(Long id) {
        return UserMapper.toResponse(userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", id)));
    }

    public List<UserResponseDTO> getSupport() {
        return UserMapper.toResponseList(userRepository.findByRoles(Role.SUPPORT));
    }

    public UserResponseDTO update(UpdateUserRequestDTO dto) {
        // Must be the user himself or an ADMIN to update the user
        if (!UserPrincipal.getCurrentUserId().equals(dto.getId()) && !UserPrincipal.isAdmin()) {
            throw new ForbiddenException(UserPrincipal.getCurrentUserId(), "update this user");
        }

        User user = userRepository.findById(dto.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", dto.getId()));

        // Check if roles are being updated, and only allow if ADMIN
        if (dto.getRoles() != null && !UserPrincipal.isAdmin() && !user.getRoles().equals(dto.getRoles())) {
            throw new ForbiddenException(UserPrincipal.getCurrentUserId(), "update user roles");
        }

        // Check if job title is being updated, and only allow if ADMIN
        if (dto.getJobTitle() != null && !UserPrincipal.isAdmin() && !user.getJobTitle().equals(dto.getJobTitle())) {
            throw new ForbiddenException(UserPrincipal.getCurrentUserId(), "update user job title");
        }

        user.setFirstname(dto.getFirstname());
        user.setLastname(dto.getLastname());
        // Optional fields only updatable by ADMIN
        if (UserPrincipal.isAdmin()) {
            if (dto.getJobTitle() != null) {
                user.setJobTitle(dto.getJobTitle());
            }
            if (dto.getRoles() != null) {
                user.setRoles(dto.getRoles());
            }
        }

        return UserMapper.toResponse(userRepository.save(user));
    }

    public UserResponseDTO create(CreateUserRequestDTO dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new DuplicateResourceException("User", "Email", dto.getEmail());
        }

        if (!dto.getPassword().equals(dto.getPasswordConfirm())) {
            throw new IllegalArgumentException("Passwords do not match");
        }

        User user = UserMapper.toEntity(dto);
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        return UserMapper.toResponse(userRepository.save(user));
    }
}
