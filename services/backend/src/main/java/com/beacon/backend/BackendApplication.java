package com.beacon.backend;

import com.beacon.backend.system.entity.City;
import com.beacon.backend.system.entity.Country;
import com.beacon.backend.system.entity.State;
import com.beacon.backend.system.repository.CityRepository;
import com.beacon.backend.system.repository.CountryRepository;
import com.beacon.backend.system.repository.StateRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {

  public static void main(String[] args) {
    SpringApplication.run(BackendApplication.class, args);
  }

  @Bean
  CommandLineRunner initDatabase(CountryRepository countryRepository,
      StateRepository stateRepository, CityRepository cityRepository) {
    return args -> {
      Country c1 = new Country();
      c1.setId(1);
      c1.setName("China");

      Country c2 = new Country();
      c2.setId(2);
      c2.setName("United States");

      State s1 = new State();
      s1.setId(1);
      s1.setCountry(c1);
      s1.setName("ZheJiang");

      State s2 = new State();
      s2.setId(2);
      s2.setCountry(c2);
      s2.setName("Wisconsin");

      City ci1 = new City();
      ci1.setId(1);
			ci1.setState(s1);
			ci1.setName("HangZhou");

			City ci2 = new City();
			ci2.setId(2);
			ci2.setState(s2);
			ci2.setName("Madison");

			City ci3 = new City();
			ci3.setId(3);
			ci3.setState(s2);
			ci3.setName("Milwaukee");

      countryRepository.save(c1);
      countryRepository.save(c2);
      stateRepository.save(s1);
      stateRepository.save(s2);
			cityRepository.save(ci1);
			cityRepository.save(ci2);
			cityRepository.save(ci3);
    };
  }
}
