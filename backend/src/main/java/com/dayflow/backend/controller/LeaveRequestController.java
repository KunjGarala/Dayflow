package com.dayflow.backend.controller;

import com.dayflow.backend.dto.request.LeaveRequestDto;
import com.dayflow.backend.dto.request.LeaveStatusUpdateDto;
import com.dayflow.backend.enums.LeaveType;
import com.dayflow.backend.service.LeaveRequestService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/leave-requests")
public class LeaveRequestController {

    private final LeaveRequestService leaveRequestService;

    public LeaveRequestController(LeaveRequestService leaveRequestService) {
        this.leaveRequestService = leaveRequestService;
    }

    // Employee endpoints
    @PostMapping
    public ResponseEntity<LeaveRequestDto> createLeaveRequest(
            @Valid @RequestBody LeaveRequestDto leaveRequestDTO,
            @RequestHeader("X-User-Id") Long userId) {

        leaveRequestDTO.setEmployeeId(userId);
        LeaveRequestDto createdRequest = leaveRequestService.createLeaveRequest(leaveRequestDTO, "User");
        return ResponseEntity.ok(createdRequest);
    }

    @GetMapping("/my-leaves")
    public ResponseEntity<Page<LeaveRequestDto>> getMyLeaveRequests(
            @RequestHeader("X-User-Id") Long userId,
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {

        Page<LeaveRequestDto> leaves = leaveRequestService.getLeaveRequestsByEmployee(userId, pageable);
        return ResponseEntity.ok(leaves);
    }

    @GetMapping("/my-leaves/{id}")
    public ResponseEntity<LeaveRequestDto> getMyLeaveRequest(
            @PathVariable Long id,
            @RequestHeader("X-User-Id") Long userId) {

        LeaveRequestDto leaveRequest = leaveRequestService.getLeaveRequestById(id);
        if (!leaveRequest.getEmployeeId().equals(userId)) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(leaveRequest);
    }

    // Admin/HR endpoints
    @PreAuthorize("hasRole('ADMIN') or hasRole('HR')")
    @GetMapping
    public ResponseEntity<Page<LeaveRequestDto>> getAllLeaveRequests(
            @PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {

        Page<LeaveRequestDto> leaves = leaveRequestService.getAllLeaveRequests(pageable);
        return ResponseEntity.ok(leaves);
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('HR')")
    @GetMapping("/pending")
    public ResponseEntity<List<LeaveRequestDto>> getPendingLeaveRequests() {
        List<LeaveRequestDto> pendingLeaves = leaveRequestService.getPendingLeaveRequests();
        return ResponseEntity.ok(pendingLeaves);
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('HR')")
    @GetMapping("/filter")
    public ResponseEntity<List<LeaveRequestDto>> getLeavesByDateRange(
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate) {

        List<LeaveRequestDto> leaves = leaveRequestService.getLeaveRequestsByDateRange(startDate, endDate);
        return ResponseEntity.ok(leaves);
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('HR')")
    @PutMapping("/{id}/status")
    public ResponseEntity<LeaveRequestDto> updateLeaveStatus(
            @PathVariable Long id,
            @Valid @RequestBody LeaveStatusUpdateDto statusUpdateDTO,
            @RequestHeader("X-Admin-User") String adminUser) {

        LeaveRequestDto updatedRequest = leaveRequestService.updateLeaveStatus(id, statusUpdateDTO, adminUser);
        return ResponseEntity.ok(updatedRequest);
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('HR')")
    @GetMapping("/{id}")
    public ResponseEntity<LeaveRequestDto> getLeaveRequest(@PathVariable Long id) {
        LeaveRequestDto leaveRequest = leaveRequestService.getLeaveRequestById(id);
        return ResponseEntity.ok(leaveRequest);
    }

    // Stats endpoint
    @GetMapping("/stats")
    public ResponseEntity<?> getLeaveStats(
            @RequestHeader("X-User-Id") Long userId,
            @RequestParam LeaveType leaveType,
            @RequestParam(defaultValue = "2025") int year) {

        Double usedLeaves = leaveRequestService.getUsedLeavesByType(userId, leaveType, year);
        return ResponseEntity.ok().body(new LeaveStatsResponse(usedLeaves));
    }

    private static class LeaveStatsResponse {
        private final Double usedLeaves;

        public LeaveStatsResponse(Double usedLeaves) {
            this.usedLeaves = usedLeaves;
        }

        public Double getUsedLeaves() {
            return usedLeaves;
        }
    }
}