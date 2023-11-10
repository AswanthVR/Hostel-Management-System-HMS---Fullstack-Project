import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function AddStudents() {
  const [toggleState, setToggleState] = useState(true);
  const [studentData, setStudentData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!toggleState) {
      // Fetch student data from the Spring Boot API
      fetch('http://localhost:8080/api/students')
        .then((response) => response.json())
        .then((data) => setStudentData(data))
        .catch((error) => console.error('Error:', error));
    }
  }, [toggleState]);

  const handleToggle = () => {
    setToggleState(!toggleState);
  };

  const handleAddStudentSubmit = (formData) => {
    // Send the form data to the Spring Boot API
    fetch('http://localhost:8080/api/students/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // Handle the response from the server
          return response.json();
        } else {
          throw new Error('Error: ' + response.status);
        }
      })
      .then((data) => {
        console.log(data);
        navigate('/AddStudents');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className='all'>
      <Sidebar>
      <div className="fcontainer">
        <div className="title">
          <button onClick={handleToggle}>
            {toggleState ? 'Add Students' : 'View Students'}
          </button>
        </div>
        <div className="content">
          {toggleState ? (
            <AddStudentsForm onSubmit={handleAddStudentSubmit} />
          ) : (
            <ViewStudentsTable studentData={studentData} />
          )}
        </div>
      </div>
    </Sidebar>
    </div>
  );
}

function AddStudentsForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    course: '',
    dateOfBirth: '',
    admissionDate: '',
    address: '',
    gender: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className='all'>
      <Sidebar>
    <div className="fcontainer">
      <div className="title">ADD STUDENTS</div>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <div className="user-details">
            <div className="input-box">
              <span className="details">Reg No</span>
              <input
                type="text"
                name="id"
                placeholder="Enter Register No"
                value={formData.id}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Full Name</span>
              <input
                type="text"
                name="name"
                placeholder="Enter Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Email</span>
              <input
                type="text"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Phone Number</span>
              <input
                type="text"
                name="phone"
                placeholder="Enter number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Course</span>
              <input
                type="text"
                name="course"
                placeholder="Enter Course Name"
                value={formData.course}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Date Of Birth</span>
              <input
                type="text"
                name="dateOfBirth"
                placeholder="YYYY-MM-DD"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Date Of Admission</span>
              <input
                type="text"
                name="admissionDate"
                placeholder="YYYY-MM-DD"
                value={formData.admissionDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Address</span>
              <input
                type="text"
                name="address"
                placeholder="Enter Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="gender-details">
            <input
              type="radio"
              name="gender"
              id="dot-1"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={handleChange}
            />
            <input
              type="radio"
              name="gender"
              id="dot-2"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={handleChange}
            />

            <span className="gender-title">Gender</span>
            <div className="category">
              <label htmlFor="dot-1">
                <span className="dot one" />
                <span className="gender">Male</span>
              </label>
              <label htmlFor="dot-2">
                <span className="dot two" />
                <span className="gender">Female</span>
              </label>
            </div>
          </div>
          <div className="button">
            <input type="submit" value="Register" />
          </div>
        </form>
      </div>
    </div>
    </Sidebar>
  </div>
  );
}

function ViewStudentsTable({ studentData }) {
  return (
    <Sidebar>
    <table>
      <thead>
        <tr>
          <th>Student ID</th>
          <th>Name</th>
          <th>Course</th>
        </tr>
      </thead>
      <tbody>
        {studentData.map((student) => (
          <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.course}</td>
          </tr>
        ))}
      </tbody>
    </table>
      </Sidebar>
  );
}

export default AddStudents;
