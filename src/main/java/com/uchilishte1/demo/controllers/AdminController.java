package com.uchilishte1.demo.controllers;

import com.uchilishte1.demo.models.dtos.auth.RegisterDto;
import com.uchilishte1.demo.models.dtos.klas.KlasDto;
import com.uchilishte1.demo.services.KlasService;
import com.uchilishte1.demo.services.UserService;
import com.uchilishte1.demo.util.ResponseHelper;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserService userService;
    private final KlasService klasService;

    public AdminController(UserService userService, KlasService klasService) {
        this.userService = userService;
        this.klasService = klasService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<Map<String, Object>>> getRecentUsers(
            @RequestParam(defaultValue = "20") int limit) {
        List<Map<String, Object>> users = userService.getRecentUsers(limit);
        return ResponseEntity.ok(users);
    }

    @PostMapping("/users")
    public ResponseEntity<Map<String, Object>> createUser(
            @Valid @RequestBody RegisterDto registerDto,
            BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return ResponseHelper.badRequest(ResponseHelper.validationErrorResponse(bindingResult));
        }

        var result = userService.registerUserWithResult(registerDto);
        return ResponseHelper.buildResponse(result.isSuccess(), result.getMessage());
    }

    @GetMapping("/teachers")
    public ResponseEntity<List<Map<String, Object>>> getTeachers() {
        List<Map<String, Object>> teachers = klasService.getTeachersList();
        return ResponseEntity.ok(teachers);
    }

    @PostMapping("/klas")
    public ResponseEntity<Map<String, Object>> createKlas(
            @Valid @RequestBody KlasDto klasDto,
            BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return ResponseHelper.badRequest(ResponseHelper.validationErrorResponse(bindingResult));
        }

        klasService.createKlas(klasDto);
        return ResponseHelper.ok(ResponseHelper.successResponse("Klas created successfully"));
    }
}

