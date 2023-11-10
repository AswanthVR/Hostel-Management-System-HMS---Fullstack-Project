package com.example.entity;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Students")
public class Student {
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private String id;

    private String name;
    private String email;
    private String phone;
    private String address;
    private String gender;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "admission_date")
    private LocalDate admissionDate;

    private String course;

	
	public Student(String id, String name, String email, String phone, String address, String gender,
			LocalDate dateOfBirth, LocalDate admissionDate, String course) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.address = address;
		this.gender = gender;
		this.dateOfBirth = dateOfBirth;
		this.admissionDate = admissionDate;
		this.course = course;
	}


	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getPhone() {
		return phone;
	}


	public void setPhone(String phone) {
		this.phone = phone;
	}


	public String getAddress() {
		return address;
	}


	public void setAddress(String address) {
		this.address = address;
	}


	public String getGender() {
		return gender;
	}


	public void setGender(String gender) {
		this.gender = gender;
	}


	public LocalDate getDateOfBirth() {
		return dateOfBirth;
	}


	public void setDateOfBirth(LocalDate dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}


	public LocalDate getAdmissionDate() {
		return admissionDate;
	}


	public void setAdmissionDate(LocalDate admissionDate) {
		this.admissionDate = admissionDate;
	}


	public String getCourse() {
		return course;
	}


	public void setCourse(String course) {
		this.course = course;
	}


	public Student() {
		super();
		// TODO Auto-generated constructor stub
	}

    // Constructors




    
}
