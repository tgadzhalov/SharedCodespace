package com.uchilishte1.demo.models.dtos.assignment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AssignmentDto {

    @NotBlank
    @Size(min = 2, max = 200)
    private String title;

    @Size(max = 1000)
    private String description;

    @NotNull
    private LocalDateTime sessionDate;

    @NotNull
    private UUID klasId;
}

