package lu.arthurmj.cnfpc_full_stack_project_assignment.dto.response;

public class UserStatsResponseDTO {
    private long assignedTickets;
    private long resolvedAssignedTickets;
    private long createdTickets;
    private long totalComments;

    public UserStatsResponseDTO(long assignedTickets, long resolvedAssignedTickets, long createdTickets,
            long totalComments) {
        this.assignedTickets = assignedTickets;
        this.resolvedAssignedTickets = resolvedAssignedTickets;
        this.createdTickets = createdTickets;
        this.totalComments = totalComments;
    }

    public long getAssignedTickets() {
        return assignedTickets;
    }

    public void setAssignedTickets(long assignedTickets) {
        this.assignedTickets = assignedTickets;
    }

    public long getResolvedAssignedTickets() {
        return resolvedAssignedTickets;
    }

    public void setResolvedAssignedTickets(long resolvedAssignedTickets) {
        this.resolvedAssignedTickets = resolvedAssignedTickets;
    }

    public long getCreatedTickets() {
        return createdTickets;
    }

    public void setCreatedTickets(long createdTickets) {
        this.createdTickets = createdTickets;
    }

    public long getTotalComments() {
        return totalComments;
    }

    public void setTotalComments(long totalComments) {
        this.totalComments = totalComments;
    }
}
