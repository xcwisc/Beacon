package com.beacon.backend.system.repository;

import com.beacon.backend.system.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface UserRepository extends JpaRepository<User, Integer> {

  Optional<User> findByUsername(String username);

  @Transactional
  void deleteByUsername(String username);
}
