package com.uchilishte1.demo.models.dtos;

import com.uchilishte1.demo.models.enums.UserType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private String firstName;
    private String lastName;
    private String username;
    private String profilePictureUrl;
    private String userType;
    
    public void setUserType(UserType userType) {
        this.userType = userType != null ? userType.name() : null;
    }
}


