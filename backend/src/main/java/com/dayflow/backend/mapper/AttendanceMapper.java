package com.dayflow.backend.mapper;

import com.dayflow.backend.dto.response.AttendanceResponse;
import com.dayflow.backend.entity.Attendance;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AttendanceMapper {

    @Mapping(source = "employee.id", target = "employeeId")
    @Mapping(source = "employee.firstName", target = "employeeName")
    @Mapping(source = "employee.employeeId", target = "employeeCode")
    @Mapping(target = "totalHours", expression = "java(attendance.getTotalHours())")
    @Mapping(target = "overtimeMinutes", expression = "java((int) attendance.getOvertimeMinutes())")
    @Mapping(target = "checkedOut", expression = "java(attendance.getCheckOutTime() != null)")
    AttendanceResponse toResponse(Attendance attendance);
}