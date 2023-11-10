package com.example.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.Fee;

@Repository
public interface FeeRepository extends JpaRepository<Fee, Long> {
    // Add custom methods if needed
}


