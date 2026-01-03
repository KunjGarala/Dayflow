package com.dayflow.backend.repository;

import com.dayflow.backend.entity.LeaveRequest;
import com.dayflow.backend.enums.LeaveStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {

    // Find all leave requests by employee ID
    List<LeaveRequest> findByEmployeeIdOrderByCreatedAtDesc(Long employeeId);

    // Find all leave requests by employee ID with pagination
    Page<LeaveRequest> findByEmployeeId(Long employeeId, Pageable pageable);

    // Find leave requests by status
    List<LeaveRequest> findByStatus(LeaveStatus status);

    // Find leave requests by employee and status
    List<LeaveRequest> findByEmployeeIdAndStatus(Long employeeId, LeaveStatus status);

    // Find overlapping leave requests for an employee
    @Query("SELECT lr FROM LeaveRequest lr WHERE lr.employee.id = :employeeId " +
            "AND lr.status = 'APPROVED' " +
            "AND ((lr.startDate <= :endDate AND lr.endDate >= :startDate))")
    List<LeaveRequest> findOverlappingLeaves(
            @Param("employeeId") Long employeeId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    // Find leave requests by date range (for admin/HR)
    @Query("SELECT lr FROM LeaveRequest lr WHERE " +
            "(:startDate IS NULL OR lr.startDate >= :startDate) AND " +
            "(:endDate IS NULL OR lr.endDate <= :endDate) " +
            "ORDER BY lr.createdAt DESC")
    List<LeaveRequest> findByDateRange(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    // Count leaves by type and status for an employee
    @Query("SELECT COUNT(lr) FROM LeaveRequest lr WHERE " +
            "lr.employee.id = :employeeId AND " +
            "lr.leaveType = :leaveType AND " +
            "lr.status = 'APPROVED' AND " +
            "EXTRACT(YEAR FROM lr.startDate) = :year")
    Long countApprovedLeavesByTypeAndYear(
            @Param("employeeId") Long employeeId,
            @Param("leaveType") String leaveType,
            @Param("year") int year);

    // Find all leave requests with employee details (for admin/HR)
    @Query("SELECT lr FROM LeaveRequest lr JOIN FETCH lr.employee ORDER BY lr.createdAt DESC")
    Page<LeaveRequest> findAllWithEmployee(Pageable pageable);

    // Find pending leave requests (for admin/HR dashboard)
    List<LeaveRequest> findByStatusOrderByCreatedAtAsc(LeaveStatus status);
}