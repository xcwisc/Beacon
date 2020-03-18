package com.beacon.backend.system.exception;

import java.util.Map;

public class UserNameAlreadyExistException extends BaseException {

  public UserNameAlreadyExistException(Map<String, Object> data) {
    super(ErrorCode.RESOURCE_NOT_FOUND, data);
  }
}

