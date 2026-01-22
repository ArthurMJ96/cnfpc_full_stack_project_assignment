package lu.arthurmj.cnfpc_full_stack_project_assignment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.user.CreateUserRequestDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.user.UpdatePasswordRequestDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.user.UpdateUserRequestDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.response.UserResponseDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.service.UserService;

@RestController
@RequestMapping("/api/users")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Users", description = "Manage users and their profiles")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get all users", description = "Retrieve a list of all registered users. Access restricted to ADMIN role.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List of users retrieved successfully", content = @Content(schema = @Schema(implementation = UserResponseDTO.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden - Insufficient permissions", content = @Content)
    })
    public ResponseEntity<List<UserResponseDTO>> getUsers() {
        return ResponseEntity.ok(userService.getAll());
    }

    @GetMapping("/support")
    @Operation(summary = "Get support users", description = "Retrieve a list of users with SUPPORT role.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List of support users retrieved successfully", content = @Content(schema = @Schema(implementation = UserResponseDTO.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content)
    })
    public ResponseEntity<List<UserResponseDTO>> getSupport() {
        return ResponseEntity.ok(userService.getSupport());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get user by ID", description = "Retrieve user details by their unique identifier.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User found", content = @Content(schema = @Schema(implementation = UserResponseDTO.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content),
            @ApiResponse(responseCode = "404", description = "User not found", content = @Content)
    })
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getById(id));
    }

    @PutMapping
    @Operation(summary = "Update user profile", description = "Update details of a specific user. Access restricted to the user themselves or ADMIN role.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User updated successfully", content = @Content(schema = @Schema(implementation = UserResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input data", content = @Content),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content),
            @ApiResponse(responseCode = "404", description = "User not found", content = @Content)
    })
    public ResponseEntity<UserResponseDTO> updateUser(@Valid @RequestBody UpdateUserRequestDTO dto) {
        return ResponseEntity.ok(userService.update(dto));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a new user", description = "Create a new user account manually. Access restricted to ADMIN role.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User created successfully", content = @Content(schema = @Schema(implementation = UserResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input data", content = @Content),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden - Insufficient permissions", content = @Content)
    })
    public ResponseEntity<UserResponseDTO> createUser(@Valid @RequestBody CreateUserRequestDTO dto) {
        return ResponseEntity.ok(userService.create(dto));
    }

    @PutMapping("/{id}/password")
    @Operation(summary = "Update user password", description = "Update the password of a specific user. Access restricted to the user themselves.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Password updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input or current password mismatch", content = @Content),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content),
            @ApiResponse(responseCode = "404", description = "User not found", content = @Content)
    })
    public ResponseEntity<Void> updatePassword(@PathVariable Long id,
            @Valid @RequestBody UpdatePasswordRequestDTO dto) {
        if (!id.equals(dto.getId())) {
            throw new IllegalArgumentException("Path ID and Request Body ID must match");
        }
        userService.updatePassword(dto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/stats")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get user statistics", description = "Get statistics for a specific user. Access restricted to ADMIN.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User statistics found"),
            @ApiResponse(responseCode = "404", description = "User not found", content = @Content)
    })
    public ResponseEntity<lu.arthurmj.cnfpc_full_stack_project_assignment.dto.response.UserStatsResponseDTO> getUserStats(
            @PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserStats(id));
    }

}
