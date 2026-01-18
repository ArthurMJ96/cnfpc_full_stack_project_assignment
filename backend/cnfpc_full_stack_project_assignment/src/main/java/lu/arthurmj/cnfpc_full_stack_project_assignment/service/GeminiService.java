package lu.arthurmj.cnfpc_full_stack_project_assignment.service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import jakarta.annotation.PostConstruct;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.Ticket;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.TicketPriority;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.User;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentConfig;
import com.google.genai.types.GenerateContentResponse;

/**
 * Service to get ticket priority via Google Gemini AI.
 * If Gemini AI is disabled or not properly configured via application
 * properties, defaults to MEDIUM priority.
 */
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

  @SuppressWarnings("unused")
  private final String PROMMPT_TEMPLATE = "Analyze the sentiment of the following ticket author(fullname, job title), title and description and respond with the appropriate Priority ("
      + generatePriorityEnumString() + ") :\n"
      + "%s\n%s\n%s";

  private final String PROMMPT_TEMPLATE_2 = """
      Analyze this ticket report and determine the sentiment and priority.

      TICKET DETAILS:
      Author: %s %s
      Job Title: %s
      Subject: %s
      Description: %s

      GUIDELINES:
      1. Determine the sentiment (e.g., Angry, Frustrated, Polite, Urgent).
      2. Assign a Priority from: %s.
      3. If the user sounds angry or very frustrated, the priority should be at least HIGH.
      4. Consider the impact of the author's role. High-level leadership roles (CEOs, Founders, Directors) often indicate critical business impact and should be treated with URGENT priority.""";

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

  /**
   * Get ticket priority analysis from Gemini AI.
   * 
   * @param ticket TicketResponseDTO containing ticket details.
   * @return TicketPriority as String or MEDIUM if Gemini is disabled.
   */
  public SentimentResponse getTicketSentiment(Ticket ticket) {
    User author = ticket.getAuthor();

    String prompt = String.format(PROMMPT_TEMPLATE_2,
        author.getFirstname(), author.getLastname(),
        author.getJobTitle(),
        ticket.getTitle(),
        ticket.getDescription(),
        generatePriorityEnumString());

    System.out.println("Sending prompt to Gemini: " + prompt);

    SentimentResponse defaultResponse = new SentimentResponse();
    defaultResponse.setDetectedPriority(TicketPriority.MEDIUM);
    defaultResponse.setSentiment("Neutral");

    if (!enabled || client == null) {
      return defaultResponse;
    }

    GenerateContentConfig config = GenerateContentConfig.builder()
        .responseMimeType("application/json")
        .candidateCount(1)
        .responseJsonSchema(RESPONSE_SCHEMA)
        .build();

    GenerateContentResponse response = client.models.generateContent(model, prompt, config);

    try {
      String responseText = response.text();
      System.out.println("Received Gemini response: " + responseText);
      JsonNode root = objectMapper.readTree(responseText);
      if (root.has("detectedPriority")) {
        SentimentResponse sentimentResponse = new SentimentResponse();
        sentimentResponse.setDetectedPriority(TicketPriority.valueOf(root.get("detectedPriority").asText()));
        sentimentResponse.setSentiment(root.get("sentiment").asText());
        return sentimentResponse;
      }
    } catch (Exception e) {
      System.err.println("Error parsing Gemini response: " + e.getMessage());
    }

    return defaultResponse;
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
    sentiment.put("description", "A short string describing the emotional tone.");

    Map<String, Object> detectedPriority = new HashMap<>();
    detectedPriority.put("type", "string");
    detectedPriority.put("enum", Arrays.asList(generatePriorityEnumArray()));
    detectedPriority.put("description", "One of: " + generatePriorityEnumString());

    properties.put("sentiment", sentiment);
    properties.put("detectedPriority", detectedPriority);

    schema.put("properties", properties);
    schema.put("required", Arrays.asList("sentiment", "detectedPriority"));

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

  public class SentimentResponse {

    private String sentiment;
    private TicketPriority detectedPriority;

    public String getSentiment() {
      return sentiment;
    }

    public void setSentiment(String sentiment) {
      this.sentiment = sentiment;
    }

    public TicketPriority getDetectedPriority() {
      return detectedPriority;
    }

    public void setDetectedPriority(TicketPriority detectedPriority) {
      this.detectedPriority = detectedPriority;
    }
  }
}
