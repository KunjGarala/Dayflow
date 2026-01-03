package com.dayflow.backend.dto.request;

import com.dayflow.backend.enums.LeaveStatus;
import com.dayflow.backend.enums.LeaveType;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public class LeaveRequestDto {
    private Long id;

    @NotNull(message = "Start date is required")
    private LocalDate startDate;

    @NotNull(message = "End date is required")
    private LocalDate endDate;

    @NotNull(message = "Leave type is required")
    private LeaveType leaveType;

    private LeaveStatus status;
    private Double numberOfDays;
    private String attendanceNote;
    private String certificateAttachment;
    private String adminComment;
    private Long employeeId;
    private String employeeName;
    private String approvedRejectedBy;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public LeaveType getLeaveType() { return leaveType; }
    public void setLeaveType(LeaveType leaveType) { this.leaveType = leaveType; }

    public LeaveStatus getStatus() { return status; }
    public void setStatus(LeaveStatus status) { this.status = status; }

    public Double getNumberOfDays() { return numberOfDays; }
    public void setNumberOfDays(Double numberOfDays) { this.numberOfDays = numberOfDays; }

    public String getAttendanceNote() { return attendanceNote; }
    public void setAttendanceNote(String attendanceNote) { this.attendanceNote = attendanceNote; }

    public String getCertificateAttachment() { return certificateAttachment; }
    public void setCertificateAttachment(String certificateAttachment) { this.certificateAttachment = certificateAttachment; }

    public String getAdminComment() { return adminComment; }
    public void setAdminComment(String adminComment) { this.adminComment = adminComment; }

    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }

    public String getEmployeeName() { return employeeName; }
    public void setEmployeeName(String employeeName) { this.employeeName = employeeName; }

    public String getApprovedRejectedBy() { return approvedRejectedBy; }
    public void setApprovedRejectedBy(String approvedRejectedBy) { this.approvedRejectedBy = approvedRejectedBy; }
}