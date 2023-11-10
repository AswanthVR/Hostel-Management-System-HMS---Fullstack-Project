package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.Admin;
import com.example.entity.SignUp;
import com.example.repo.AdminRepo;
import com.example.service.SignUpService;

@RestController
@CrossOrigin
@RequestMapping("/login")
public class AdminController {
	  @Autowired 
	  AdminRepo repo;
	  
	  @GetMapping("/getadmin")
	  public Iterable<Admin> GetAll(){
		    return repo.findAll();
		 }
}
