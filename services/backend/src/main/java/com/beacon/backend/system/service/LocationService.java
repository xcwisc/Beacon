package com.beacon.backend.system.service;

import com.beacon.backend.system.entity.City;
import com.beacon.backend.system.entity.Country;
import com.beacon.backend.system.entity.State;
import com.beacon.backend.system.repository.CityRepository;
import com.beacon.backend.system.repository.CountryRepository;
import com.beacon.backend.system.repository.StateRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LocationService {

  private CountryRepository countryRepository;
  private StateRepository stateRepository;
  private CityRepository cityRepository;

  @Autowired
  public LocationService(CountryRepository countryRepository, StateRepository stateRepository,
      CityRepository cityRepository) {
    this.countryRepository = countryRepository;
    this.stateRepository = stateRepository;
    this.cityRepository = cityRepository;
  }

  public List<Country> getAllCountry() {
    return countryRepository.findAll();
  }

  public List<State> getAllStatesByCountry(Integer countryId) {
    return stateRepository.findStateByCountryId(countryId);
  }

  public List<City> getAllCitiesByState(Integer stateId) {
    return cityRepository.findCityByStateId(stateId);
  }
}
