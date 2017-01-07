package com.pramithas.controllers;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
class LoginController {

	Logger log = Logger.getLogger(LoginController.class);

	@RequestMapping("/user")
	private String getPrincipal() {
		log.info("controller has been called . fuck yeah!!!!!!!!!");
		/*
		 * String userName = ""; Object principal =
		 * SecurityContextHolder.getContext().getAuthentication().getPrincipal()
		 * ; log.info("The value of the principle is " + principal); if
		 * (principal instanceof UserDetails) { userName = ((UserDetails)
		 * principal).getUsername(); } else { userName = principal.toString(); }
		 * return userName;
		 */
		return "";
	}
}