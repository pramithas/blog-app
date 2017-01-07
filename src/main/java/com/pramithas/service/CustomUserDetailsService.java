package com.pramithas.service;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.pramithas.models.User;
import com.pramithas.repository.UserRepository;
import com.pramithas.repository.UserRolesRepository;


@Service("customUserDetailsService")
public class CustomUserDetailsService implements UserDetailsService {

	private final UserRepository userRepository;
	private final UserRolesRepository userRolesRepository;

	Logger log = Logger.getLogger(CustomUserDetailsService.class);

	@Autowired
	public CustomUserDetailsService(UserRepository userRepository, UserRolesRepository userRolesRepository) {
		this.userRepository = userRepository;
		this.userRolesRepository = userRolesRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {

		User user = userRepository.findByLogin(login);
		log.info(user);
		if (null == user) {
			throw new UsernameNotFoundException("No user present with username: " + login);
		} else {
			List<String> userRoles = userRolesRepository.findRoleByLogin(login);
			return new CustomUserDetails(user, userRoles);
		}
	}
}
