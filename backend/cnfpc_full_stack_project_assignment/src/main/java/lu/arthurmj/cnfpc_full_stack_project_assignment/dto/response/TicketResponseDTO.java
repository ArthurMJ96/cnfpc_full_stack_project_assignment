package lu.arthurmj.cnfpc_full_stack_project_assignment.dto.response;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.TicketPriority;
import lu.arthurmj.cnfpc_full_stack_project_assignment.entity.TicketStatus;

public class TicketResponseDTO {

    private Long id;
    private String title;
    private String description;
    private TicketStatus status;
    private TicketPriority priority;
    private UserResponseDTO author;
    private Set<UserResponseDTO> assignedTo = new HashSet<>();
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime dueAt;
    private int commentCount;
    private Set<TicketCommentResponseDTO> comments = new HashSet<>();

    public TicketResponseDTO(Long id, String title, String description, TicketStatus status,
            TicketPriority priority, LocalDateTime createdAt, LocalDateTime updatedAt,
            LocalDateTime dueAt, UserResponseDTO author, Set<UserResponseDTO> assignedTo,
            int commentCount, Set<TicketCommentResponseDTO> comments) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.dueAt = dueAt;
        this.author = author;
        this.assignedTo = assignedTo;
        this.commentCount = commentCount;
        this.comments = comments;
    }

    public TicketResponseDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public TicketStatus getStatus() {
        return status;
    }

    public void setStatus(TicketStatus status) {
        this.status = status;
    }

    public TicketPriority getPriority() {
        return priority;
    }

    public void setPriority(TicketPriority priority) {
        this.priority = priority;
    }

    public UserResponseDTO getAuthor() {
        return author;
    }

    public void setAuthor(UserResponseDTO author) {
        this.author = author;
    }

    public Set<UserResponseDTO> getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(Set<UserResponseDTO> assignedTo) {
        this.assignedTo = assignedTo;
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

    public LocalDateTime getDueAt() {
        return dueAt;
    }

    public void setDueAt(LocalDateTime dueAt) {
        this.dueAt = dueAt;
    }

    public int getCommentCount() {
        return commentCount;
    }

    public void setCommentCount(int commentCount) {
        this.commentCount = commentCount;
    }

    public Set<TicketCommentResponseDTO> getComments() {
        return comments;
    }

    public void setComments(Set<TicketCommentResponseDTO> comments) {
        this.comments = comments;
    }

}
