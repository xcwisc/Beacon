package com.beacon.backend.system.entity;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@Entity
@Data
@Table(name = "user")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Integer id;

  @Column(name = "username")
  private String username;

  @Column(name = "password")
  private String password;

  @Column(name = "roles")
  private String roles;

  public List<SimpleGrantedAuthority> getRoles() {
    List<SimpleGrantedAuthority> authorities = new ArrayList<>();
    Arrays.stream(roles.split(",")).forEach(role ->
        authorities.add(new SimpleGrantedAuthority("ROLE_" + role)));
    return authorities;
  }
}
