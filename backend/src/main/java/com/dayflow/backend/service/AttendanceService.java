package com.dayflow.backend.service;

import com.dayflow.backend.dto.response.AdminAttendanceResponse;
import com.dayflow.backend.dto.response.AttendanceRecordDto;
import com.dayflow.backend.entity.Attendance;
import com.dayflow.backend.entity.HrUser;
import com.dayflow.backend.exception.ApiException;
import com.dayflow.backend.repository.AttendanceRepository;
import com.dayflow.backend.repository.HrRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final HrRepository hrRepository;

    @Transactional(readOnly = true)
    public AdminAttendanceResponse getAdminAttendanceReport(LocalDate date, Long hrId) {
        log.info("Fetching admin attendance report for date: {} by HR ID: {}", date, hrId);

        // Get HR user to retrieve company name
        HrUser hrUser = hrRepository.findById(hrId)
                .orElseThrow(() -> new ApiException("HR user not found"));

        String companyName = hrUser.getCompanyName();

        // Fetch attendance records for the given date and company
        List<Attendance> attendanceList = attendanceRepository
                .findByAttendanceDateAndCompany(date, companyName);

        // Map to DTOs
        List<AttendanceRecordDto> attendanceRecords = attendanceList.stream()
                .map(attendance -> AttendanceRecordDto.builder()
                        .employeeName(attendance.getEmployee().getName())
                        .checkIn(attendance.getCheckIn())
                        .checkOut(attendance.getCheckOut())
                        .workHours(attendance.getWorkHours())
                        .extraHours(attendance.getExtraHours())
                        .build())
                .collect(Collectors.toList());

        log.info("Found {} attendance records for date: {}", attendanceRecords.size(), date);

        return AdminAttendanceResponse.builder()
                .companyName(companyName)
                .attendanceDate(date)
                .attendanceRecords(attendanceRecords)
                .build();
    }
}
