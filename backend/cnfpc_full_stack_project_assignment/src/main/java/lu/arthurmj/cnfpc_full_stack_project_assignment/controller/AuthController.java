package lu.arthurmj.cnfpc_full_stack_project_assignment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.auth.LoginRequestDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.auth.RegisterRequestDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.response.AuthResponseDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired
  private AuthService authService;

  @PostMapping("/login")
  public ResponseEntity<AuthResponseDTO> login(@RequestBody @Valid LoginRequestDTO dto) {
    return ResponseEntity.ok(authService.login(dto));
  }

  @PostMapping("/register")
  public ResponseEntity<AuthResponseDTO> register(@RequestBody @Valid RegisterRequestDTO dto) {
    return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(dto));
  }
}
