import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

const StaffManagementPage = () => {
  const [staffList, setStaffList] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  useEffect(() => {
    // Fetch staff data from the Spring Boot API
    fetch('http://localhost:8080/signup/getall')
      .then(response => response.json())
      .then(data => {
        setStaffList(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const handleAddClick = () => {
    setEditingStaff(null);
    setShowAddForm(true);
  };

  const handleEditClick = (staff) => {
    setEditingStaff(staff);
    setShowAddForm(true);
  };

  const handleDeleteClick = (staffId) => {
    // Send a DELETE request to the Spring Boot API
    fetch(`http://localhost:8080/signup/delete/${staffId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          // Remove the deleted staff from the staffList
          setStaffList(prevStaffList =>
            prevStaffList.filter(staff => staff.id !== staffId)
          );
        } else {
          console.error('Error:', response.status);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleFormSubmit = (staffData) => {
    if (editingStaff) {
      // Update existing staff
      fetch(`http://localhost:8080/signup/update/${editingStaff.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(staffData)
      })
        .then(response => response.json())
        .then(updatedStaff => {
          // Update the staffList with the edited staff
          setStaffList(prevStaffList =>
            prevStaffList.map(staff =>
              staff.id === updatedStaff.id ? updatedStaff : staff
            )
          );
          setShowAddForm(false);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      // Add new staff
      fetch('http://localhost:8080/signup/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(staffData)
      })
        .then(response => response.json())
        .then(newStaff => {
          // Add the new staff to the staffList
          setStaffList(prevStaffList => [...prevStaffList, newStaff]);
          setShowAddForm(false);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

  return (
    <div>
      <h1>Staff Management</h1>
     
      {showAddForm ? (
        <StaffForm
          staff={editingStaff}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowAddForm(false)}
        />
      ) : (
        <button onClick={handleAddClick}>Add Staff</button>
        
      )}

      <StaffTable
        staffList={staffList}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
    </div>
  );
};

const StaffTable = ({ staffList, onEdit, onDelete }) => {
  return (
    <>
    <NavLink to={"/"}><button >LOG OUT</button></NavLink>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Username</th>
          <th>Password</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {staffList.map(staff => (
          <tr key={staff.id}>
            <td>{staff.name}</td>
            <td>{staff.username}</td>
            <td>{staff.password}</td>
            <td>
              <button onClick={() => onEdit(staff)}>Edit</button>
              <button onClick={() => onDelete(staff.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table></>
  );
};

const StaffForm = ({ staff, onSubmit, onCancel }) => {
  const [name, setName] = useState(staff ? staff.name : '');
  const [username, setUsername] = useState(staff ? staff.username : '');
  const [password, setPassword] = useState(staff ? staff.password : '');

  const handleSubmit = (e) => {
    e.preventDefault();

    const staffData = {
      name,
      username,
      password
    };

    onSubmit(staffData);
  };

  return (
    <div className='popup'>
    <form onSubmit={handleSubmit} className='popup-form'>
      <div>
        
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">{staff ? 'Save' : 'Add'}</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form></div>
  );
};

export default StaffManagementPage;
