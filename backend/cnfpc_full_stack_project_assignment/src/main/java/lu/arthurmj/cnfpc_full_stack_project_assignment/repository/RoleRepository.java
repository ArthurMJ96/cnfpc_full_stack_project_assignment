package lu.arthurmj.cnfpc_full_stack_project_assignment.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

  boolean existsByName(String name);

  Optional<Role> findByName(String name);
}
