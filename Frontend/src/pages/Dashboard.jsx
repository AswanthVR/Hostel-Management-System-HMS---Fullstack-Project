import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../CSS/dashboard.css'
import Sidebar from '../components/Sidebar';
const Dashboard = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [roomCount, setRoomCount] = useState(0);
  const [allocationCount, setAllocationCount] = useState(0);

  useEffect(() => {
    // Fetch data from Spring Boot backend
    fetchStudentCount();
    fetchRoomCount();
    fetchAllocationCount();
  }, []);

  const fetchStudentCount = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/students');
      const data = await response.json();
      setStudentCount(data.length);
    } catch (error) {
      console.error('Error fetching student count:', error);
    }
  };

  const fetchRoomCount = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/rooms');
      const data = await response.json();
      setRoomCount(data.length);
    } catch (error) {
      console.error('Error fetching room count:', error);
    }
  };

  const fetchAllocationCount = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/roomAllocations');
      const data = await response.json();
      setAllocationCount(data.length);
    } catch (error) {
      console.error('Error fetching allocation count:', error);
    }
  };

  return (
    <div>
      <Sidebar>
              <h1 style={{fontSize:"30px"}}>DASHBOARD</h1>
<div className='dashboard'>
      <div class="dashcard">
  <div class="first-content">
    <span>STUDENT COUNT : {studentCount}</span>
  </div>
  <div class="second-content">
<span><Link to="/AddStudents" style={{color:"black"}}>Add Students</Link></span>
  </div>
</div>

<div class="dashcard">
  <div class="first-content">
    <span>ROOM COUNT : {roomCount}</span>
  </div>
  <div class="second-content">
  <span><Link to="/AddRooms" style={{color:"black"}}>Add Rooms</Link></span>
  </div>
</div>

      <div class="dashcard">
  <div class="first-content">
    <span>ALLOCATION COUNT : {allocationCount}</span>

  </div>
  <div class="second-content">
<span><Link to="/RoomAllocation" style={{color:"black"}}>ALLOCATE</Link></span>
  </div>
</div>
      <div class="dashcard  ">
  <div class="first-content">
    <span>ATTENDENCE </span>
  </div>
  <div class="second-content">
  <span><Link to="/Attendance" style={{color:"black"}}>View Attendance</Link></span>
  </div>
</div>
      <div class="dashcard  ">
  <div class="first-content">
    <span>STUDENT DETAILS</span>
  </div>
  <div class="second-content">
  <span><Link to="/Student_Details" style={{color:"black"}}>View</Link></span>
  </div>
</div>
      <div class="dashcard  ">
  <div class="first-content">
    <span>SWITCH TO ADMIN</span>
  </div>
  <div class="second-content">
  <span><Link to="/admin_login  " style={{color:"black"}}>LOGIN</Link></span>
  </div>
</div>
</div>
</Sidebar>
</div>


    
    
  );
};

export default Dashboard;
