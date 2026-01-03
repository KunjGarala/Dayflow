package com.dayflow.backend.service;

import com.dayflow.backend.dto.request.LeaveRequestDto;
import com.dayflow.backend.dto.request.LeaveStatusUpdateDto;
import com.dayflow.backend.entity.Employee;
import com.dayflow.backend.entity.LeaveRequest;
import com.dayflow.backend.enums.LeaveStatus;
import com.dayflow.backend.enums.LeaveType;
import com.dayflow.backend.repository.EmployeeRepository;
import com.dayflow.backend.repository.LeaveRequestRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LeaveRequestService {

    private final LeaveRequestRepository leaveRequestRepository;
    private final EmployeeRepository employeeRepository;
//    private final LeaveBalanceService leaveBalanceService;

    public LeaveRequestService(
            LeaveRequestRepository leaveRequestRepository,
            EmployeeRepository employeeRepository
            ) {
        this.leaveRequestRepository = leaveRequestRepository;
        this.employeeRepository = employeeRepository;
//        this.leaveBalanceService = leaveBaloanceService;
    }

    @Transactional
    public LeaveRequestDto createLeaveRequest(LeaveRequestDto leaveRequestDto, String currentUser) {
        Employee employee = employeeRepository.findById(leaveRequestDto.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        // Check for overlapping approved leaves
        List<LeaveRequest> overlappingLeaves = leaveRequestRepository.findOverlappingLeaves(
                employee.getId(),
                leaveRequestDto.getStartDate(),
                leaveRequestDto.getEndDate()
        );

        if (!overlappingLeaves.isEmpty()) {
            throw new RuntimeException("Overlapping leave request exists");
        }

        // Calculate number of days (excluding weekends)
        double numberOfDays = calculateWorkingDays(
                leaveRequestDto.getStartDate(),
                leaveRequestDto.getEndDate()
        );

        // Create leave request
        LeaveRequest leaveRequest = new LeaveRequest();
        leaveRequest.setEmployee(employee);
        leaveRequest.setStartDate(leaveRequestDto.getStartDate());
        leaveRequest.setEndDate(leaveRequestDto.getEndDate());
        leaveRequest.setLeaveType(leaveRequestDto.getLeaveType());
        leaveRequest.setStatus(LeaveStatus.PENDING);
        leaveRequest.setNumberOfDays(numberOfDays);
        leaveRequest.setAttendanceNote(leaveRequestDto.getAttendanceNote());

        LeaveRequest savedRequest = leaveRequestRepository.save(leaveRequest);
        return convertToDto(savedRequest);
    }

    @Transactional
    public LeaveRequestDto updateLeaveStatus(Long leaveId, LeaveStatusUpdateDto statusUpdateDto, String adminUser) {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave request not found"));

        if (leaveRequest.getStatus() != LeaveStatus.PENDING) {
            throw new RuntimeException("Leave request is not in pending status");
        }

        leaveRequest.setStatus(statusUpdateDto.getStatus());
        leaveRequest.setApprovedRejectedAt(LocalDateTime.now());

        if (statusUpdateDto.getStatus() == LeaveStatus.APPROVED &&
                leaveRequest.getLeaveType() == LeaveType.PAID_TIME_OFF) {
        }

        LeaveRequest updatedRequest = leaveRequestRepository.save(leaveRequest);
        return convertToDto(updatedRequest);
    }

    public Page<LeaveRequestDto> getLeaveRequestsByEmployee(Long employeeId, Pageable pageable) {
        return leaveRequestRepository.findByEmployeeId(employeeId, pageable)
                .map(this::convertToDto);
    }

    public List<LeaveRequestDto> getPendingLeaveRequests() {
        return leaveRequestRepository.findByStatusOrderByCreatedAtAsc(LeaveStatus.PENDING)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Page<LeaveRequestDto> getAllLeaveRequests(Pageable pageable) {
        return leaveRequestRepository.findAllWithEmployee(pageable)
                .map(this::convertToDto);
    }

    public LeaveRequestDto getLeaveRequestById(Long id) {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave request not found"));
        return convertToDto(leaveRequest);
    }

    public List<LeaveRequestDto> getLeaveRequestsByDateRange(LocalDate startDate, LocalDate endDate) {
        return leaveRequestRepository.findByDateRange(startDate, endDate)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Double getUsedLeavesByType(Long employeeId, LeaveType leaveType, int year) {
        return leaveRequestRepository.countApprovedLeavesByTypeAndYear(
                employeeId,
                leaveType.toString(),
                year
        ).doubleValue();
    }

    private double calculateWorkingDays(LocalDate startDate, LocalDate endDate) {
        long days = ChronoUnit.DAYS.between(startDate, endDate) + 1;
        long workingDays = 0;

        for (long i = 0; i < days; i++) {
            LocalDate date = startDate.plusDays(i);
            if (!isWeekend(date)) {
                workingDays++;
            }
        }

        return workingDays;
    }

    private boolean isWeekend(LocalDate date) {
        return date.getDayOfWeek().getValue() > 5; // 6 = Saturday, 7 = Sunday
    }

    private LeaveRequestDto convertToDto(LeaveRequest leaveRequest) {
        LeaveRequestDto dto = new LeaveRequestDto();
        dto.setId(leaveRequest.getId());
        dto.setStartDate(leaveRequest.getStartDate());
        dto.setEndDate(leaveRequest.getEndDate());
        dto.setLeaveType(leaveRequest.getLeaveType());
        dto.setStatus(leaveRequest.getStatus());
        dto.setNumberOfDays(leaveRequest.getNumberOfDays());
        dto.setAttendanceNote(leaveRequest.getAttendanceNote());
        dto.setEmployeeId(leaveRequest.getEmployee().getId());
        return dto;
    }
}