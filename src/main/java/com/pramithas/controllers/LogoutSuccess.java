package com.pramithas.controllers;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

@Component
public class LogoutSuccess implements LogoutSuccessHandler {

	private final Logger logger = Logger.getLogger(LogoutSuccess.class);

	@Override
	public void onLogoutSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
			Authentication authentication) throws IOException, ServletException {
		logger.info("The authentication variable is" + authentication);
		if (authentication != null && authentication.getDetails() != null) {
			try {
				httpServletRequest.getSession().invalidate();
				// you can add more codes here when the user successfully logs
				// out,
				// such as updating the database for last active.
			} catch (Exception e) {
				e.printStackTrace();
				e = null;
			}
		}

		httpServletResponse.setStatus(HttpServletResponse.SC_OK);

	}
}
