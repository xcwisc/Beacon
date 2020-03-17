package com.beacon.backend.security.entity;

import com.beacon.backend.security.service.UserDetailsServiceImp;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class CurrentUser {
  private final UserDetailsServiceImp userDetailsService;

  public CurrentUser(UserDetailsServiceImp userDetailsService) {
    this.userDetailsService = userDetailsService;
  }

  public JwtUser getCurrentUser() {
    return (JwtUser) userDetailsService.loadUserByUsername(getCurrentUserName());
  }

  private static String getCurrentUserName() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication != null && authentication.getPrincipal() != null) {
      return (String) authentication.getPrincipal();
    }
    return null;
  }
}
