package com.dayflow.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeResponse {
    private Long id;
    private String employeeId;
    private String firstName;
    private String lastName;
    private String fullName; // Computed field for convenience
    private String jobPosition;
    private String email;
    private String mobile;
    private String company;
    private String companyAvatar;
    private String department;
    private String manager;
    private String location;
    private Integer yearOfJoining;
    private String createdByHrName;
    private String createdByHrEmail;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}