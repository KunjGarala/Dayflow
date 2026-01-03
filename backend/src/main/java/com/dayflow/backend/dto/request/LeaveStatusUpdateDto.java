package com.dayflow.backend.dto.request;


import com.dayflow.backend.enums.LeaveStatus;
import jakarta.validation.constraints.NotNull;

public class LeaveStatusUpdateDto {

    @NotNull(message = "Status is required")
    private LeaveStatus status;

    private String adminComment;

    public LeaveStatus getStatus() { return status; }
    public void setStatus(LeaveStatus status) { this.status = status; }

    public String getAdminComment() { return adminComment; }
    public void setAdminComment(String adminComment) { this.adminComment = adminComment; }
}