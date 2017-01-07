package com.pramithas.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.pramithas.models.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
	public User findByLogin(String username);
}
