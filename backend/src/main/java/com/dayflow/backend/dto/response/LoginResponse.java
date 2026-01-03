package com.dayflow.backend.dto.response;

import com.dayflow.backend.entity.Employee;
import com.dayflow.backend.entity.HrUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private String message;
    private String accessToken;
    private UserInfo user;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserInfo {
        private Long id;
        private String identifier; // email or employeeId
        private String name;
        private String role; // HR or EMPLOYEE
        private String companyName;
        private String companyAvatar; // For HR only
        private String employeeId; // For Employee only
        private String department; // For Employee only
        private String jobPosition; // For Employee only
    }

    // Helper methods to create response
    public static LoginResponse fromHrUser(HrUser hrUser, String token) {
        UserInfo userInfo = new UserInfo();
        userInfo.setId(hrUser.getId());
        userInfo.setIdentifier(hrUser.getEmail());
        userInfo.setName(hrUser.getName());
        userInfo.setRole("HR");
        userInfo.setCompanyName(hrUser.getCompanyName());
        userInfo.setCompanyAvatar(hrUser.getCompanyAvatar());

        return new LoginResponse("Login successful", token, userInfo);
    }

    public static LoginResponse fromEmployee(Employee employee, String token) {
        UserInfo userInfo = new UserInfo();
        userInfo.setId(employee.getId());
        userInfo.setIdentifier(employee.getEmail());
        userInfo.setName(employee.getName());
        userInfo.setRole("EMPLOYEE");
        userInfo.setCompanyName(employee.getCompany());
        userInfo.setCompanyAvatar(employee.getCompanyAvatar());
        userInfo.setEmployeeId(employee.getEmployeeId());
        userInfo.setDepartment(employee.getDepartment());
        userInfo.setJobPosition(employee.getJobPosition());

        return new LoginResponse("Login successful", token, userInfo);
    }
}