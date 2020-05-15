package com.beacon.backend.system.service;

import com.beacon.backend.security.entity.RegisterUser;
import com.beacon.backend.system.entity.City;
import com.beacon.backend.system.entity.User;
import com.beacon.backend.system.exception.RequestValidationFailedException;
import com.beacon.backend.system.exception.UserNameAlreadyExistException;
import com.beacon.backend.system.repository.UserRepository;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  private UserRepository userRepository;
  private BCryptPasswordEncoder bCryptPasswordEncoder;
  private LocationService locationService;

  public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder,
      LocationService locationService) {
    this.userRepository = userRepository;
    this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    this.locationService = locationService;
  }

  public void saveUser(RegisterUser registerUser) throws UserNameAlreadyExistException {
    Optional<User> optionalUser = userRepository.findByUsername(registerUser.getUsername());
    if (optionalUser.isPresent()) {
      throw new UserNameAlreadyExistException(null);
    }

    User user = new User();
    user.setUsername(registerUser.getUsername());
    user.setPassword(bCryptPasswordEncoder.encode(registerUser.getPassword()));
    user.setRoles("USER");
    user.setEmail(registerUser.getEmail());

    Integer city_id = registerUser.getCity_id();
    Optional<City> optionalCity = locationService.getCityById(city_id);
    if (optionalCity.isEmpty()) {
      Map<String, Object> data = new HashMap<>();
      data.put("city_id", "invalid");
      throw new RequestValidationFailedException(data);
    }
    user.setCity(optionalCity.get());

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
