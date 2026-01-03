package com.dayflow.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "attendances",
        uniqueConstraints = @UniqueConstraint(columnNames = {"employee_id", "attendance_date"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Column(name = "attendance_date", nullable = false)
    private LocalDate attendanceDate;

    @Column(name = "check_in_time", nullable = false)
    private LocalTime checkInTime;

    @Column(name = "check_out_time")
    private LocalTime checkOutTime;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // Helper method to calculate total hours
    public double getTotalHours() {
        double totalHours;
        int overtimeMinutes = 0;
        if (checkOutTime != null) {
            Duration duration = Duration.between(checkInTime, checkOutTime);
            totalHours = duration.toMinutes() / 60.0;

            // Check overtime (more than 8 hours)
            if (totalHours > 8.0) {
                overtimeMinutes = (int) ((totalHours - 8.0) * 60);
            }
        } else {
            // Default to 8 hours if not checked out yet
            totalHours = 8.0;
        }

        return totalHours;
    }

    public double getOvertimeMinutes() {
        double totalHours;
        int overtimeMinutes = 0;
        if (checkOutTime != null) {
            Duration duration = Duration.between(checkInTime, checkOutTime);
            totalHours = duration.toMinutes() / 60.0;

            // Check overtime (more than 8 hours)
            if (totalHours > 8.0) {
                overtimeMinutes = (int) ((totalHours - 8.0) * 60);
            }
        } else {
            // Default to 8 hours if not checked out yet
            totalHours = 8.0;
        }

        return overtimeMinutes;
    }
}