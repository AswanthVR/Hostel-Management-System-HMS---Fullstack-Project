package com.example.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.entity.RoomAllocation;
import com.example.repo.RoomAllocationRepository;

@Service
public class RoomAllocationService {
    private final RoomAllocationRepository roomAllocationRepository;

    public RoomAllocationService(RoomAllocationRepository roomAllocationRepository) {
        this.roomAllocationRepository = roomAllocationRepository;
    }

    public List<RoomAllocation> getAllRoomAllocations() {
        return roomAllocationRepository.findAll();
    }

    public RoomAllocation getRoomAllocationById(Long id) {
        return roomAllocationRepository.findById(id).orElse(null);
    }

    public RoomAllocation createRoomAllocation(RoomAllocation roomAllocation) {
        return roomAllocationRepository.save(roomAllocation);
    }

    public void deleteRoomAllocation(Long id) {
        roomAllocationRepository.deleteById(id);
    }
    public RoomAllocation updateRoomAllocation(RoomAllocation roomAllocation) {
        return roomAllocationRepository.save(roomAllocation);
    }

}
