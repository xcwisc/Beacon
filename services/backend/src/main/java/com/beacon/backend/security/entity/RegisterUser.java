package com.beacon.backend.security.entity;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterUser {

  @Size(max = 30)
  @NotNull(message = "username not provided")
  private String username;

  @NotNull(message = "password not provided")
  private String password;

  @Email(message = "invalid email")
  @NotNull(message = "email not provided")
  private String email;

  @NotNull(message = "city_id not provided")
  private Integer city_id;
}
