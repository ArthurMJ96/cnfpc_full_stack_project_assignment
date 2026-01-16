package lu.arthurmj.cnfpc_full_stack_project_assignment.dto.response;

public class TicketCommentResponseDTO {

    private Long id;
    private String content;
    private UserResponseDTO author;
    private Long ticketId;

    public TicketCommentResponseDTO(Long id, String content, UserResponseDTO author, Long ticketId) {
        this.id = id;
        this.content = content;
        this.author = author;
        this.ticketId = ticketId;
    }

    public TicketCommentResponseDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public UserResponseDTO getAuthor() {
        return author;
    }

    public void setAuthor(UserResponseDTO author) {
        this.author = author;
    }

    public Long getTicketId() {
        return ticketId;
    }

    public void setTicketId(Long ticketId) {
        this.ticketId = ticketId;
    }

}
