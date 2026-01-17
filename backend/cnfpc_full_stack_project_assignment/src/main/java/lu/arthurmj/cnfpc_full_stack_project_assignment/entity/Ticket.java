package lu.arthurmj.cnfpc_full_stack_project_assignment.entity;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Formula;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "tickets")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    private TicketStatus status = TicketStatus.OPEN;

    @Enumerated(EnumType.STRING)
    private TicketPriority priority = TicketPriority.LOW;

    @ManyToOne
    private User author;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "ticket_assignees", joinColumns = @JoinColumn(name = "ticket_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> assignedTo = new HashSet<>();

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    private LocalDateTime dueAt;

    @Formula("(SELECT COUNT(c.id) FROM ticket_comments c WHERE c.ticket_id = id AND c.deleted = false)")
    private int commentCount;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "ticket")
    private Set<TicketComment> comments = new HashSet<>();

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

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public Set<User> getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(Set<User> assignedTo) {
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

    public Set<TicketComment> getComments() {
        return comments;
    }

    public void setComments(Set<TicketComment> comments) {
        this.comments = comments;
    }

}
