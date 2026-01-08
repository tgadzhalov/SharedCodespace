package com.uchilishte1.demo.controllers;

import com.uchilishte1.demo.models.dtos.assignment.AssignmentDto;
import com.uchilishte1.demo.models.entities.Assignment;
import com.uchilishte1.demo.models.entities.Klas;
import com.uchilishte1.demo.security.UserData;
import com.uchilishte1.demo.services.AssignmentService;
import com.uchilishte1.demo.services.KlasService;
import com.uchilishte1.demo.util.ResponseHelper;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/assignments")
@PreAuthorize("hasRole('TEACHER')")
public class AssignmentController {

    private final AssignmentService assignmentService;
    private final KlasService klasService;

    public AssignmentController(AssignmentService assignmentService, KlasService klasService) {
        this.assignmentService = assignmentService;
        this.klasService = klasService;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createAssignment(
            @AuthenticationPrincipal UserData userData,
            @Valid @RequestBody AssignmentDto assignmentDto,
            BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return ResponseHelper.badRequest(ResponseHelper.validationErrorResponse(bindingResult));
        }

        assignmentService.createAssignment(assignmentDto, userData.getId());
        return ResponseHelper.ok(ResponseHelper.successResponse("Assignment created successfully"));
    }

    @GetMapping("/klas/{klasId}")
    public ResponseEntity<List<Map<String, Object>>> getAssignmentsByKlas(
            @AuthenticationPrincipal UserData userData,
            @PathVariable UUID klasId) {
        
        Klas klas = klasService.getKlasById(klasId);
        if (klas == null) {
            return ResponseEntity.notFound().build();
        }

        if (!klas.getTeacher().getId().equals(userData.getId())) {
            return ResponseEntity.status(403).build();
        }

        List<Assignment> assignments = assignmentService.getAssignmentsByKlas(klas);
        List<Map<String, Object>> result = assignments.stream()
                .map(assignment -> {
                    Map<String, Object> assignmentMap = new HashMap<>();
                    assignmentMap.put("id", assignment.getId().toString());
                    assignmentMap.put("title", assignment.getTitle());
                    assignmentMap.put("description", assignment.getDescription());
                    assignmentMap.put("sessionDate", assignment.getSessionDate().toString());
                    return assignmentMap;
                })
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(result);
    }
}

