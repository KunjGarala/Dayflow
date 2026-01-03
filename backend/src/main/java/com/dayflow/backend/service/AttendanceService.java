package com.dayflow.backend.service;

import com.dayflow.backend.dto.request.AttendanceFilterRequest;
import com.dayflow.backend.dto.request.CheckInRequest;
import com.dayflow.backend.dto.request.CheckoutRequest;
import com.dayflow.backend.dto.response.AttendanceResponse;
import com.dayflow.backend.entity.Attendance;
import com.dayflow.backend.entity.Employee;
import com.dayflow.backend.exception.ApiException;
import com.dayflow.backend.mapper.AttendanceMapper;
import com.dayflow.backend.repository.AttendanceRepository;
import com.dayflow.backend.repository.EmployeeRepository;
import com.dayflow.backend.repository.HrRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.*;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final EmployeeRepository employeeRepository;
    private final HrRepository hrRepository;
    private final AttendanceMapper attendanceMapper;

    @Transactional
    public AttendanceResponse checkIn(Long employeeId, CheckInRequest request) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ApiException("Employee not found"));

        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();

        // Check if already checked in today
        attendanceRepository.findByEmployeeAndAttendanceDate(employee, today)
                .ifPresent(attendance -> {
                    throw new ApiException("Already checked in today");
                });

        // Create attendance record
        Attendance attendance = Attendance.builder()
                .employee(employee)
                .attendanceDate(today)
                .checkInTime(now)
                .build();

        Attendance savedAttendance = attendanceRepository.save(attendance);
        log.info("Employee {} checked in at {}", employee.getFirstName(), now);

        return attendanceMapper.toResponse(savedAttendance);
    }

    @Transactional
    public AttendanceResponse checkOut(Long employeeId, CheckoutRequest request) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ApiException("Employee not found"));

        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();

        // Get today's attendance
        Attendance attendance = attendanceRepository.findByEmployeeAndAttendanceDate(employee, today)
                .orElseThrow(() -> new ApiException("You haven't checked in today"));

        // Check if already checked out
        if (attendance.getCheckOutTime() != null) {
            throw new ApiException("Already checked out today");
        }

        // Check if trying to checkout before check-in time
        if (now.isBefore(attendance.getCheckInTime())) {
            throw new ApiException("Check-out time cannot be before check-in time");
        }

        // Set check-out time
        attendance.setCheckOutTime(now);

        Attendance updatedAttendance = attendanceRepository.save(attendance);
        log.info("Employee {} checked out at {}", employee.getFirstName(), now);

        return attendanceMapper.toResponse(updatedAttendance);
    }

    @Transactional(readOnly = true)
    public AttendanceResponse getTodayAttendance(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ApiException("Employee not found"));

        LocalDate today = LocalDate.now();

        return attendanceRepository.findByEmployeeAndAttendanceDate(employee, today)
                .map(attendanceMapper::toResponse)
                .orElse(null);
    }

    @Transactional(readOnly = true)
    public List<AttendanceResponse> getEmployeeMonthlyAttendance(Long employeeId, Integer year, Integer month) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ApiException("Employee not found"));

        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

        List<Attendance> attendances = attendanceRepository
                .findByEmployeeAndAttendanceDateBetween(employee, startDate, endDate);

        return attendances.stream()
                .map(attendanceMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<AttendanceResponse> getHrEmployeesAttendance(Long hrId, AttendanceFilterRequest filter) {
        // Verify HR exists
        hrRepository.findById(hrId)
                .orElseThrow(() -> new ApiException("HR not found"));

        // Set default dates if not provided (current day)
        LocalDate startDate = filter.getStartDate() != null ? filter.getStartDate() : LocalDate.now();
        LocalDate endDate = filter.getEndDate() != null ? filter.getEndDate() : LocalDate.now();

        // Validate date range
        if (startDate.isAfter(endDate)) {
            throw new ApiException("Start date cannot be after end date");
        }

        List<Attendance> attendances;

        if (filter.getEmployeeId() != null) {
            // Filter by specific employee
            attendances = attendanceRepository.findByHrIdAndEmployeeAndDateRange(
                    hrId, filter.getEmployeeId(), startDate, endDate);
        } else {
            // All employees under this HR
            attendances = attendanceRepository.findByHrIdAndDateRange(hrId, startDate, endDate);
        }

        return attendances.stream()
                .map(attendanceMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getAttendanceSummary(Long employeeId, Integer year, Integer month) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ApiException("Employee not found"));

        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

        List<Attendance> attendances = attendanceRepository
                .findByEmployeeAndAttendanceDateBetween(employee, startDate, endDate);

        // Calculate statistics
        long totalDays = attendances.size();
        long presentDays = attendances.stream()
                .filter(a -> a.getCheckInTime() != null)
                .count();
        long checkedOutDays = attendances.stream()
                .filter(a -> a.getCheckOutTime() != null)
                .count();

        double totalHours = attendances.stream()
                .mapToDouble(Attendance::getTotalHours)
                .sum();

        double avgHoursPerDay = totalDays > 0 ? totalHours / totalDays : 0;

        Map<String, Object> summary = new HashMap<>();
        summary.put("totalDays", totalDays);
        summary.put("presentDays", presentDays);
        summary.put("absentDays", totalDays - presentDays);
        summary.put("checkedOutDays", checkedOutDays);
        summary.put("totalHours", totalHours);
        summary.put("avgHoursPerDay", avgHoursPerDay);
        summary.put("employeeName", employee.getFirstName());
        summary.put("employeeCode", employee.getEmployeeId());
        summary.put("month", Month.of(month).name());
        summary.put("year", year);

        return summary;
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getHrAttendanceSummary(Long hrId, Integer year, Integer month) {
        // Verify HR exists
        hrRepository.findById(hrId)
                .orElseThrow(() -> new ApiException("HR not found"));

        List<Object[]> monthlyData = attendanceRepository.getMonthlySummary(hrId, year, month);

        Map<String, Object> summary = new HashMap<>();
        summary.put("hrId", hrId);
        summary.put("month", Month.of(month).name());
        summary.put("year", year);
        summary.put("totalRecords", monthlyData.size());
        summary.put("monthlyData", monthlyData);

        return summary;
    }

    // Auto-checkout at 8 PM for those who forgot
    @Scheduled(cron = "0 0 20 * * ?") // Daily at 8 PM
    @Transactional
    public void autoCheckout() {
        LocalDate today = LocalDate.now();

        // Get all attendances from today without checkout
        List<Attendance> attendances = attendanceRepository.findAll().stream()
                .filter(a -> a.getAttendanceDate().equals(today))
                .filter(a -> a.getCheckOutTime() == null)
                .collect(Collectors.toList());

        LocalTime checkoutTime = LocalTime.of(20, 0); // 8 PM

        for (Attendance attendance : attendances) {
            attendance.setCheckOutTime(checkoutTime);
            attendanceRepository.save(attendance);
            log.info("Auto-checkout for employee: {} at {}",
                    attendance.getEmployee().getFirstName(), checkoutTime);
        }
    }

    // Check if employee can check in (not on weekends)
    public boolean canCheckIn(Long employeeId) {
        LocalDate today = LocalDate.now();
        DayOfWeek dayOfWeek = today.getDayOfWeek();

        // Don't allow check-in on weekends
        if (dayOfWeek == DayOfWeek.SATURDAY || dayOfWeek == DayOfWeek.SUNDAY) {
            return false;
        }

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ApiException("Employee not found"));

        // Check if already checked in today
        return attendanceRepository.findByEmployeeAndAttendanceDate(employee, today)
                .map(a -> a.getCheckOutTime() == null) // Can't check in if already checked in
                .orElse(true); // Can check in if no attendance today
    }
}