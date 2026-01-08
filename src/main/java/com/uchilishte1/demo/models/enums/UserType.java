package com.uchilishte1.demo.models.enums;

import lombok.Getter;

@Getter
public enum UserType {
    ADMIN("Admin"),
    TEACHER("Teacher"),
    STUDENT("Student");

    private final String displayName;

    UserType(String displayName) {
        this.displayName = displayName;
    }

}
