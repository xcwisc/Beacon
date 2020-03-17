package com.beacon.backend.system.exception;

public class UserNameAlreadyExistException extends RuntimeException {
  public UserNameAlreadyExistException() {
  }

  public UserNameAlreadyExistException(String message) {
    super(message);
  }
}

