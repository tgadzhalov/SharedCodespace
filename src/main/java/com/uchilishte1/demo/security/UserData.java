package com.uchilishte1.demo.security;
import com.uchilishte1.demo.models.enums.UserType;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Builder
@Getter
@Setter
@AllArgsConstructor
public class UserData implements UserDetails {

    private UUID id;
    private String username;
    private String password;
    private UserType userType;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (userType == null) {
            return List.of();
        }
        String role = "ROLE_" + userType.name();
        SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority(role);
        return List.of(simpleGrantedAuthority);
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
