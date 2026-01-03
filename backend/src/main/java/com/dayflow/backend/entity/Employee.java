package com.dayflow.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "employees")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String employeeId; // Custom generated ID

    @Column(nullable = false)
    private String name;

    private String password;

    @Column(nullable = false)
    private String jobPosition;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String mobile;

    @Column(nullable = false)
    private String company;

    private String companyAvatar;

    @Column(nullable = false)
    private String department;

    private String manager;

    private String location;

    @Column(nullable = false)
    private Integer yearOfJoining;

    // Foreign key to HR who created this employee
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_hr_id", nullable = false)
    private HrUser createdBy;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}