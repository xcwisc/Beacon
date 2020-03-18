package com.beacon.backend.system.service;

import com.beacon.backend.system.repository.CountryRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LocationService {

  private CountryRepository countryRepository;

  @Autowired
  public LocationService(CountryRepository countryRepository) {
    this.countryRepository = countryRepository;
  }

  public List<String> getAllCountryName() {
    List<String> countryNames = countryRepository.findAll().stream()
        .map(country -> country.getCountryName()).collect(
            Collectors.toList());
    return countryNames;
  }
}
