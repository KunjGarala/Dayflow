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
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/hr/")
@RequiredArgsConstructor
public class HrController {

    private final HrService hrService;
    private final EmployeeService employeeService;

    @PostMapping(value = "/signup/wfile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<HrSignupResponse> signupWithFile(
            @RequestPart("data") @Valid HrSignupRequest signupRequest,
            @RequestPart(value = "avatar", required = false) MultipartFile avatar,
            HttpServletResponse response) {

        HrSignupResponse signupResponse = hrService.signup(signupRequest, avatar, response);
        return ResponseEntity.status(HttpStatus.CREATED).body(signupResponse);
    }

    @PostMapping(value = "/signup/wofile")
    public ResponseEntity<HrSignupResponse> signupWithoutFile(
            @RequestBody @Valid HrSignupRequest signupRequest,
            HttpServletResponse response) {

        HrSignupResponse signupResponse = hrService.signup(signupRequest, null, response);
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
            @AuthenticationPrincipal String hrId) {
        EmployeeResponse response = employeeService.createEmployee(request, hrId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/employees")
    public ResponseEntity<List<EmployeeResponse>> getEmployees(
            @AuthenticationPrincipal String hrEmail) {

        List<EmployeeResponse> employees = employeeService.getEmployeesByHr(hrEmail);
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