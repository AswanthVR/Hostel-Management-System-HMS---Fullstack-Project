package com.example.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.RoomAllocation;

@Repository
public interface RoomAllocationRepository extends JpaRepository<RoomAllocation, Long> {
    // Add custom methods if needed
}

