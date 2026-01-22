package lu.arthurmj.cnfpc_full_stack_project_assignment.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.user.CreateUserRequestDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.user.UpdatePasswordRequestDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.user.UpdateUserRequestDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.response.UserResponseDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.response.UserStatsResponseDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.Role;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.TicketStatus;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.User;
import lu.arthurmj.cnfpc_full_stack_project_assignment.exception.DuplicateResourceException;
import lu.arthurmj.cnfpc_full_stack_project_assignment.exception.ForbiddenException;
import lu.arthurmj.cnfpc_full_stack_project_assignment.exception.ResourceNotFoundException;
import lu.arthurmj.cnfpc_full_stack_project_assignment.mapper.UserMapper;
import lu.arthurmj.cnfpc_full_stack_project_assignment.repository.TicketCommentRepository;
import lu.arthurmj.cnfpc_full_stack_project_assignment.repository.TicketRepository;
import lu.arthurmj.cnfpc_full_stack_project_assignment.repository.UserRepository;
import lu.arthurmj.cnfpc_full_stack_project_assignment.security.UserPrincipal;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private TicketCommentRepository ticketCommentRepository;

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

    /**
     * Updates an existing user's profile. <br>
     * A user can only update their own profile, unless the requester is an
     * ADMIN. <br>
     * Only an ADMIN can update sensitive fields like 'roles' and 'jobTitle'.
     */
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

    /**
     * Creates a new user. <br>
     * Only an ADMIN can create new users.
     */
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

    public void updatePassword(UpdatePasswordRequestDTO dto) {
        // Must be the user himself
        if (!UserPrincipal.getCurrentUserId().equals(dto.getId())) {
            throw new ForbiddenException(UserPrincipal.getCurrentUserId(), "update this user's password");
        }

        User user = userRepository.findById(dto.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", dto.getId()));

        if (!passwordEncoder.matches(dto.getCurrentPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Current password does not match");
        }

        if (!dto.getNewPassword().equals(dto.getNewPasswordConfirm())) {
            throw new IllegalArgumentException("New passwords do not match");
        }

        user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        userRepository.save(user);
    }

    public UserStatsResponseDTO getUserStats(Long userId) {
        long assigned = ticketRepository.countByAssignedTo_Id(userId);
        long resolved = ticketRepository.countByAssignedTo_IdAndStatus(userId, TicketStatus.RESOLVED);
        long created = ticketRepository.countByAuthor_Id(userId);
        long comments = ticketCommentRepository.countByAuthor_Id(userId);

        return new UserStatsResponseDTO(assigned, resolved, created, comments);
    }
}
