package com.dayflow.backend.mapper;

import com.dayflow.backend.dto.request.EmployeeCreateRequest;
import com.dayflow.backend.dto.response.EmployeeResponse;
import com.dayflow.backend.entity.Employee;
import com.dayflow.backend.entity.HrUser;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface EmployeeMapper {

    Employee toEntity(EmployeeCreateRequest request);

    @Mapping(target = "fullName", expression = "java(employee.getFirstName() + \" \" + employee.getLastName())")
    @Mapping(target = "createdByHrName", source = "createdBy.name")
    @Mapping(target = "createdByHrEmail", source = "createdBy.email")
    EmployeeResponse toResponse(Employee employee);
}