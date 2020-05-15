package com.beacon.backend.system.controller;

import com.beacon.backend.system.entity.BeaconResponse;
import com.beacon.backend.system.service.LocationService;
import java.util.HashMap;
import java.util.Map;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/location")
@Validated
public class LocationController {

  private LocationService locationService;

  @Autowired
  public LocationController(LocationService locationService) {
    this.locationService = locationService;
  }

  @GetMapping("/countries")
  public ResponseEntity<?> getAllCountryName() {
    Map<String, Object> data = new HashMap<>();
    data.put("countries", locationService.getAllCountry());
    BeaconResponse beaconResponse = new BeaconResponse(data);
    return ResponseEntity.status(HttpStatus.OK).body(beaconResponse);
  }

  @GetMapping("/states")
  public ResponseEntity<?> getAllStatesByCountry(
      @Valid @RequestParam("countryId") Integer countryId) {
    Map<String, Object> data = new HashMap<>();
    data.put("states", locationService.getAllStatesByCountry(countryId));
    BeaconResponse beaconResponse = new BeaconResponse(data);
    return ResponseEntity.status(HttpStatus.OK).body(beaconResponse);
  }

  @GetMapping("/cities")
  public ResponseEntity<?> getAllCitiesByState(@Valid @RequestParam("stateId") Integer stateId) {
    Map<String, Object> data = new HashMap<>();
    data.put("cities", locationService.getAllCitiesByState(stateId));
    BeaconResponse beaconResponse = new BeaconResponse(data);
    return ResponseEntity.status(HttpStatus.OK).body(beaconResponse);
  }

}
