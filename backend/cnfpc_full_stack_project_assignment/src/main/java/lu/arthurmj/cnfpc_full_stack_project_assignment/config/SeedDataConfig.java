package lu.arthurmj.cnfpc_full_stack_project_assignment.config;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.Role;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.User;
import lu.arthurmj.cnfpc_full_stack_project_assignment.repository.UserRepository;

@Configuration
public class SeedDataConfig {

  @Autowired
  private UserRepository userRepository;

  // @Autowired
  // private PasswordEncoder passwordEncoder;

  @Bean
  @ConditionalOnProperty(name = "app.seed-data.sample", havingValue = "true")
  ApplicationRunner seedSampleData() {
    return args -> {
      // Add admin
      addUser("admin@admin.com", "admin@admin.com", "Admin", "User", "IT Specialist",
          Set.of(Role.ADMIN, Role.SUPPORT, Role.EMPLOYEE));

      addSupportUser("engi1@engi1.com", "engi1@engi1.com", "John", "Code", "10x Developer");
      addSupportUser("engi2@engi2.com", "engi2@engi2.com", "Jane", "Doe", "Senior Developer");
      addSupportUser("engi3@engi3.com", "engi3@engi3.com", "Jim", "Beam", "Junior Developer");
      addSupportUser("engi4@engi4.com", "engi4@engi4.com", "Jack", "Smith", "Noob Developer (Nepo hire)");
      addUser("cto@cto.com", "cto@cto.com", "James", "Jones", "CTO", Set.of(Role.SUPPORT, Role.EMPLOYEE));

      addEmployeeUser("ceo@ceo.com", "ceo@ceo.com", "Jim", "Smith", "CEO");
      addEmployeeUser("accountant@accountant.com", "accountant@accountant.com", "Jessica", "Jones", "Accountant");
      addEmployeeUser("cfo@cfo.com", "cfo@cfo.com", "Catherine", "Tax Evans", "CFO");
    };
  }

  public void addUser(
      String email,
      String password,
      String firstname,
      String lastname,
      String jobTitle,
      Set<Role> roles) {
    if (userRepository.existsByEmail(email)) {
      return;
    }

    User user = new User();
    user.setEmail(email);
    user.setPassword(password);
    user.setFirstname(firstname);
    user.setLastname(lastname);
    user.setJobTitle(jobTitle);
    user.setRoles(roles);

    userRepository.save(user);
    // Implementation to add user if not exists
  }

  public void addSupportUser(
      String email,
      String password,
      String firstname,
      String lastname,
      String jobTitle) {
    addUser(email, password, firstname, lastname, jobTitle, Set.of(Role.SUPPORT));
  }

  public void addEmployeeUser(
      String email,
      String password,
      String firstname,
      String lastname,
      String jobTitle) {
    addUser(email, password, firstname, lastname, jobTitle, Set.of(Role.EMPLOYEE));
  }

}
