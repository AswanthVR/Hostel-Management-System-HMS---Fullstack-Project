package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.SignUp;
import com.example.repo.SignUpRepo;

@RestController
@CrossOrigin
@RequestMapping("/signup")
public class SignUpController {
  @Autowired SignUpRepo repo;
  @PostMapping("/post")
  private SignUp PostUser(@RequestBody SignUp s){
    return repo.save(s);
  }
  

  @PutMapping("/update/{id}")
  private SignUp updateUser(@PathVariable int id, @RequestBody SignUp s) {
    SignUp existingSignUp = repo.findById(id).orElse(null);
    if (existingSignUp != null) {
      existingSignUp.setName(s.getName());
      existingSignUp.setUsername(s.getUsername());
      existingSignUp.setPassword(s.getPassword());
      return repo.save(existingSignUp);
    } else {
      throw new IllegalArgumentException("Invalid SignUp ID: " + id);
    }
  }

  @DeleteMapping("/delete/{id}")
  private void deleteUser(@PathVariable int id) {
    SignUp existingSignUp = repo.findById(id).orElse(null);
    if (existingSignUp != null) {
      repo.delete(existingSignUp);
    } else {
      throw new IllegalArgumentException("Invalid SignUp ID: " + id);
    }
  }
  @GetMapping("/getall")
  private List<SignUp> getAllUsers() {
    return (List<SignUp>) repo.findAll();
  }
}