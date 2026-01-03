package com.dayflow.backend.controller;

import com.dayflow.backend.dto.request.EmployeeCreateRequest;
import com.dayflow.backend.dto.request.HrSignupRequest;
import com.dayflow.backend.dto.response.EmployeeResponse;
import com.dayflow.backend.dto.response.HrSignupResponse;
import com.dayflow.backend.dto.response.HrResponse;
import com.dayflow.backend.service.EmployeeService;
import com.dayflow.backend.service.HrService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hr/")
@RequiredArgsConstructor
public class HrController {

    private final HrService hrService;
    private final EmployeeService employeeService;

    @PostMapping("/signup")
    public ResponseEntity<HrSignupResponse> signup(
            @Valid @RequestBody HrSignupRequest signupRequest,
            HttpServletResponse response) {

        HrSignupResponse signupResponse = hrService.signup(signupRequest, response);
        return ResponseEntity.status(HttpStatus.CREATED).body(signupResponse);
    }

    @GetMapping("/profile")
    public ResponseEntity<HrResponse> getProfile(
            @AuthenticationPrincipal Long hrId) {

        HrResponse hrResponse = hrService.getHrProfile(hrId);
        return ResponseEntity.ok(hrResponse);
    }

    @PostMapping("/employees")
    public ResponseEntity<EmployeeResponse> createEmployee(
            @Valid @RequestBody EmployeeCreateRequest request,
            @AuthenticationPrincipal Long hrId) {

        EmployeeResponse response = employeeService.createEmployee(request, hrId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/employees")
    public ResponseEntity<List<EmployeeResponse>> getEmployees(
            @AuthenticationPrincipal Long hrId) {

        List<EmployeeResponse> employees = employeeService.getEmployeesByHr(hrId);
        return ResponseEntity.ok(employees);
    }

    @GetMapping("/employees/{employeeId}")
    public ResponseEntity<EmployeeResponse> getEmployee(
            @PathVariable Long employeeId,
            @AuthenticationPrincipal Long hrId) {

        EmployeeResponse employee = employeeService.getEmployeeById(employeeId, hrId);
        return ResponseEntity.ok(employee);
    }

    @GetMapping("/employees/company/all")
    public ResponseEntity<List<EmployeeResponse>> getAllCompanyEmployees(
            @AuthenticationPrincipal Long hrId) {

        List<EmployeeResponse> employees = employeeService.getAllEmployeesByCompany(hrId);
        return ResponseEntity.ok(employees);
    }
}