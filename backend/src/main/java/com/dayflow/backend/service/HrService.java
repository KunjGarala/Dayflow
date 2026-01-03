package com.dayflow.backend.service;

import com.dayflow.backend.dto.request.HrSignupRequest;
import com.dayflow.backend.dto.response.HrResponse;
import com.dayflow.backend.dto.response.HrSignupResponse;
import com.dayflow.backend.entity.HrUser;
import com.dayflow.backend.exception.ApiException;
import com.dayflow.backend.mapper.HrMapper;
import com.dayflow.backend.repository.HrRepository;
import com.dayflow.backend.util.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class HrService {

    private final HrRepository hrRepository;
    private final HrMapper hrMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Transactional
    public HrSignupResponse signup(HrSignupRequest signupRequest, HttpServletResponse response) {
        // Validate passwords match
        if (!signupRequest.getPassword().equals(signupRequest.getConfirmPassword())) {
            throw new ApiException("Passwords do not match");
        }

        // Check if email already exists
        if (hrRepository.existsByEmail(signupRequest.getEmail())) {
            throw new ApiException("Email already registered");
        }

        // Check if phone already exists
        if (hrRepository.existsByPhone(signupRequest.getPhone())) {
            throw new ApiException("Phone number already registered");
        }

        // Map request to entity
        HrUser hrUser = hrMapper.signupRequestToEntity(signupRequest);

        // Encode password
        hrUser.setPassword(passwordEncoder.encode(signupRequest.getPassword()));

        // Save HR user
        HrUser savedHrUser = hrRepository.save(hrUser);

        // Generate JWT token
        String token = jwtUtil.generateToken(
                savedHrUser.getEmail(),
                savedHrUser.getId(),
                "HR"
        );

        // Create HTTP-only cookie
        Cookie cookie = createAccessTokenCookie(token);
        response.addCookie(cookie);

        // Prepare response
        HrResponse hrResponse = hrMapper.entityToResponse(savedHrUser);

        return new HrSignupResponse(
                hrResponse,
                "HR user registered successfully",
                token
        );
    }

    private Cookie createAccessTokenCookie(String token) {
        Cookie cookie = new Cookie("accessToken", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true); // Use true in production with HTTPS
        cookie.setPath("/");
        cookie.setMaxAge(24 * 60 * 60); // 24 hours
        return cookie;
    }

    public HrResponse getHrProfile(Long hrId) {
        HrUser hrUser = hrRepository.findById(hrId)
                .orElseThrow(() -> new ApiException("HR user not found"));
        return hrMapper.entityToResponse(hrUser);
    }
}