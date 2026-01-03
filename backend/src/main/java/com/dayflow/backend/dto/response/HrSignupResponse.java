package com.dayflow.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HrSignupResponse {
    private HrResponse hr;
    private String message;
    private String accessToken;
}