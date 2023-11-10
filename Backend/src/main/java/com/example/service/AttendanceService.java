package com.example.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Attendance;
import com.example.repo.AttendanceRepository; 

@Service
public class AttendanceService {
    private final AttendanceRepository attendanceRepository;

    @Autowired
    public AttendanceService(AttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    public Attendance saveAttendance(Attendance attendance) {
        return attendanceRepository.save(attendance);
    }

    public Attendance getAttendanceById(Long id) {
        return attendanceRepository.findById(id).orElse(null);
    }

    public List<Attendance> getAllAttendances() {
        return attendanceRepository.findAll();
    }

    public void deleteAttendance(Long id) {
        attendanceRepository.deleteById(id);
    }
    
    public List<Attendance> getAttendancesByDate(LocalDate date) {
        return attendanceRepository.findByDate(date);
}
}
