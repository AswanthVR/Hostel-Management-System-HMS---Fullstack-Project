import "../CSS/allocationdatails.css";
 import React, { useState, useEffect } from 'react';
import Sidebar from "../components/Sidebar";

function StudentRoomAllocation() {
  const [allocations, setAllocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAllocations, setFilteredAllocations] = useState([]);
  const [selectedAllocation, setSelectedAllocation] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/api/roomAllocations')
      .then(response => response.json())
      .then(data => setAllocations(data));
  }, []);

  useEffect(() => {
    const filtered = allocations.filter(allocation => {
      const studentName = allocation.student.name.toLowerCase();
      const searchQueryLower = searchQuery.toLowerCase();
      return studentName.includes(searchQueryLower);
    });
    setFilteredAllocations(filtered);
  }, [allocations, searchQuery]);

  const handleView = allocation => {
    setSelectedAllocation(allocation);
    setShowModal(true);
  };

  const handleClose = () => {
    setSelectedAllocation(null);
    setShowModal(false);
  };

  return (
    <Sidebar>
    
    <div className="student-room-allocation">
      <div className="header">
        <h2 style={{fontSize:"30px" , display:"flex" , justifyContent:"center" , textAlign:"center"}}>STUDENT DETAILS</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a student"
            value={searchQuery}
            onChange={event => setSearchQuery(event.target.value)}
          />
          <button type="button">Search</button>
        </div>
      </div>
      <table className="allocation-table">
        <thead>
          <tr>
            <th>REGISTER NO</th>
            <th>NAME</th>
            <th>COURSE</th>
            <th>ROON NO</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {filteredAllocations.map(allocation => (
            <tr
              key={allocation.allocation_id}
              onClick={() => handleView(allocation)}
              className="allocation-row"
            >
              <td>{allocation.student.id}</td>
              <td>{allocation.student.name}</td>
              <td>{allocation.student.course}</td>
              <td>{allocation.room.roomNumber}</td>
              <td>
                <button onClick={() => handleView(allocation)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && selectedAllocation && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h5>{selectedAllocation.student.name}</h5>
              <button type="button" onClick={handleClose}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <table className="student-details">
                <tbody>
                  <tr>
                    <td>Register No:</td>
                    <td>{selectedAllocation.student.id}</td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>{selectedAllocation.student.email}</td>
                  </tr>
                  <tr>
                    <td>Phone:</td>
                    <td>{selectedAllocation.student.phone}</td>
                  </tr>
                  <tr>
                    <td>Address:</td>
                    <td>{selectedAllocation.student.address}</td>
                  </tr>
                  <tr>
                    <td>Date of Birth:</td>
                    <td>{selectedAllocation.student.dateOfBirth}</td>
                  </tr>
                  <tr>
                    <td>Admission Date:</td>
                    <td>{selectedAllocation.student.admissionDate}</td>
                  </tr>
                 
                  <tr>
                    <td>Room No:</td>
                    <td>{selectedAllocation.room.roomNumber}</td>
                  </tr>
                  <tr>
                    <td>Room Floor:</td>
                    <td>{selectedAllocation.room.floor}</td>
                  </tr>
                 
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button type="button" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div></Sidebar>
  );
}

export default StudentRoomAllocation;
