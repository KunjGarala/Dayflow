package com.dayflow.backend.mapper;

import com.dayflow.backend.dto.response.HrResponse;
import com.dayflow.backend.dto.request.HrSignupRequest;
import com.dayflow.backend.entity.HrUser;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface HrMapper {
    HrMapper INSTANCE = Mappers.getMapper(HrMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "role", constant = "HR")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    HrUser signupRequestToEntity(HrSignupRequest signupRequest);

    HrResponse entityToResponse(HrUser hrUser);
}