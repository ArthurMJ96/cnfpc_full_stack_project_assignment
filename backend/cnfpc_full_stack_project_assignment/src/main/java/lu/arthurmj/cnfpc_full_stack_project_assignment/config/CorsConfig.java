package lu.arthurmj.cnfpc_full_stack_project_assignment.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig {
        @Value("${FRONTEND_URL:http://localhost:5173}")
        private String frontendUrl;

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();
                // Allowed origins
                configuration.setAllowedOrigins(Arrays.asList(
                                frontendUrl,
                                "http://192.168.76.124:5173",
                                "http://localhost:5173",
                                "http://localhost:3000"));
                // Allowed HTTP methods
                configuration.setAllowedMethods(Arrays.asList(
                                "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
                // Allowed headers
                configuration.setAllowedHeaders(Arrays.asList(
                                "Authorization",
                                "Content-Type",
                                "Accept",
                                "Origin",
                                "X-Requested-With"));
                // Expose headers to frontend
                configuration.setExposedHeaders(List.of("Authorization"));
                // Allow credentials (cookies, authorization headers)
                configuration.setAllowCredentials(true);
                // Cache preflight response for 1 hour
                configuration.setMaxAge(3600L);
                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                return source;
        }
}