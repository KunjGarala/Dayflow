package com.dayflow.backend.exception;


import com.assessnova.userservice.dto.response.ExceptionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.Instant;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({ApiException.class})
    public ResponseEntity<ExceptionResponse> handleBadRequest(Exception e){
        ExceptionResponse response = new ExceptionResponse(e.getMessage(), Instant.now());
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler({MicroserviceException.class})
    public ResponseEntity<ExceptionResponse> handleServerError(Exception e){
        ExceptionResponse response = new ExceptionResponse(e.getMessage(), Instant.now());
        return ResponseEntity.internalServerError().body(response);
    }

    @ExceptionHandler({NoCurrentUserException.class})
    public ResponseEntity<ExceptionResponse> handleUnauthorizedException(Exception e){
        ExceptionResponse response = new ExceptionResponse(e.getMessage(), Instant.now());
        return ResponseEntity.status(HttpStatus.valueOf(401)).body(response);
    }

}
