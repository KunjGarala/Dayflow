package com.dayflow.backend.repository;

import com.dayflow.backend.entity.HrUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HrRepository extends JpaRepository<HrUser, Long> {
    Optional<HrUser> findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
}