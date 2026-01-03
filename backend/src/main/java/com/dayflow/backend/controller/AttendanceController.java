package com.dayflow.backend.controller;

import com.dayflow.backend.dto.response.AdminAttendanceResponse;
import com.dayflow.backend.exception.ApiException;
import com.dayflow.backend.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    @GetMapping("/admin")
    @PreAuthorize("hasAnyRole('HR', 'ADMIN')")
    public ResponseEntity<AdminAttendanceResponse> getAdminAttendanceReport(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @AuthenticationPrincipal String hrId) {

        if (date == null) {
            throw new ApiException("Date parameter is required");
        }

        Long hrIdLong;
        try {
            hrIdLong = Long.parseLong(hrId);
        } catch (NumberFormatException e) {
            throw new ApiException("Invalid HR ID");
        }

        AdminAttendanceResponse response = attendanceService.getAdminAttendanceReport(date, hrIdLong);
        return ResponseEntity.ok(response);
    }
}
