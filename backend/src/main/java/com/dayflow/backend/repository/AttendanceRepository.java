package com.dayflow.backend.repository;

import com.dayflow.backend.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    
    @Query("SELECT a FROM Attendance a " +
           "JOIN FETCH a.employee e " +
           "WHERE a.attendanceDate = :date " +
           "AND e.company = :company " +
           "ORDER BY e.name ASC")
    List<Attendance> findByAttendanceDateAndCompany(
            @Param("date") LocalDate date,
            @Param("company") String company
    );
}
