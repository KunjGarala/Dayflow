package com.dayflow.backend.mapper;

import com.dayflow.backend.dto.response.HrResponse;
import com.dayflow.backend.dto.request.HrSignupRequest;
import com.dayflow.backend.entity.HrUser;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface HrMapper {
    HrUser signupRequestToEntity(HrSignupRequest signupRequest);

    HrResponse entityToResponse(HrUser hrUser);
}