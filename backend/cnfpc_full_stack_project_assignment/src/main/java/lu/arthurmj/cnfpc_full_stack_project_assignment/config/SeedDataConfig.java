package lu.arthurmj.cnfpc_full_stack_project_assignment.config;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.Role;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.Ticket;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.TicketComment;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.TicketPriority;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.User;
import lu.arthurmj.cnfpc_full_stack_project_assignment.repository.TicketCommentRepository;
import lu.arthurmj.cnfpc_full_stack_project_assignment.repository.TicketRepository;
import lu.arthurmj.cnfpc_full_stack_project_assignment.repository.UserRepository;

@Configuration
public class SeedDataConfig {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private TicketRepository ticketRepository;

  @Autowired
  private TicketCommentRepository ticketCommentRepository;
  @Autowired
  private PasswordEncoder passwordEncoder;

  @Bean
  @ConditionalOnProperty(name = "app.seed-data.sample", havingValue = "true")
  ApplicationRunner seedSampleData() {
    return args -> {
      // check if data already exists
      if (userRepository.count() > 0 || ticketRepository.count() > 0) {
        return;
      }
      // Add admin
      User admin = addUser("admin@admin.com", "admin@admin.com", "Badmin", "Sleeper", "IT Specialist",
          Set.of(Role.ADMIN, Role.SUPPORT, Role.AUTHOR));

      // Users that handle tickets
      User sUser1 = addSupportUser("engi1@engi1.com", "engi1@engi1.com", "John", "Code", "10x Developer");
      User sUser2 = addSupportUser("engi2@engi2.com", "engi2@engi2.com", "Jane", "Doe", "Senior Developer");
      User sUser3 = addSupportUser("engi3@engi3.com", "engi3@engi3.com", "Jim", "Beam", "Junior Developer");
      User sUser4 = addSupportUser("engi4@engi4.com", "engi4@engi4.com", "Jack", "Smith", "Noob Developer (Nepo hire)");

      // CTO user with support and employee roles
      addUser("cto@cto.com", "cto@cto.com", "James", "Jones", "CTO", Set.of(Role.SUPPORT, Role.AUTHOR));

      // Regular employee users that make tickets
      User ceo = addEmployeeUser("ceo@ceo.com", "ceo@ceo.com", "Jim", "Smith", "CEO");
      User accountant = addEmployeeUser("accountant@accountant.com", "accountant@accountant.com", "Jessica", "Jones",
          "Accountant");
      User cfo = addEmployeeUser("cfo@cfo.com", "cfo@cfo.com", "Catherine", "Tax Evans", "CFO");
      User hr = addEmployeeUser("hr@hr.com", "hr@hr.com", "Hannah", "Reed", "HR Recruiter");

      // Add tickets
      Ticket t1 = addTicketFromUser(ceo, "Cannot access VPN", "I am unable to connect to the company VPN from home.",
          TicketPriority.HIGH,
          Set.of(sUser1, sUser2));
      Ticket t2 = addTicketFromUser(accountant, "Software installation request",
          "Requesting installation of accounting software on my workstation.", TicketPriority.MEDIUM, Set.of(sUser3));
      Ticket t3 = addTicketFromUser(hr, "Email not syncing", "My work email is not syncing on my mobile device.",
          TicketPriority.LOW, Set.of(sUser4));
      Ticket t4 = addTicketFromUser(ceo, "Computer won't turn on",
          "My computer is not powering up when I press the power button.", TicketPriority.HIGH,
          Set.of(sUser1));
      Ticket t5 = addTicketFromUser(accountant, "Forgot password",
          "I forgot my system login password and need a reset.", TicketPriority.MEDIUM);
      Ticket t6 = addTicketFromUser(cfo, "Printer jam", "The office printer is jammed again. Please assist.",
          TicketPriority.HIGH);
      addTicketFromUser(ceo, "Request for new monitor",
          "My current monitor is outdated. Requesting a new 16K monitor for better productivity.",
          TicketPriority.URGENT);

      // Add comments to tickets
      addCommentToTicket(t1, sUser1, "Hello, I will look into your VPN issue.");
      addCommentToTicket(t1, ceo, "Thank you, let me know if you need any more info.");
      addCommentToTicket(t2, sUser3, "Accounting software installation scheduled for tomorrow.");
      addCommentToTicket(t3, sUser4, "Please try removing and re-adding your email account on your device.");
      addCommentToTicket(t4, sUser1, "Is the power cable securely connected?");
      addCommentToTicket(t5, admin, "Your password has been reset. Please check your email for the new password.");
      addCommentToTicket(t6, sUser2, "I will be there in 5 minutes to fix the printer jam.");
      addCommentToTicket(t6, accountant, "Thanks! The printer is in the main office room.");

    };
  }

  // #region Helper methods to add users with roles
  private User addUser(
      String email,
      String password,
      String firstname,
      String lastname,
      String jobTitle,
      Set<Role> roles) {
    if (userRepository.existsByEmail(email)) {
      return null;
    }

    User user = new User();
    user.setEmail(email);
    user.setPassword(passwordEncoder.encode(password));
    user.setFirstname(firstname);
    user.setLastname(lastname);
    user.setJobTitle(jobTitle);
    user.setRoles(roles);

    return userRepository.save(user);
  }

  private User addSupportUser(
      String email,
      String password,
      String firstname,
      String lastname,
      String jobTitle) {
    return addUser(email, password, firstname, lastname, jobTitle, Set.of(Role.SUPPORT));
  }

  private User addEmployeeUser(
      String email,
      String password,
      String firstname,
      String lastname,
      String jobTitle) {
    return addUser(email, password, firstname, lastname, jobTitle, Set.of(Role.AUTHOR));
  }
  // #endregion

  // #region Helper methods to add tickets
  private Ticket addTicketFromUser(
      User author,
      String title,
      String description,
      TicketPriority priority,
      Set<User> assignedUsers) {
    if (author == null) {
      return null;
    }
    Ticket ticket = new Ticket();
    ticket.setTitle(title);
    ticket.setDescription(description);
    ticket.setAuthor(author);
    ticket.setPriority(priority);
    // filter assignedUsers to not include nulls
    ticket.setAssignedTo(assignedUsers.stream().filter(u -> u != null).collect(Collectors.toSet()));
    return ticketRepository.save(ticket);
  }

  // create ticket without assigned users
  private Ticket addTicketFromUser(User author, String title, String description, TicketPriority priority) {
    return addTicketFromUser(author, title, description, priority, Set.of());
  }
  // #endregion

  // #region Helper methods to add ticket comments
  private void addCommentToTicket(Ticket ticket, User author, String content) {
    if (ticket == null || author == null) {
      return;
    }
    TicketComment comment = new TicketComment();
    comment.setTicket(ticket);
    comment.setAuthor(author);
    comment.setContent(content);
    ticketCommentRepository.save(comment);
  }
  // #endregion
}
