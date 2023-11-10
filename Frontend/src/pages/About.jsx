import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/student.css';
import Sidebar from '../components/Sidebar';

function About() {
  const [students, setStudents] = useState([]);
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

  const [showStudentDetails, setShowStudentDetails] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const deleteStudent = (id) => {
    fetch(`http://localhost:8080/api/students/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setStudents(students.filter((student) => student.id !== id));
        } else {
          throw new Error('Error: ' + response.status);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const editStudent = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/api/students/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error: ' + response.status);
        }
      })
      .then((data) => {
        console.log(data);
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const toggleContent = () => {
    setShowStudentDetails(!showStudentDetails);
  };

  const handleEditChange = (e) => {
    setSelectedStudent({ ...selectedStudent, [e.target.name]: e.target.value });
  };

  const updateStudent = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/api/students/${selectedStudent.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedStudent),
    })
      .then((response) => {
        if (response.ok) {
          setIsModalOpen(false);
          fetchStudents();
        } else {
          throw new Error('Error: ' + response.status);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <>
    <Sidebar>
      <div className="toggle-button">
        <button onClick={toggleContent}>{showStudentDetails ? 'Add Students' : 'View Students'}</button>
      </div>

      {showStudentDetails ? (
        <div>
          <h2 style={{ textAlign: 'center' }}>Student Details</h2>
          <table>
            <thead>
              <tr>
                <th>Reg No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Course</th>
                <th>Date of Birth</th>
                <th>Admission Date</th>
                <th>Address</th>
                <th>Gender</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.course}</td>
                  <td>{student.dateOfBirth}</td>
                  <td>{student.admissionDate}</td>
                  <td>{student.address}</td>
                  <td>{student.gender}</td>
                  <td>
                    <button className='btn' onClick={() => deleteStudent(student.id)}>Delete</button>
                    <button style={{paddingRight:"29px" , marginTop:"10px"}} onClick={() => editStudent(student)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="all">
          <div className="fcontainer">
            <div className="title">ADD STUDENTS</div>
            <div className="content">
            <form onSubmit={handleSubmit} >
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
        </div>
      )}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Student</h2>
            <form onSubmit={updateStudent}>
              <div className="input-box">
                <span className="details">Reg No</span>
                <input
                  type="text"
                  name="id"
                  value={selectedStudent.id}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Name</span>
                <input
                  type="text"
                  name="name"
                  value={selectedStudent.name}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="email"
                  name="email"
                  value={selectedStudent.email}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Phone</span>
                <input
                  type="tel"
                  name="phone"
                  value={selectedStudent.phone}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Course</span>
                <input
                  type="text"
                  name="course"
                  value={selectedStudent.course}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Date of Birth</span>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={selectedStudent.dateOfBirth}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Admission Date</span>
                <input
                  type="date"
                  name="admissionDate"
                  value={selectedStudent.admissionDate}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Address</span>
                <input
                  type="text"
                  name="address"
                  value={selectedStudent.address}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="button">
                <input type="submit" value="Save" />
                <input style={{backgroundColor:"red"}} onClick={() => setIsModalOpen(false)} type="submit" value="Cancel" />
                {/* <button style={{paddingRight:"397px"}} onClick={() => setIsModalOpen(false)}>Cancel</button> */}
              </div>
            </form>
          </div>
        </div>
      )}
    </Sidebar>
    </>
  );
}

export default About;
