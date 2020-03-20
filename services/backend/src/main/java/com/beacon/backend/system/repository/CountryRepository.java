package com.beacon.backend.system.repository;

import com.beacon.backend.system.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<Country, Integer> {

}
