package com.beacon.backend.system.service;

import com.beacon.backend.system.entity.User;
import com.beacon.backend.system.exception.UserNameAlreadyExistException;
import com.beacon.backend.system.repository.UserRepository;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  private UserRepository userRepository;
  private BCryptPasswordEncoder bCryptPasswordEncoder;

  public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
    this.userRepository = userRepository;
    this.bCryptPasswordEncoder = bCryptPasswordEncoder;
  }

  public void saveUser(Map<String, String> registerUser) {
    Optional<User> optionalUser = userRepository.findByUsername(registerUser.get("username"));
    if (optionalUser.isPresent()) {
      throw new UserNameAlreadyExistException(null);
    }
    User user = new User();
    user.setUsername(registerUser.get("username"));
    user.setPassword(bCryptPasswordEncoder.encode(registerUser.get("password")));
    user.setRoles("USER");
    userRepository.save(user);
  }

  public User findUserByUserName(String name) {
    return userRepository.findByUsername(name)
        .orElseThrow(() -> new UsernameNotFoundException("No user found with username " + name));
  }

  public void deleteUserByUserName(String name) {
    userRepository.deleteByUsername(name);
  }


  public Page<User> getAllUser(int pageNum, int pageSize) {
    return userRepository.findAll(PageRequest.of(pageNum, pageSize));
  }
}
