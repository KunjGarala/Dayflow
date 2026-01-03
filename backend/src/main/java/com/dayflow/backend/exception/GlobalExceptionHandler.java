package com.dayflow.backend.exception;


import com.dayflow.backend.dto.response.ExceptionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.Instant;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({ApiException.class})
    public ResponseEntity<ExceptionResponse> handleBadRequest(Exception e) {
        ExceptionResponse response = new ExceptionResponse(e.getMessage(), Instant.now());
        return ResponseEntity.badRequest().body(response);
    }

}
