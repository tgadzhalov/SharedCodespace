package com.uchilishte1.demo.repos;

import com.uchilishte1.demo.models.entities.Assignment;
import com.uchilishte1.demo.models.entities.Klas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, UUID> {
    List<Assignment> findByKlas(Klas klas);
}

