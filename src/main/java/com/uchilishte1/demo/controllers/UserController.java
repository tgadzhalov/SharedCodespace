package com.uchilishte1.demo.controllers;

import com.uchilishte1.demo.models.dtos.UpdateProfilePictureDto;
import com.uchilishte1.demo.models.dtos.UserDto;
import com.uchilishte1.demo.security.UserData;
import com.uchilishte1.demo.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> getCurrentUser(@AuthenticationPrincipal UserData userData) {
        if (userData == null) {
            return ResponseEntity.status(401).build();
        }
        UserDto userDto = userService.getCurrentUser(userData);
        return ResponseEntity.ok(userDto);
    }

    @PutMapping("/me/profile-picture")
    public ResponseEntity<UserDto> updateProfilePicture(
            @AuthenticationPrincipal UserData userData,
            @RequestBody UpdateProfilePictureDto updateDto) {
        userService.updateProfilePicture(userData, updateDto.getProfilePictureUrl());
        UserDto userDto = userService.getCurrentUser(userData);
        return ResponseEntity.ok(userDto);
    }
}

