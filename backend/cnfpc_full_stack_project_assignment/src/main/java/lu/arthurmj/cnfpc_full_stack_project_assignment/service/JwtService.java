package lu.arthurmj.cnfpc_full_stack_project_assignment.service;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.User;

@Service
public class JwtService {

  @Value("${jwt.secret}")
  private String secret;

  @Value("${jwt.expiration}")
  private long expiration;

  public String generateToken(User user) {
    Map<String, Object> claims = new HashMap<>();
    claims.put("userId", user.getId());
    claims.put("email", user.getEmail());
    claims.put("roles", user.getRoles());
    return Jwts.builder()
        .claims(claims)
        .subject(user.getEmail())
        .issuedAt(new Date())
        .expiration(new Date(System.currentTimeMillis() + expiration))
        .signWith(getSigningKey())
        .compact();
  }

  public String extractUsername(String token) {
    return extractAllClaims(token).getSubject();
  }

  public Long extractUserId(String token) {
    return extractAllClaims(token).get("userId", Long.class);
  }

  public List<String> extractRoles(String token) {
    return extractAllClaims(token).get("roles", List.class);
  }

  public boolean isTokenValid(String token) {
    try {
      extractAllClaims(token);
      return !isTokenExpired(token);
    } catch (Exception e) {
      return false;
    }
  }

  private boolean isTokenExpired(String token) {
    return extractAllClaims(token).getExpiration().before(new Date());
  }

  private Claims extractAllClaims(String token) {
    return Jwts.parser()
        .verifyWith(getSigningKey())
        .build()
        .parseSignedClaims(token)
        .getPayload();
  }

  private SecretKey getSigningKey() {
    byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
    return Keys.hmacShaKeyFor(keyBytes);
  }
}