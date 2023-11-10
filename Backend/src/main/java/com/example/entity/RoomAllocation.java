package com.example.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "RoomAllocation")
public class RoomAllocation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "allocation_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room; 

    @Column(name = "allocation_date")
    private LocalDate allocationDate;



	public RoomAllocation(Long id, Student student, Room room, LocalDate allocationDate  ) {
		super();
		this.id = id;
		this.student = student;
		this.room = room;
		this.allocationDate = allocationDate;
	 
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	public Room getRoom() {
		return room;
	}

	public void setRoom(Room room) {
		this.room = room;
	}

	public LocalDate getAllocationDate() {
		return allocationDate;
	}

	public void setAllocationDate(LocalDate allocationDate) {
		this.allocationDate = allocationDate;
	}

 

	public RoomAllocation() {
		super();
		// TODO Auto-generated constructor stub
	}

	

    // Constructors

 


}
