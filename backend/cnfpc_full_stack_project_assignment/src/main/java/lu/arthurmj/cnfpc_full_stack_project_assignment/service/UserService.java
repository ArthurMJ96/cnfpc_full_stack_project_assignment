package lu.arthurmj.cnfpc_full_stack_project_assignment.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lu.arthurmj.cnfpc_full_stack_project_assignment.dto.response.UserResponseDTO;
import lu.arthurmj.cnfpc_full_stack_project_assignment.exception.ResourceNotFoundException;
import lu.arthurmj.cnfpc_full_stack_project_assignment.mapper.UserMapper;
import lu.arthurmj.cnfpc_full_stack_project_assignment.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<UserResponseDTO> getAll() {
        return UserMapper.toResponseList(userRepository.findAll());
    }

    public UserResponseDTO getById(Long id) {
        return UserMapper
                .toResponse(userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", id)));
    }
}
