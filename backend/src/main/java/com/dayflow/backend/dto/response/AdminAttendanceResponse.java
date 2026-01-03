package com.dayflow.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminAttendanceResponse {
    
    private String companyName;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate attendanceDate;
    
    private List<AttendanceRecordDto> attendanceRecords;
}
