package com.beacon.backend.security.constants;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class SecurityConstants {

  public static final String AUTH_LOGIN_URL = "/auth/login";
  public static final String ROLE_CLAIMS = "rol";
  public static final long EXPIRATION = 60L * 60L;
  public static final long EXPIRATION_REMEMBER = 60 * 60 * 24 * 7L;
  public static String JWT_SECRET_KEY;


  public static final String TOKEN_HEADER = "Authorization";
  public static final String TOKEN_PREFIX = "Bearer ";
  public static final String TOKEN_TYPE = "JWT";

  @Value("${security.JWT_security_key}")
  public void setJWT_SECRET_KEY(String secretKey) {
    JWT_SECRET_KEY = secretKey;
  }
}

