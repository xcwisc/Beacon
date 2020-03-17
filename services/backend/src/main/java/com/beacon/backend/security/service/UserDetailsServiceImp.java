package com.beacon.backend.security.service;

import com.beacon.backend.security.entity.JwtUser;
import com.beacon.backend.system.entity.User;
import com.beacon.backend.system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImp implements UserDetailsService {

  @Autowired
  private UserService userService;

  @Override
  public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
    User user = userService.findUserByUserName(name);
    return new JwtUser(user);
  }
}
