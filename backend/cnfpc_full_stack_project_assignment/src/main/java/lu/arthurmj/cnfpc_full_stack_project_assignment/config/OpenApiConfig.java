package lu.arthurmj.cnfpc_full_stack_project_assignment.config;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.tags.Tag;
import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Comparator;
import java.util.List;

@Configuration
@io.swagger.v3.oas.annotations.security.SecurityScheme(name = "bearerAuth", description = "JWT Authentication - Use the /api/auth/login endpoint to get a token", scheme = "bearer", type = SecuritySchemeType.HTTP, bearerFormat = "JWT", in = SecuritySchemeIn.HEADER)
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("IT Service Desk API")
                        .version("1.0.0")
                        .description(
                                """
                                        ## IT Service Desk API Documentation

                                        A simple ticketing system for reporting bugs and managing support requests.
                                        
                                        ### Core Features
                                        - **Ticket Management**: Create, view, and update support tickets
                                        - **Ticket Lifecycle**: Manage ticket status flow (Open, In Progress, Resolved, Closed)
                                        - **User Management**: Register, authenticate, and manage user profiles
                                        - **AI Integration**: Automatic sentiment analysis for ticket auto-prioritization labeling upon creation
                                        
                                        ### Authentication
                                        All endpoints require JWT authentication. To get started:
                                        1. Register a new account using `/api/auth/register`
                                        2. Login using `/api/auth/login` to receive a JWT token
                                        3. Click the 'Authorize' button and enter your token

                                        ### User Roles
                                        - **AUTHOR**: Create and view their own tickets, and comment on their tickets
                                        - **SUPPORT**: View all tickets, assign tickets to themselves, and provide updates via comments
                                        - **ADMIN**: Full system access including user management
                                        """)
                        .contact(new Contact()
                                .name("IT Details")
                                .email("support@itservicedesk.lu"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")))
                .servers(List.of(
                        new Server()
                                .url("http://localhost:8080")
                                .description("Local Development Server")))
                .components(new Components()
                        .addSecuritySchemes("bearerAuth",
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                                        .description("Enter JWT token obtained from `/api/auth/login`")));
    }

    @Bean
    public OpenApiCustomizer sortTagsAlphabetically() {
        return openApi -> {
            List<Tag> tags = openApi.getTags();
            if (tags != null) {
                // Define the desired order strictly
                List<String> order = List.of("Authentication", "Users", "Tickets");
                tags.sort(Comparator.comparingInt(tag -> {
                    int index = order.indexOf(tag.getName());
                    return index == -1 ? Integer.MAX_VALUE : index;
                }));
            }
        };
    }
}
