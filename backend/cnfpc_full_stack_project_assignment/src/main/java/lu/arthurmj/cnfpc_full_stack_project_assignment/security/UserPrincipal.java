package lu.arthurmj.cnfpc_full_stack_project_assignment.security;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.Role;

public class UserPrincipal {

  // Check if user is authenticated
  public static boolean isAuthenticated() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    return authentication != null && authentication.isAuthenticated();
  }

  // Get current authenticated user ID
  public static Long getCurrentUserId() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication == null || !authentication.isAuthenticated()) {
      return null;
    }
    return (Long) authentication.getPrincipal();
  }

  // Get current user roles
  public static List<String> getCurrentUserRoles() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication == null || !authentication.isAuthenticated()) {
      return Collections.emptyList();
    }
    return authentication.getAuthorities().stream()
        .map(authority -> authority.getAuthority().replace("ROLE_", ""))
        .collect(Collectors.toList());
  }

  // Check if user has a specific role
  public static boolean hasRole(Role role) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication == null || !authentication.isAuthenticated()) {
      return false;
    }
    return authentication.getAuthorities().stream()
        .anyMatch(authority -> authority.getAuthority().equals("ROLE_" + role));
  }

  public static boolean isAdmin() {
    return hasRole(Role.ADMIN);
  }

  public static boolean isSupport() {
    return hasRole(Role.SUPPORT);
  }

  public static boolean isAuthor() {
    return hasRole(Role.AUTHOR);
  }

}
