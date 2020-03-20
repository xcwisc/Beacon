package com.beacon.backend.system.repository;

import com.beacon.backend.system.entity.City;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City, Integer> {

  List<City> findCityByStateId(Integer id);
}
