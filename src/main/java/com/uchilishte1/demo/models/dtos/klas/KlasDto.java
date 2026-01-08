package com.uchilishte1.demo.models.dtos.klas;

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
public class KlasDto {

    @NotBlank
    @Size(min = 2, max = 100)
    private String name;

    @Size(max = 255)
    private String description;

    @NotBlank
    @Size(max = 20)
    private String schoolYear;

    @NotNull
    private UUID teacherId;
}

