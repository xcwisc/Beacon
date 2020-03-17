package com.beacon.backend.security.exception;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

public class JWTAccessDeniedHandler implements AccessDeniedHandler {

  @Override
  public void handle(HttpServletRequest request, HttpServletResponse response,
      AccessDeniedException accessDeniedException) throws IOException, ServletException {
    accessDeniedException = new AccessDeniedException("Sorry you don not enough permissions to access it!");
    response.sendError(HttpServletResponse.SC_FORBIDDEN, accessDeniedException.getMessage());
  }
}
