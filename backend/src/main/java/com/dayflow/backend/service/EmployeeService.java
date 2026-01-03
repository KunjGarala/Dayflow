package com.dayflow.backend.service;

import com.dayflow.backend.dto.request.EmployeeCreateRequest;
import com.dayflow.backend.dto.response.EmployeeResponse;
import com.dayflow.backend.entity.Employee;
import com.dayflow.backend.entity.HrUser;
import com.dayflow.backend.exception.ApiException;
import com.dayflow.backend.mapper.EmployeeMapper;
import com.dayflow.backend.repository.EmployeeRepository;
import com.dayflow.backend.repository.HrRepository;
import com.dayflow.backend.util.EmployeeIdGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Year;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final HrRepository hrRepository;
    private final EmployeeMapper employeeMapper;
    private final EmployeeIdGenerator employeeIdGenerator;

    @Transactional
    public EmployeeResponse createEmployee(EmployeeCreateRequest request, String hrId) {

        String idid = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        System.out.println(idid);
        // Fetch HR who is creating the employee
        HrUser hrUser = hrRepository.findByEmail(idid)
                .orElseThrow(() -> new ApiException("HR user not found"));

        // Check if email already exists
        if (employeeRepository.existsByEmail(request.getEmail())) {
            throw new ApiException("Email already registered");
        }

        // Check if mobile already exists
        if (employeeRepository.existsByMobile(request.getMobile())) {
            throw new ApiException("Mobile number already registered");
        }

        // Map request to entity
        Employee employee = employeeMapper.toEntity(request);

        employee.setCompany(hrUser.getCompanyName());
        employee.setCompanyAvatar(hrUser.getCompanyAvatar());
        employee.setCreatedBy(hrUser);
        employee.setFirstName(request.getFirstName());
        employee.setLastName(request.getLastName());

        // Generate employee ID
        String employeeId = employeeIdGenerator.generateEmployeeId(
                hrUser.getCompanyName(),
                request.getFirstName(),
                Year.now().getValue()
        );
        employee.setEmployeeId(employeeId);

        // Save employee
        Employee savedEmployee = employeeRepository.save(employee);

        return employeeMapper.toResponse(savedEmployee);
    }

    public List<EmployeeResponse> getEmployeesByHr(Long hrId) {
        HrUser hrUser = hrRepository.findById(hrId)
                .orElseThrow(() -> new ApiException("HR user not found"));

        List<Employee> employees = employeeRepository.findByCreatedBy(hrUser);

        return employees.stream()
                .map(employeeMapper::toResponse)
                .collect(Collectors.toList());
    }

    public EmployeeResponse getEmployeeById(Long employeeId, Long hrId) {
        HrUser hrUser = hrRepository.findById(hrId)
                .orElseThrow(() -> new ApiException("HR user not found"));

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ApiException("Employee not found"));

        // Verify HR owns this employee
        if (!employee.getCreatedBy().getId().equals(hrId)) {
            throw new ApiException("You don't have permission to access this employee");
        }

        return employeeMapper.toResponse(employee);
    }

    public List<EmployeeResponse> getAllEmployeesByCompany(Long hrId) {
        HrUser hrUser = hrRepository.findById(hrId)
                .orElseThrow(() -> new ApiException("HR user not found"));

        // Get all employees for the company
        List<Employee> employees = employeeRepository.findByCreatedBy(hrUser);

        return employees.stream()
                .map(employeeMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}