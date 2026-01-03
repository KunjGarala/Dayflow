package com.dayflow.backend.repository;

import com.dayflow.backend.entity.Attendance;
import com.dayflow.backend.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    Optional<Attendance> findByEmployeeAndAttendanceDate(Employee employee, LocalDate date);

    List<Attendance> findByEmployeeAndAttendanceDateBetween(Employee employee,
                                                            LocalDate startDate,
                                                            LocalDate endDate);

    List<Attendance> findByEmployee(Employee employee);

    @Query("SELECT a FROM Attendance a WHERE a.employee.createdBy.id = :hrId " +
            "AND a.attendanceDate BETWEEN :startDate AND :endDate")
    List<Attendance> findByHrIdAndDateRange(@Param("hrId") Long hrId,
                                            @Param("startDate") LocalDate startDate,
                                            @Param("endDate") LocalDate endDate);

    @Query("SELECT a FROM Attendance a WHERE a.employee.createdBy.id = :hrId " +
            "AND a.employee.id = :employeeId " +
            "AND a.attendanceDate BETWEEN :startDate AND :endDate")
    List<Attendance> findByHrIdAndEmployeeAndDateRange(@Param("hrId") Long hrId,
                                                       @Param("employeeId") Long employeeId,
                                                       @Param("startDate") LocalDate startDate,
                                                       @Param("endDate") LocalDate endDate);

    // Get today's attendance for an employee
    @Query("SELECT a FROM Attendance a WHERE a.employee = :employee " +
            "AND a.attendanceDate = CURRENT_DATE")
    Optional<Attendance> findTodayByEmployee(@Param("employee") Employee employee);

    @Query("SELECT a.attendanceDate, COUNT(a), " +
            "SUM(CASE WHEN a.checkOutTime IS NOT NULL THEN 1 ELSE 0 END) as checkedOutCount, " +
            "AVG(CAST(TIME_TO_SEC(TIMEDIFF(a.checkOutTime, a.checkInTime)) AS double) / 3600.0) as avgHours " +
            "FROM Attendance a " +
            "WHERE a.employee.createdBy.id = :hrId " +
            "AND YEAR(a.attendanceDate) = :year " +
            "AND MONTH(a.attendanceDate) = :month " +
            "AND a.checkOutTime IS NOT NULL " +
            "GROUP BY a.attendanceDate")
    List<Object[]> getMonthlySummary(@Param("hrId") Long hrId,
                                     @Param("year") int year,
                                     @Param("month") int month);
}