package lu.arthurmj.cnfpc_full_stack_project_assignment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.response.UserResponseDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getUsers() {
        return ResponseEntity.ok(userService.getAll());
    }

    @GetMapping("/support")
    public ResponseEntity<List<UserResponseDTO>> getSupport() {
        return ResponseEntity.ok(userService.getSupport());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getById(id));
    }

}
