package lu.arthurmj.cnfpc_full_stack_project_assignment.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lu.arthurmj.cnfpc_full_stack_project_assignment.service.JwtService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  @Autowired
  private JwtService jwtService;

  @Override
  protected void doFilterInternal(
      HttpServletRequest request,
      HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {

    String authHeader = request.getHeader("Authorization");

    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      // No token provided - continue without authentication
      filterChain.doFilter(request, response);
      return;
    }

    // Validate token and set authentication
    try {
      String token = authHeader.substring(7);
      if (jwtService.isTokenValid(token)) {
        Long userId = jwtService.extractUserId(token);
        List<String> roles = jwtService.extractRoles(token);

        // Convert roles to SimpleGrantedAuthority list
        List<SimpleGrantedAuthority> authorities;
        if (roles == null) {
          authorities = Collections.emptyList();
        } else {
          authorities = roles.stream()
              .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
              .collect(Collectors.toList());
        }

        // Set authentication in security context
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
            userId,
            null,
            authorities);
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authentication);
      }
    } catch (Exception e) {
      logger.error("JWT validation failed: " + e.getMessage());
    }

    filterChain.doFilter(request, response);
  }
}