package com.dayflow.backend.service;

import com.dayflow.backend.dto.request.LoginRequest;
import com.dayflow.backend.dto.response.LoginResponse;
import com.dayflow.backend.entity.Employee;
import com.dayflow.backend.entity.HrUser;
import com.dayflow.backend.exception.ApiException;
import com.dayflow.backend.repository.EmployeeRepository;
import com.dayflow.backend.repository.HrRepository;
import com.dayflow.backend.util.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final HrRepository hrRepository;
    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Transactional
    public LoginResponse authenticate(LoginRequest loginRequest, HttpServletResponse response) {
        String identifier = loginRequest.getIdentifier().trim();
        String password = loginRequest.getPassword();

        log.info("Login attempt with identifier: {}", identifier);

        // Try HR login first (by email only)
        Optional<HrUser> hrUserOptional = hrRepository.findByEmail(identifier);

        if (hrUserOptional.isPresent()) {
            HrUser hrUser = hrUserOptional.get();

            // Verify password
            if (passwordEncoder.matches(password, hrUser.getPassword())) {
                // Generate JWT token for HR
                String token = jwtUtil.generateToken(
                        hrUser.getEmail(),
                        hrUser.getId(),
                        "ROLE"
                );

                // Set cookie
                setAccessTokenCookie(token, response);

                log.info("HR login successful: {}", hrUser.getEmail());
                return LoginResponse.fromHrUser(hrUser, token);
            } else {
                throw new ApiException("Invalid credentials");
            }
        }

        // Try Employee login (by email OR employeeId)
        Optional<Employee> employeeOptional;

        // Check if identifier looks like an employee ID (alphanumeric, contains letters and numbers)
        if (isValidEmployeeIdFormat(identifier)) {
            employeeOptional = employeeRepository.findByEmployeeId(identifier);
        } else {
            // Assume it's an email for employee
            employeeOptional = employeeRepository.findByEmail(identifier);
        }

        if (employeeOptional.isPresent()) {
            Employee employee = employeeOptional.get();

            // Verify password
            if (passwordEncoder.matches(password, employee.getPassword())) {
                // Generate JWT token for Employee
                String token = jwtUtil.generateToken(
                        employee.getEmail(),
                        employee.getId(),
                        "EMPLOYEE"
                );

                // Set cookie
                setAccessTokenCookie(token, response);

                log.info("Employee login successful: {}", employee.getEmail());
                return LoginResponse.fromEmployee(employee, token);
            } else {
                throw new ApiException("Invalid credentials");
            }
        }

        // If we reach here, no user found
        log.warn("Login failed: No user found with identifier: {}", identifier);
        throw new ApiException("Invalid credentials - User not found");
    }

    public void logout(HttpServletResponse response) {
        // Clear the access token cookie
        Cookie cookie = new Cookie("accessToken", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true); // Use true in production
        cookie.setPath("/");
        cookie.setMaxAge(0); // Expire immediately
        response.addCookie(cookie);
    }

    private void setAccessTokenCookie(String token, HttpServletResponse response) {
        Cookie cookie = new Cookie("accessToken", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true); // Use true in production with HTTPS
        cookie.setPath("/");
        cookie.setMaxAge(24 * 60 * 60); // 24 hours
        response.addCookie(cookie);
    }

    private boolean isValidEmployeeIdFormat(String identifier) {
        // Employee ID format: [A-Z]{2}[A-Z]{2}\d{2}\d{3} (e.g., COJO23001)
        return identifier.matches("^[A-Z]{4}\\d{5}$") ||
                identifier.matches("^[A-Z]{2}[A-Z]{2}\\d{2}\\d{3}$");
    }

    // Additional method to get user by token (for profile, etc.)
    public Object getUserFromToken(String token) {
        String identifier = jwtUtil.extractUsername(token);

        // Try HR first
        Optional<HrUser> hrUser = hrRepository.findByEmail(identifier);
        if (hrUser.isPresent()) {
            return hrUser.get();
        }

        // Try Employee
        Optional<Employee> employee = employeeRepository.findByEmail(identifier);
        return employee.orElseThrow(() -> new ApiException("User not found"));
    }
}