package com.dayflow.backend.security;

import com.dayflow.backend.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtils;

    public JwtFilter(JwtUtil jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");

        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);

                // Extract userId and role from JWT
                String userId = jwtUtils.extractUsername(token);
                String userRole = jwtUtils.extractRole(token);

                if (userId != null && userRole != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    // Validate token (add expiration check if needed)
                    if (jwtUtils.validateToken(token)) {
                        // Create authorities from role
                        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_" + userRole));

                        // Create authentication with userId as principal and role as authority
                        UsernamePasswordAuthenticationToken authentication =
                                new UsernamePasswordAuthenticationToken(userId, null, authorities);

                        // Set additional details if needed (optional)
                        authentication.setDetails(userRole);

                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }
            }
        } catch (Exception e) {
            System.out.println("Exception in JwtFilter: " + e.getMessage());
            // Don't set authentication if token is invalid
//            SecurityContextHolder.clearContext();
        } finally {
            filterChain.doFilter(request, response);
        }
    }
}