package com.dayflow.backend.controller;

import com.dayflow.backend.dto.request.AttendanceFilterRequest;
import com.dayflow.backend.dto.response.AttendanceResponse;
import com.dayflow.backend.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/hr/attendance")
@RequiredArgsConstructor
public class HrAttendanceController {

    private final AttendanceService attendanceService;

    @GetMapping("/employees")
    public ResponseEntity<List<AttendanceResponse>> getEmployeesAttendance(
            @AuthenticationPrincipal Long hrId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) Long employeeId) {

        AttendanceFilterRequest filter = new AttendanceFilterRequest();
        filter.setStartDate(startDate);
        filter.setEndDate(endDate);
        filter.setEmployeeId(employeeId);

        List<AttendanceResponse> response = attendanceService
                .getHrEmployeesAttendance(hrId, filter);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/filter")
    public ResponseEntity<List<AttendanceResponse>> filterAttendance(
            @RequestBody AttendanceFilterRequest filter,
            @AuthenticationPrincipal Long hrId) {

        List<AttendanceResponse> response = attendanceService
                .getHrEmployeesAttendance(hrId, filter);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/summary/{year}/{month}")
    public ResponseEntity<Map<String, Object>> getHrAttendanceSummary(
            @PathVariable Integer year,
            @PathVariable Integer month,
            @AuthenticationPrincipal Long hrId) {

        Map<String, Object> response = attendanceService
                .getHrAttendanceSummary(hrId, year, month);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<AttendanceResponse>> getEmployeeAttendance(
            @PathVariable Long employeeId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @AuthenticationPrincipal Long hrId) {

        AttendanceFilterRequest filter = new AttendanceFilterRequest();
        filter.setStartDate(startDate);
        filter.setEndDate(endDate);
        filter.setEmployeeId(employeeId);

        List<AttendanceResponse> response = attendanceService
                .getHrEmployeesAttendance(hrId, filter);
        return ResponseEntity.ok(response);
    }
}