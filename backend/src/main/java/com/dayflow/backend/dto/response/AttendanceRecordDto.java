package com.dayflow.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttendanceRecordDto {
    
    private String employeeName;
    
    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime checkIn;
    
    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime checkOut;
    
    private Double workHours;
    
    private Double extraHours;
}
