package lu.arthurmj.cnfpc_full_stack_project_assignment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.auth.LoginRequestDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.auth.RegisterRequestDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.response.AuthResponseDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "Public endpoints for user registration and login")
public class AuthController {

  @Autowired
  private AuthService authService;

  @PostMapping("/login")
  @Operation(summary = "Login to get JWT token and basic user information", description = "Authenticate with email and password to receive a JWT token for accessing protected endpoints.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Login successful", content = @Content(schema = @Schema(implementation = AuthResponseDTO.class))),
      @ApiResponse(responseCode = "400", description = "Invalid input - validation errors", content = @Content),
      @ApiResponse(responseCode = "401", description = "Invalid credentials - wrong username or password", content = @Content)
  })
  public ResponseEntity<AuthResponseDTO> login(@RequestBody @Valid LoginRequestDTO dto) {
    return ResponseEntity.ok(authService.login(dto));
  }

  @PostMapping("/register")
  @Operation(summary = "Register a new user", description = "Create a new user account. No authentication required. Returns a JWT token and basic user information upon successful registration.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "201", description = "User successfully registered", content = @Content(schema = @Schema(implementation = AuthResponseDTO.class))),
      @ApiResponse(responseCode = "400", description = "Invalid input - validation errors or duplicate username/email", content = @Content)
  })
  public ResponseEntity<AuthResponseDTO> register(@RequestBody @Valid RegisterRequestDTO dto) {
    return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(dto));
  }
}
