package com.pramithas.service;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.pramithas.models.User;
import com.pramithas.repository.UserRepository;
import com.pramithas.utils.SecurityUtils;

/**
 * Spring Security success handler, specialized for Ajax requests.
 */
@Component
public class RestAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

	@Autowired
	private UserRepository userService;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws ServletException, IOException {
		User user = userService.findByLogin(authentication.getName());
		SecurityUtils.sendResponse(response, HttpServletResponse.SC_OK, user);
	}
}
