package lu.arthurmj.cnfpc_full_stack_project_assignment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.auth.LoginRequestDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.request.auth.RegisterRequestDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.response.AuthResponseDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.Role;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.User;
import lu.arthurmj.cnfpc_full_stack_project_assignment.exception.DuplicateResourceException;
import lu.arthurmj.cnfpc_full_stack_project_assignment.exception.InvalidCredentialsException;
import lu.arthurmj.cnfpc_full_stack_project_assignment.repository.UserRepository;

@Service
public class AuthService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private JwtService jwtService;

  public AuthResponseDTO login(LoginRequestDTO dto) {
    User user = userRepository.findByEmail(dto.getEmail()).orElseThrow(() -> new InvalidCredentialsException());
    if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
      throw new InvalidCredentialsException();
    }

    String token = jwtService.generateToken(user);
    return new AuthResponseDTO(token,
        user.getId(),
        user.getEmail(),
        user.getFirstname(),
        user.getLastname(),
        user.getJobTitle(),
        user.getRoles());
  }

  public AuthResponseDTO register(RegisterRequestDTO dto) {
    if (userRepository.existsByEmail(dto.getEmail())) {
      throw new DuplicateResourceException("User", "Email", dto.getEmail());
    }

    if (!dto.getPassword().equals(dto.getPasswordConfirm())) {
      throw new IllegalArgumentException("Passwords do not match");
    }

    User newUser = new User();
    newUser.setEmail(dto.getEmail());
    newUser.setPassword(passwordEncoder.encode(dto.getPassword()));
    newUser.setFirstname(dto.getFirstname());
    newUser.setLastname(dto.getLastname());
    newUser.setJobTitle(dto.getJobTitle());
    newUser.getRoles().add(Role.AUTHOR);

    User savedUser = userRepository.save(newUser);
    String token = jwtService.generateToken(savedUser);
    return new AuthResponseDTO(
        token,
        savedUser.getId(),
        savedUser.getEmail(),
        savedUser.getFirstname(),
        savedUser.getLastname(),
        savedUser.getJobTitle(),
        savedUser.getRoles());
  }
}
