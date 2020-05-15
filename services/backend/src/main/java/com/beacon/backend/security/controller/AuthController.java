package com.beacon.backend.security.controller;

import com.beacon.backend.security.entity.RegisterUser;
import com.beacon.backend.system.entity.User;
import com.beacon.backend.system.service.UserService;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
  @Autowired
  private UserService userService;

  @PostMapping("/register")
  public ResponseEntity registerUser(@RequestBody @Valid RegisterUser registerUser) {
    userService.saveUser(registerUser);
    return ResponseEntity.ok().build();
  }
}
