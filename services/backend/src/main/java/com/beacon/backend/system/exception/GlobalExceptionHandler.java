package com.beacon.backend.system.exception;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@ControllerAdvice(annotations = RestController.class)
@ResponseBody
public class GlobalExceptionHandler {

  /**
   * general app exception handling
   *
   * @param ex
   * @param request
   * @return
   */
  @ExceptionHandler(BaseException.class)
  public ResponseEntity<?> handleAppException(BaseException ex, HttpServletRequest request) {
    ErrorReponse response = new ErrorReponse(ex, request.getRequestURI());
    return new ResponseEntity<>(response, new HttpHeaders(), ex.getError().getStatus());
  }

  /**
   * request body validation failure
   *
   * @param ex
   * @param request
   * @return
   */
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<?> handleValidationExceptions(
      MethodArgumentNotValidException ex, HttpServletRequest request) {
    Map<String, Object> data = new HashMap<>();
    ex.getBindingResult().getAllErrors().forEach((error) -> {
      String fieldName = ((FieldError) error).getField();
      String errorMessage = error.getDefaultMessage();
      data.put(fieldName, errorMessage);
    });
    ErrorReponse response = new ErrorReponse(1002, HttpStatus.BAD_REQUEST.value(), ex.getMessage(),
        request.getRequestURI(), data);
    return new ResponseEntity<>(response, new HttpHeaders(), HttpStatus.BAD_REQUEST);
  }

  /**
   * request param validation failure
   *
   * @param e
   * @param request
   * @return
   */
  @ExceptionHandler(ConstraintViolationException.class)
  ResponseEntity<?> handleConstraintViolationException(ConstraintViolationException e,
      HttpServletRequest request) {
    ErrorReponse response = new ErrorReponse(1002, HttpStatus.BAD_REQUEST.value(), e.getMessage(),
        request.getRequestURI(), null);
    return new ResponseEntity<>(response, new HttpHeaders(), HttpStatus.BAD_REQUEST);
  }
}
