package lu.arthurmj.cnfpc_full_stack_project_assignment.service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import jakarta.annotation.PostConstruct;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.TicketPriority;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentConfig;
import com.google.genai.types.GenerateContentResponse;

@Service
public class GeminiService {
  private Client client;

  private ObjectMapper objectMapper = new ObjectMapper();

  @Value("${gemini.enabled}")
  private boolean enabled;

  @Value("${gemini.api.key}")
  private String apiKey;

  @Value("${gemini.api.model}")
  private String model;

  private static final Map<String, Object> RESPONSE_SCHEMA = createResponseSchema();

  private final String PROMMPT_TEMPLATE = "Analyze the sentiment of the following ticket title and description and respond with the appropriate Priority ("
      + generatePriorityEnumString() + ") :\n"
      + "%s\n%s";

  public GeminiService() {
  }

  // Initialize Gemini client after properties are set
  @PostConstruct
  public void init() {
    if (enabled && apiKey != null && !apiKey.isEmpty() && model != null && !model.isEmpty()) {
      this.client = Client.builder().apiKey(apiKey).build();
      System.out.println("GeminiService initialized with model: " + model);
    }
  }

  public String getTicketSentiment(String title, String description) {
    if (!enabled || client == null) {
      return TicketPriority.MEDIUM.name();
    }

    String prompt = String.format(PROMMPT_TEMPLATE, title, description);

    // System.out.println("Sending prompt to Gemini: " + prompt);

    GenerateContentConfig config = GenerateContentConfig.builder()
        .responseMimeType("application/json")
        .candidateCount(1)
        .responseJsonSchema(RESPONSE_SCHEMA)
        .build();

    GenerateContentResponse response = client.models.generateContent(model, prompt, config);

    try {
      JsonNode root = objectMapper.readTree(response.text());
      if (root.has("sentiment")) {
        return root.get("sentiment").asText();
      }
    } catch (Exception e) {
      System.err.println("Error parsing Gemini response: " + e.getMessage());
    }

    return TicketPriority.MEDIUM.name();
  }

  public boolean isEnabled() {
    return enabled;
  }

  // Create response schema for Gemini response validation
  private static Map<String, Object> createResponseSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");

    Map<String, Object> properties = new HashMap<>();

    Map<String, Object> sentiment = new HashMap<>();
    sentiment.put("type", "string");
    sentiment.put("enum", Arrays.asList(generatePriorityEnumArray()));

    Map<String, Object> confidence = new HashMap<>();
    confidence.put("type", "number");

    properties.put("sentiment", sentiment);
    properties.put("confidence", confidence);

    schema.put("properties", properties);
    schema.put("required", Arrays.asList("sentiment"));

    return schema;
  }

  // Generate priority string based on the enum TicketPriority
  private static String generatePriorityEnumString() {
    StringBuilder sb = new StringBuilder();
    for (TicketPriority priority : TicketPriority.values()) {
      sb.append(priority.name()).append(", ");
    }
    // Remove last comma and space
    if (sb.length() > 2) {
      sb.setLength(sb.length() - 2);
    }
    return sb.toString();
  }

  // Generate priority array list based on the enum TicketPriority
  private static String[] generatePriorityEnumArray() {
    return Arrays.stream(TicketPriority.values()).map(Enum::name).toArray(String[]::new);
  }

}
