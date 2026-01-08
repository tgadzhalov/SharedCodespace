package com.uchilishte1.demo.models.dtos.auth;

import com.uchilishte1.demo.models.enums.UserType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDto {

    @NotBlank
    @Size(min = 2, max = 25)
    private String firstName;

    @NotBlank
    @Size(min = 2, max = 25)
    private String lastName;

    @NotBlank
    @Size(min = 3, max = 50)
    private String username;

    @NotBlank
    @Size(min = 8, max = 50)
    private String password;

    @NotNull
    private UserType userType;

    private UUID klasId;
}

