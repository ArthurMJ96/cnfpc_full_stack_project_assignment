package lu.arthurmj.cnfpc_full_stack_project_assignment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.User;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.Role;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);

    User findByEmail(String email);

    List<User> findByRoles(Role role);
}