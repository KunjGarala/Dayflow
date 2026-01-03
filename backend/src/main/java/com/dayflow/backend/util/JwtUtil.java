package com.dayflow.backend.util;

import com.dayflow.backend.exception.ApiException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    private String SECRET;

    public JwtUtil(
            @Value("${jwt.secret}") String jwtSecret
    ){
        SECRET = jwtSecret;
    }

    // Token expiration time (24 hours)
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 24 hours

    private SecretKey getSignedkey() {
        byte[] bytes = SECRET.getBytes();
        return Keys.hmacShaKeyFor(bytes);
    }

    public String createToken(Map<String, Object> claims, String username) {
        return Jwts
                .builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSignedkey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Generate token with userId and role
    public String generateToken(String username, Long userId, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId.toString());
        claims.put("role", role);
        return createToken(claims, username);
    }

    // Legacy method for backward compatibility
    public String generateToken(String username) {
        return createToken(new HashMap<>(), username);
    }

    private Claims extractClaims(String token) throws ExpiredJwtException {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(getSignedkey())
                    .setAllowedClockSkewSeconds(60)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            throw new ApiException("Jwt token expired.");
        } catch (Exception e) {
            throw new ApiException("Invalid JWT token.");
        }
    }

    private <T> T extractClaim(String token, Function<Claims, T> resolver) {
        return resolver.apply(extractClaims(token));
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public String extractRole(String token) {
        return extractClaim(token, claims -> claims.get("role", String.class));
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public boolean isExpired(String token) {
        return extractExpiration(token).before(new Date(System.currentTimeMillis()));
    }

    public boolean validateToken(String token) {
        try {
            extractClaims(token); // This will validate signature and expiration
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // Legacy validation for backward compatibility
    public boolean validate(String token, String username) {
        return !isExpired(token) && extractUsername(token).equals(username);
    }
}