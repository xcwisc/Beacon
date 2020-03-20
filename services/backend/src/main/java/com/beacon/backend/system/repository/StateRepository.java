package com.beacon.backend.system.repository;

import com.beacon.backend.system.entity.State;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StateRepository extends JpaRepository<State, Integer> {

  List<State> findStateByCountryId(Integer id);
}
