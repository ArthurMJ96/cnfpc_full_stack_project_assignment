package lu.arthurmj.cnfpc_full_stack_project_assignment.config;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.Role;
import lu.arthurmj.cnfpc_full_stack_project_assignment.repository.RoleRepository;

@Configuration
public class SeedDataConfig {

  @Bean
  @ConditionalOnProperty(name = "app.seed-data.roles", havingValue = "true", matchIfMissing = true)
  ApplicationRunner seedDefaultRoles(RoleRepository roleRepository) {
    return args -> {
      createRole(roleRepository, "ADMIN", "Administrator with full access. Can manage users and roles");
      createRole(roleRepository, "SUPPORT", "Support staff. Can accept and manage tickets from employees");
      createRole(roleRepository, "EMPLOYEE", "Regular employee user. Can create tickets and view own tickets");
    };
  }

  private static void createRole(RoleRepository roleRepository, String name, String description) {
    if (roleRepository.existsByName(name)) {
      return;
    }

    Role role = new Role();
    role.setName(name);
    role.setDescription(description);
    roleRepository.save(role);
  }
}
