package lu.arthurmj.cnfpc_full_stack_project_assignment.config;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SeedDataConfig {

  @Bean
  @ConditionalOnProperty(name = "app.seed-data.sample", havingValue = "true")
  ApplicationRunner seedSampleData() {
    return args -> {
      // todo: add sample data seeding
    };
  }
}
