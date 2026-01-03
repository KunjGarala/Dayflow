package com.dayflow.backend.repository;

import com.dayflow.backend.entity.Employee;
import com.dayflow.backend.entity.HrUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByEmail(String email);
    Optional<Employee> findByEmployeeId(String employeeId);
    boolean existsByEmail(String email);
    boolean existsByMobile(String mobile);

    List<Employee> findByCreatedBy(HrUser hrUser);

    @Query("SELECT MAX(e.employeeId) FROM Employee e WHERE e.employeeId LIKE :pattern")
    Optional<String> findLastEmployeeIdByPattern(@Param("pattern") String pattern);

    @Query("SELECT COUNT(e) FROM Employee e WHERE e.company = :company AND e.yearOfJoining = :year")
    Long countByCompanyAndYearOfJoining(@Param("company") String company,
                                        @Param("year") Integer year);
}