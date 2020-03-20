package com.beacon.backend.security.filter;

import com.beacon.backend.security.constants.SecurityConstants;
import com.beacon.backend.security.entity.JwtUser;
import com.beacon.backend.security.entity.LoginUser;
import com.beacon.backend.security.utils.JwtTokenUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

  private ThreadLocal<Boolean> rememberMe = new ThreadLocal<>();
  private AuthenticationManager authenticationManager;


  public JWTAuthenticationFilter(
      AuthenticationManager authenticationManager) {
    this.authenticationManager = authenticationManager;
    super.setFilterProcessesUrl(SecurityConstants.AUTH_LOGIN_URL);
  }

  @Override
  public Authentication attemptAuthentication(HttpServletRequest request,
      HttpServletResponse response) throws AuthenticationException {

    ObjectMapper objectMapper = new ObjectMapper();
    try {
      LoginUser loginUser = objectMapper.readValue(request.getInputStream(), LoginUser.class);
      rememberMe.set(loginUser.getRememberMe());
      UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(
          loginUser.getUsername(), loginUser.getPassword());
      return authenticationManager.authenticate(authRequest);
    } catch (IOException e) {
      e.printStackTrace();
      return null;
    }
  }

  @Override
  protected void successfulAuthentication(HttpServletRequest request,
      HttpServletResponse response,
      FilterChain chain,
      Authentication authentication) {

    JwtUser jwtUser = (JwtUser) authentication.getPrincipal();
    List<String> roles = jwtUser.getAuthorities()
        .stream()
        .map(GrantedAuthority::getAuthority)
        .collect(Collectors.toList());
    String token = JwtTokenUtils.createToken(jwtUser.getUsername(), roles, rememberMe.get());
    response.setHeader(SecurityConstants.TOKEN_HEADER, token);
  }

  @Override
  protected void unsuccessfulAuthentication(HttpServletRequest request,
      HttpServletResponse response, AuthenticationException authenticationException)
      throws IOException {
    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authenticationException.getMessage());
  }
}
