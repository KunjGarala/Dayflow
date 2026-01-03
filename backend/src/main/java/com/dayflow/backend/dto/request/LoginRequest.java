package com.dayflow.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {

    @NotBlank(message = "Identifier is required (email or employee ID)")
    private String identifier; // Can be email or employeeId

    @NotBlank(message = "Password is required")
    private String password;
}