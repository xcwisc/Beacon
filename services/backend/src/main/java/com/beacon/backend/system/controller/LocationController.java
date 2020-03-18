package com.beacon.backend.system.controller;

import com.beacon.backend.system.entity.BeaconResponse;
import com.beacon.backend.system.entity.Country;
import com.beacon.backend.system.service.LocationService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/location")
@Validated
public class LocationController {

  @Autowired
  private LocationService locationService;

  @GetMapping("/counties")
  public ResponseEntity<?> getAllCountryName() {
    Map<String, Object> data = new HashMap<>();
    data.put("counties", locationService.getAllCountryName());
    BeaconResponse beaconResponse = new BeaconResponse(data);
    return ResponseEntity.status(HttpStatus.OK).body(beaconResponse);
  }

}
