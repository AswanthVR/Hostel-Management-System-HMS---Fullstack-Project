package com.example.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.Fee;
import com.example.service.FeeService;

@RestController
@RequestMapping("/api/fees")
public class FeeController {
    private final FeeService feeService;

    public FeeController(FeeService feeService) {
        this.feeService = feeService;
    }

    @GetMapping
    public List<Fee> getAllFees() {
        return feeService.getAllFees();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fee> getFeeById(@PathVariable Long id) {
        Fee fee = feeService.getFeeById(id);
        return ResponseEntity.ok(fee);
    }

    @PostMapping
    public ResponseEntity<Fee> createFee(@RequestBody Fee fee) {
        Fee createdFee = feeService.createFee(fee);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdFee);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Fee> updateFee(@PathVariable Long id, @RequestBody Fee fee) {
        fee.setId(id);
        Fee updatedFee = feeService.updateFee(fee);
        return ResponseEntity.ok(updatedFee);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFee(@PathVariable Long id) {
        feeService.deleteFee(id);
        return ResponseEntity.noContent().build();
    }
}
