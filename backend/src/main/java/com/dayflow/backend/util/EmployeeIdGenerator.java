package com.dayflow.backend.util;

import com.dayflow.backend.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Year;

@Service
@RequiredArgsConstructor
public class EmployeeIdGenerator {

    private final EmployeeRepository employeeRepository;

    public String generateEmployeeId(String companyName, String employeeName, int yearOfJoining) {
        // Extract first 2 letters of company (uppercase)
        String companyCode = extractFirstTwoLetters(companyName).toUpperCase();

        // Extract first 2 letters of employee name (uppercase)
        String nameCode = extractFirstTwoLetters(employeeName).toUpperCase();

        // Get year (last 2 digits)
        String yearCode = String.valueOf(yearOfJoining).substring(2);

        // Generate serial number
        String serialNumber = generateSerialNumber(companyCode, nameCode, yearCode);

        // Format: COJN23001
        return companyCode + nameCode + yearCode + serialNumber;
    }

    private String extractFirstTwoLetters(String input) {
        if (input == null || input.trim().isEmpty()) {
            return "XX";
        }

        // Remove spaces and special characters, take first 2 letters
        String cleaned = input.replaceAll("[^a-zA-Z]", "");
        if (cleaned.length() >= 2) {
            return cleaned.substring(0, 2);
        } else if (cleaned.length() == 1) {
            return cleaned + "X";
        } else {
            return "XX";
        }
    }

    private String generateSerialNumber(String companyCode, String nameCode, String yearCode) {
        String pattern = companyCode + nameCode + yearCode + "%";

        // Find the last employee ID with this pattern
        String lastEmployeeId = employeeRepository.findLastEmployeeIdByPattern(pattern)
                .orElse(null);

        if (lastEmployeeId == null) {
            // First employee with this pattern
            return "001";
        }

        try {
            // Extract serial number part (last 3 digits)
            String serialStr = lastEmployeeId.substring(lastEmployeeId.length() - 3);
            int serial = Integer.parseInt(serialStr);

            // Increment and format with leading zeros
            return String.format("%03d", serial + 1);
        } catch (Exception e) {
            // Fallback if parsing fails
            return "001";
        }
    }
}