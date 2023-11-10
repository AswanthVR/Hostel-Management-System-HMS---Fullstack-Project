import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/room.css';
import { RiHome6Fill } from 'react-icons/ri';
import Sidebar from '../components/Sidebar';

const AddRoomForm = () => {
  const [rooms, setRooms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [newRoomData, setNewRoomData] = useState({
    roomNumber: '',
    capacity: '',
    floor: '',
    availability: false,
  });
  const [editRoomData, setEditRoomData] = useState({
    roomNumber: '',
    capacity: '',
    floor: '',
    availability: false,
  });
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/rooms');
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setEditForm(false);
    setSelectedRoom(null);
    resetForm();
  };

  const toggleEditForm = (room) => {
    setEditForm(!editForm);
    setShowForm(false);
    setSelectedRoom(room);
    setEditRoomData({
      roomNumber: room.roomNumber,
      capacity: room.capacity,
      floor: room.floor,
      availability: room.availability,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'availability') {
      setNewRoomData({ ...newRoomData, [name]: value === 'true' });
      setEditRoomData({ ...editRoomData, [name]: value === 'true' });
    } else {
      setNewRoomData({ ...newRoomData, [name]: value });
      setEditRoomData({ ...editRoomData, [name]: value });
    }
  };

  const resetForm = () => {
    setNewRoomData({
      roomNumber: '',
      capacity: '',
      floor: '',
      availability: false,
    });
    setEditRoomData({
      roomNumber: '',
      capacity: '',
      floor: '',
      availability: false,
    });
  };

  const addRoom = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/rooms', newRoomData);
      const newRoom = response.data;
      setRooms([...rooms, newRoom]);
      resetForm();
      setShowForm(false);
      setNotification('Room successfully added.');
      setTimeout(() => {
        setNotification('');
      }, 1000);
    } catch (error) {
      console.error('Error adding room:', error);
    }
  };

  const editRoom = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/api/rooms/${selectedRoom.id}`,
        editRoomData
      );
      const updatedRoom = response.data;
      const updatedRooms = rooms.map((room) => {
        if (room.id === updatedRoom.id) {
          return updatedRoom;
        }
        return room;
      });
      setRooms(updatedRooms);
      resetForm();
      setEditForm(false);
      setSelectedRoom(null);
      setNotification('Room successfully updated.');
      setTimeout(() => {
        setNotification('');
      }, 1000);
    } catch (error) {
      console.error('Error editing room:', error);
    }
  };

  const deleteRoom = async (roomId) => {
    try {
      await axios.delete(`http://localhost:8080/api/rooms/${roomId}`);
      const updatedRooms = rooms.filter((room) => room.id !== roomId);
      setRooms(updatedRooms);
      setNotification('Room successfully deleted.');
      setTimeout(() => {
        setNotification('');
      }, 1000);
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };
  return (
    <div>
      <Sidebar>
      <h1 style={{fontSize:"30px"}} >Room List</h1>
      <button onClick={toggleForm} className="addbutton">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          viewBox="0 0 20 20"
          height="20"
          fill="none"
          className="svg-icon"
        >
          <g strokeWidth="1.5" strokeLinecap="round" stroke="#de8a2a">
            <circle r="7.5" cy="10" cx="10"></circle>
            <path d="m9.99998 7.5v5"></path>
            <path d="m7.5 9.99998h5"></path>
          </g>
        </svg>
      </button>
      {showForm && (
        <div className="popup">
          <form onSubmit={addRoom} className="popup-form">
            <h2>Add Room</h2>
            <input
              className="room"
              type="text"
              name="roomNumber"
              placeholder="Room Number"
              value={newRoomData.roomNumber}
              onChange={handleInputChange}
              required
            />
            <input
              className="room"
              type="text"
              name="capacity"
              placeholder="Capacity"
              value={newRoomData.capacity}
              onChange={handleInputChange}
              required
            />
            <input
              className="room"
              type="text"
              name="floor"
              placeholder="Floor"
              value={newRoomData.floor}
              onChange={handleInputChange}
              required
            />
            <p1>Availability</p1>
            <select
              name="availability"
              value={newRoomData.availability}
              onChange={handleInputChange}
              required
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
            <br></br>
            <button type="submit">Submit</button>
            <button onClick={toggleForm}>Cancel</button>
          </form>
        </div>
      )}

      {editForm && selectedRoom && (
        <div className="popup">
          <form onSubmit={editRoom} className="popup-form">
            <h2><b>Edit Room</b>  </h2>
            <input
              className="room"
              type="text"
              name="roomNumber"
              placeholder="Room Number"
              value={editRoomData.roomNumber}
              onChange={handleInputChange}
              required
            />
            <input
              className="room"
              type="text"
              name="capacity"
              placeholder="Capacity"
              value={editRoomData.capacity}
              onChange={handleInputChange}
              required
            />
            <input
              className="room"
              type="text"
              name="floor"
              placeholder="Floor"
              value={editRoomData.floor}
              onChange={handleInputChange}
              required
            />
            <p1>Availability</p1>
            <select
              name="availability"
              value={editRoomData.availability}
              onChange={handleInputChange}
              required
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
            <br></br>
            <button type="submit">Save</button>
            <button onClick={toggleEditForm}>Cancel</button>
          </form>
        </div>
      )}

      {notification && (
        <div className="notification">{notification}</div>
      )}

      <div className="card-grid">
        {rooms.map((room) => (
          <div className="card" key={room.room_id}>
            <a className="card1" href="#">
              <p>Room Number: <b>{room.roomNumber}</b></p>
              <p className="small">Capacity: <b>{room.capacity}</b> </p>
              <p className="small">Floor:<b>{room.floor}</b> </p>
              <p className="small">
                Availability: <b>{room.availability? 'Yes' : 'No'}</b>
              </p>
              <div className="go-corner" href="#">
                <div className="go-arrow">
                  <RiHome6Fill />
                </div>
              </div>
              <div className="edit-delete-buttons">
                <button onClick={() => toggleEditForm(room)}>Edit</button>
                <button onClick={() => deleteRoom(room.id)}>Delete</button>
              </div>
            </a>
          </div>
        ))}
      </div>
    </Sidebar>
    </div>
  );
};

export default AddRoomForm;
