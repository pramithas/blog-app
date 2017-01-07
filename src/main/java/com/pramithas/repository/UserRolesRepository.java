package com.pramithas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.pramithas.models.UserRole;

@Repository
public interface UserRolesRepository extends CrudRepository<UserRole, Long> {
	@Query("select a.role from UserRole a, User b where b.login=?1 and a.userid=b.userId")
	public List<String> findRoleByLogin(String username);
}
