package com.uchilishte1.demo.models.enums;

import lombok.Getter;

@Getter
public enum ProgrammingLanguageType {
    JAVA("Java"),
    C_SHARP("C#"),
    JAVA_SCRIPT("Java Script"),
    HTML("HTML"),
    CSS("CSS"),
    C("C"),
    OTHER("Other programming language")
    ;

    private final String displayName;

    ProgrammingLanguageType(String displayName) {
        this.displayName = displayName;
    }

}

