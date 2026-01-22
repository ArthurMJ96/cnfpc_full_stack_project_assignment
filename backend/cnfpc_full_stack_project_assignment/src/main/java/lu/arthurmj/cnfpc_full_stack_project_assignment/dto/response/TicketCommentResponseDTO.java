package lu.arthurmj.cnfpc_full_stack_project_assignment.dto.response;

import java.time.LocalDateTime;

import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.TicketCommentType;

public class TicketCommentResponseDTO {

    private Long id;
    private Long ticketId;
    private boolean edited;
    private boolean deleted;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private UserResponseDTO author;
    private TicketCommentType type;

    public TicketCommentResponseDTO(Long id, Long ticketId, boolean edited, boolean deleted, String content,
            LocalDateTime createdAt, LocalDateTime updatedAt, UserResponseDTO author, TicketCommentType type) {
        this.id = id;
        this.ticketId = ticketId;
        this.edited = edited;
        this.deleted = deleted;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.author = author;
        this.type = type;
    }

    public TicketCommentResponseDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTicketId() {
        return ticketId;
    }

    public void setTicketId(Long ticketId) {
        this.ticketId = ticketId;
    }

    public boolean isEdited() {
        return edited;
    }

    public void setEdited(boolean edited) {
        this.edited = edited;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public UserResponseDTO getAuthor() {
        return author;
    }

    public void setAuthor(UserResponseDTO author) {
        this.author = author;
    }

    public TicketCommentType getType() {
        return type;
    }

    public void setType(TicketCommentType type) {
        this.type = type;
    }

}
