package com.example.repo;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.Admin; 
@Repository
public interface AdminRepo extends CrudRepository<Admin,Integer>{
	  @Query("select cre.password from Admin cre where cre.username=?1")
	  Iterable<Admin> findAllUsernamePassword( String username);
	}