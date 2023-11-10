import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'; 
import Sidebar from '../components/Sidebar';

const AttendancePage = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const fetchStudentsAndAttendance = async () => {
      try {
        const studentResponse = await axios.get('http://localhost:8080/api/students');
        const studentsData = studentResponse.data;

        const attendanceResponse = await axios.get('http://localhost:8080/api/attendances/get');
        const attendancesData = attendanceResponse.data;

        const attendanceMap = {};
        attendancesData.forEach((attendanceData) => {
          const { studentId, status } = attendanceData;
          attendanceMap[studentId] = status;
        });

        setStudents(studentsData);
        setAttendance(attendanceMap);
      } catch (error) {
        console.error('Error fetching student and attendance data:', error);
      }
    };

    fetchStudentsAndAttendance();
  }, []);

  const handleAttendanceUpdate = async (studentId, attendanceStatus) => {
    if(attendanceStatus == 'PRESENT')
    {
      attendanceStatus ='true';
    }
    else{
      attendanceStatus ='false'
    }
    const currentDate = new Date().toISOString().slice(0, 10);
    const data = {
      student: {
        id: studentId,
      },
      date: currentDate,
      status: attendanceStatus,
    };

    try {
      await axios.post('http://localhost:8080/api/attendances', data);
      setAttendance({ ...attendance, [studentId]: attendanceStatus });
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };

  const filterStudents = () => {
    if (searchQuery.trim() === '') {
      return students;
    } else {
      return students.filter((student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  };

  return (
    <div className='attendance'>
      <Sidebar>
    <div className='box'>
    <Link to={'/attendance_detail'}> <button style={{backgroundColor:"blue"}} className='btn'>VIEW DETAILS</button></Link>
    <div className="attendance-page">
      <h1 style={{fontSize:"30px"}}>ATTENDANCE</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button">Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filterStudents().map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>
                {attendance[student.id] ? (
                  attendance[student.id]
                ) : (
                  <>
                    <button className="present-button" onClick={() => handleAttendanceUpdate(student.id, 'PRESENT')}>
                      Present
                    </button>
                    <button className="absent-button" onClick={() => handleAttendanceUpdate(student.id, 'ABSENT')}>
                      Absent
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
   
    </div>
    </Sidebar>
    </div>
  );
};

export default AttendancePage;
