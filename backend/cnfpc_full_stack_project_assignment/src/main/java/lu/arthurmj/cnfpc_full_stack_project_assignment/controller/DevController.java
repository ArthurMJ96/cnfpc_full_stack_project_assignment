package lu.arthurmj.cnfpc_full_stack_project_assignment.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DevController {

  @GetMapping("/dev")
  public Map<String, Object> helloDev() {
    return Map.of(
        "test", "json",
        "response", 123);
  }
}
