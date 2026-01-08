package com.uchilishte1.demo.services;

import com.uchilishte1.demo.models.dtos.klas.KlasDto;
import com.uchilishte1.demo.models.entities.Klas;
import com.uchilishte1.demo.models.entities.User;
import com.uchilishte1.demo.models.enums.UserType;
import com.uchilishte1.demo.repos.KlasRepository;
import com.uchilishte1.demo.repos.UserRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
public class KlasService {
    private final KlasRepository klasRepository;
    private final UserRepository userRepository;
    
    public KlasService(KlasRepository klasRepository, UserRepository userRepository) {
        this.klasRepository = klasRepository;
        this.userRepository = userRepository;
    }
    
    @Transactional
    public Klas createKlas(KlasDto klasDto) {
        if (klasDto.getName() == null || klasDto.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Klas name is required.");
        }
        
        if (klasDto.getSchoolYear() == null || klasDto.getSchoolYear().trim().isEmpty()) {
            throw new IllegalArgumentException("School year is required.");
        }
        
        if (klasDto.getTeacherId() == null) {
            throw new IllegalArgumentException("Please select a teacher for this klas.");
        }
        
        User teacher = userRepository.findById(klasDto.getTeacherId())
                .orElseThrow(() -> new IllegalArgumentException("Selected teacher not found. Please choose a valid teacher."));
        
        if (teacher.getUserType() != UserType.TEACHER) {
            throw new IllegalArgumentException("The selected user is not a teacher. Please select a teacher account.");
        }
        
        Klas klas = Klas.builder()
                .name(klasDto.getName())
                .description(klasDto.getDescription())
                .schoolYear(klasDto.getSchoolYear())
                .teacher(teacher)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        
        return klasRepository.save(klas);
    }
    
    public List<User> getTeachers() {
        return userRepository.findByUserType(UserType.TEACHER);
    }
    
    public Klas getKlasById(UUID klasId) {
        return klasRepository.findById(klasId).orElse(null);
    }
    
    public List<Klas> getKlasByTeacher(User teacher) {
        return klasRepository.findByTeacher(teacher);
    }
    
    public List<Map<String, Object>> getTeachersList() {
        return getTeachers().stream()
                .map(teacher -> {
                    Map<String, Object> teacherMap = new HashMap<>();
                    teacherMap.put("id", teacher.getId().toString());
                    teacherMap.put("firstName", teacher.getFirstName());
                    teacherMap.put("lastName", teacher.getLastName());
                    teacherMap.put("username", teacher.getUsername());
                    return teacherMap;
                })
                .collect(Collectors.toList());
    }

    public User getUserById(UUID userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
    }
}

