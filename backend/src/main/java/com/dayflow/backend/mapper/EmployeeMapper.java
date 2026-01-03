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

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "employeeId", ignore = true)
    @Mapping(target = "company", source = "hrUser.companyName")
    @Mapping(target = "companyAvatar", source = "hrUser.companyAvatar")
    @Mapping(target = "yearOfJoining", expression = "java(java.time.Year.now().getValue())")
    @Mapping(target = "createdBy", source = "hrUser")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Employee toEntity(EmployeeCreateRequest request, HrUser hrUser);

    @Mapping(target = "createdByHrName", source = "createdBy.name")
    @Mapping(target = "createdByHrEmail", source = "createdBy.email")
    EmployeeResponse toResponse(Employee employee);
}