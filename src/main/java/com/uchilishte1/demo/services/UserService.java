package com.uchilishte1.demo.services;

import com.uchilishte1.demo.models.dtos.UserDto;
import com.uchilishte1.demo.models.dtos.UserRegistrationResult;
import com.uchilishte1.demo.models.dtos.auth.RegisterDto;
import com.uchilishte1.demo.models.entities.Klas;
import com.uchilishte1.demo.models.entities.User;
import com.uchilishte1.demo.models.enums.UserType;
import com.uchilishte1.demo.repos.KlasRepository;
import com.uchilishte1.demo.repos.UserRepository;
import com.uchilishte1.demo.security.UserData;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final KlasRepository klasRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, KlasRepository klasRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.klasRepository = klasRepository;
        this.passwordEncoder = passwordEncoder;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
            
            if (user.getPassword() == null || user.getUserType() == null) {
                throw new UsernameNotFoundException("User data incomplete for: " + username);
            }
            
            return new UserData(user.getId(), username, user.getPassword(), user.getUserType());
        } catch (UsernameNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new UsernameNotFoundException("Error loading user: " + username, e);
        }
    }

    public UserDto getCurrentUser(UserData userData) {
        User user = userRepository.findByUsername(userData.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + userData.getUsername()));

        UserDto dto = UserDto.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .username(user.getUsername())
                .profilePictureUrl(user.getProfilePictureUrl())
                .build();
        
        dto.setUserType(user.getUserType());
        return dto;
    }

    public void updateProfilePicture(UserData userData, String profilePictureUrl) {
        User user = userRepository.findByUsername(userData.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + userData.getUsername()));

        if (profilePictureUrl != null) {
            String url = profilePictureUrl.trim();
            user.setProfilePictureUrl(url.isEmpty() ? null : url);
        } else {
            user.setProfilePictureUrl(null);
        }

        userRepository.save(user);
    }

    public boolean usernameExists(String username) {
        return userRepository.existsByUsername(username);
    }

    @Transactional
    public void registerUser(RegisterDto registerDto) {
        if (usernameExists(registerDto.getUsername())) {
            throw new IllegalArgumentException("This username is already taken. Please choose a different one.");
        }
        
        if (registerDto.getUserType() == null) {
            throw new IllegalArgumentException("Please select a user type.");
        }
        
        if (registerDto.getFirstName() == null || registerDto.getFirstName().trim().isEmpty()) {
            throw new IllegalArgumentException("First name is required.");
        }
        
        if (registerDto.getLastName() == null || registerDto.getLastName().trim().isEmpty()) {
            throw new IllegalArgumentException("Last name is required.");
        }
        
        if (registerDto.getPassword() == null || registerDto.getPassword().length() < 8) {
            throw new IllegalArgumentException("Password must be at least 8 characters long.");
        }
        
        Klas klas = null;
        if (registerDto.getKlasId() != null) {
            if (registerDto.getUserType() == UserType.ADMIN || registerDto.getUserType() == UserType.TEACHER) {
                throw new IllegalArgumentException("Admin and Teacher accounts cannot be assigned to a klas. Only students can be assigned to a klas.");
            }
            klas = klasRepository.findById(registerDto.getKlasId())
                    .orElseThrow(() -> new IllegalArgumentException("Selected klas not found. Please choose a valid klas."));
        }

        User user = User.builder()
                .firstName(registerDto.getFirstName())
                .lastName(registerDto.getLastName())
                .username(registerDto.getUsername())
                .password(passwordEncoder.encode(registerDto.getPassword()))
                .userType(registerDto.getUserType())
                .klas(klas)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        userRepository.save(user);
    }

    public UserRegistrationResult registerUserWithResult(RegisterDto registerDto) {
        registerUser(registerDto);
        return UserRegistrationResult.builder()
                .success(true)
                .message("User created successfully")
                .build();
    }

    public List<Map<String, Object>> getRecentUsers(int limit) {
        PageRequest pageRequest = PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "createdAt"));
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        
        return userRepository.findAll(pageRequest).getContent().stream()
                .map(user -> {
                    Map<String, Object> userMap = new HashMap<>();
                    userMap.put("id", user.getId().toString());
                    userMap.put("firstName", user.getFirstName());
                    userMap.put("lastName", user.getLastName());
                    userMap.put("username", user.getUsername());
                    userMap.put("userType", user.getUserType().name());
                    userMap.put("createdAt", user.getCreatedAt().format(formatter));
                    return userMap;
                })
                .collect(Collectors.toList());
    }

    public List<Map<String, Object>> getTeachersList() {
        return userRepository.findByUserType(UserType.TEACHER).stream()
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
}
