package com.beacon.backend.system.entity;

import java.util.HashMap;
import java.util.Map;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.util.ObjectUtils;

@Getter
@Setter
public class BeaconResponse {

  private int status;
  private Map<String, Object> data = new HashMap<String, Object>();

  public BeaconResponse(Map<String, Object> data) {
    this.status = HttpStatus.OK.value();
    if (!ObjectUtils.isEmpty(data)) {
      this.data.putAll(data);
    }
  }
}
