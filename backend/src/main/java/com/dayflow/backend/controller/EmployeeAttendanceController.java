package com.dayflow.backend.controller;

import com.dayflow.backend.dto.request.CheckInRequest;
import com.dayflow.backend.dto.request.CheckoutRequest;
import com.dayflow.backend.dto.response.AttendanceResponse;
import com.dayflow.backend.service.AttendanceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/employee/attendance")
@RequiredArgsConstructor
public class EmployeeAttendanceController {

    private final AttendanceService attendanceService;

    @PostMapping("/check-in")
    public ResponseEntity<AttendanceResponse> checkIn(
            @Valid @RequestBody CheckInRequest request,
            @AuthenticationPrincipal Long employeeId) {

        AttendanceResponse response = attendanceService.checkIn(employeeId, request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/check-out")
    public ResponseEntity<AttendanceResponse> checkOut(
            @Valid @RequestBody CheckoutRequest request,
            @AuthenticationPrincipal Long employeeId) {

        AttendanceResponse response = attendanceService.checkOut(employeeId, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/today")
    public ResponseEntity<AttendanceResponse> getTodayAttendance(
            @AuthenticationPrincipal Long employeeId) {

        AttendanceResponse response = attendanceService.getTodayAttendance(employeeId);
        return response != null ? ResponseEntity.ok(response) : ResponseEntity.noContent().build();
    }

    @GetMapping("/current-month")
    public ResponseEntity<List<AttendanceResponse>> getCurrentMonthAttendance(
            @AuthenticationPrincipal Long employeeId) {

        LocalDate now = LocalDate.now();
        List<AttendanceResponse> response = attendanceService
                .getEmployeeMonthlyAttendance(employeeId, now.getYear(), now.getMonthValue());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/monthly/{year}/{month}")
    public ResponseEntity<List<AttendanceResponse>> getMonthlyAttendance(
            @PathVariable Integer year,
            @PathVariable Integer month,
            @AuthenticationPrincipal Long employeeId) {

        List<AttendanceResponse> response = attendanceService
                .getEmployeeMonthlyAttendance(employeeId, year, month);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/summary/{year}/{month}")
    public ResponseEntity<Map<String, Object>> getAttendanceSummary(
            @PathVariable Integer year,
            @PathVariable Integer month,
            @AuthenticationPrincipal Long employeeId) {

        Map<String, Object> response = attendanceService
                .getAttendanceSummary(employeeId, year, month);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/can-check-in")
    public ResponseEntity<Map<String, Boolean>> canCheckIn(
            @AuthenticationPrincipal Long employeeId) {

        boolean canCheckIn = attendanceService.canCheckIn(employeeId);
        return ResponseEntity.ok(Map.of("canCheckIn", canCheckIn));
    }
}