package com.uchilishte1.demo.controllers;

import com.uchilishte1.demo.models.entities.Klas;
import com.uchilishte1.demo.models.entities.User;
import com.uchilishte1.demo.security.UserData;
import com.uchilishte1.demo.services.KlasService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/klas")
@PreAuthorize("hasRole('TEACHER')")
public class KlasController {

    private final KlasService klasService;

    public KlasController(KlasService klasService) {
        this.klasService = klasService;
    }

    @GetMapping("/my")
    public ResponseEntity<List<Map<String, Object>>> getMyKlas(@AuthenticationPrincipal UserData userData) {
        User teacher = klasService.getUserById(userData.getId());
        List<Klas> klasList = klasService.getKlasByTeacher(teacher);
        List<Map<String, Object>> result = klasList.stream()
                .map(klas -> {
                    Map<String, Object> klasMap = new HashMap<>();
                    klasMap.put("id", klas.getId().toString());
                    klasMap.put("name", klas.getName());
                    klasMap.put("description", klas.getDescription());
                    klasMap.put("schoolYear", klas.getSchoolYear());
                    return klasMap;
                })
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(result);
    }
}

