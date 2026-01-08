package com.uchilishte1.demo.services;

import com.uchilishte1.demo.models.dtos.assignment.AssignmentDto;
import com.uchilishte1.demo.models.entities.Assignment;
import com.uchilishte1.demo.models.entities.Klas;
import com.uchilishte1.demo.models.entities.User;
import com.uchilishte1.demo.repos.AssignmentRepository;
import com.uchilishte1.demo.repos.KlasRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
public class AssignmentService {
    private final AssignmentRepository assignmentRepository;
    private final KlasRepository klasRepository;

    public AssignmentService(AssignmentRepository assignmentRepository, KlasRepository klasRepository) {
        this.assignmentRepository = assignmentRepository;
        this.klasRepository = klasRepository;
    }

    @Transactional
    public Assignment createAssignment(AssignmentDto assignmentDto, UUID teacherId) {
        if (assignmentDto.getTitle() == null || assignmentDto.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Assignment title is required.");
        }
        
        if (assignmentDto.getSessionDate() == null) {
            throw new IllegalArgumentException("Session date and time is required.");
        }
        
        if (assignmentDto.getKlasId() == null) {
            throw new IllegalArgumentException("Please select a klas for this assignment.");
        }
        
        Klas klas = klasRepository.findById(assignmentDto.getKlasId())
                .orElseThrow(() -> new IllegalArgumentException("Selected klas not found. Please choose a valid klas."));

        User teacher = klas.getTeacher();
        if (!teacher.getId().equals(teacherId)) {
            throw new IllegalArgumentException("You don't have permission to create assignments for this klas. You can only create assignments for your own klas.");
        }

        Assignment assignment = Assignment.builder()
                .title(assignmentDto.getTitle())
                .description(assignmentDto.getDescription())
                .sessionDate(assignmentDto.getSessionDate())
                .createdBy(teacher)
                .klas(klas)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return assignmentRepository.save(assignment);
    }

    public List<Assignment> getAssignmentsByKlas(Klas klas) {
        return assignmentRepository.findByKlas(klas);
    }

    public Assignment getAssignmentById(UUID assignmentId) {
        return assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new IllegalArgumentException("Assignment not found with ID: " + assignmentId));
    }
}

