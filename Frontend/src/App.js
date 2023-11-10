import React from 'react';
import './App.css'; 
import WebFont from "webfontloader";

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard.jsx';
import About from './pages/About.jsx';
import AddRoomForm from './pages/AddRoomForm'; 
import Product from './pages/StudentDetails.jsx';
import AttendancePage from './pages/Attendance';
import RoomAllocation from './pages/RoomAllocation.jsx'; 

import Login from './pages/Login';
import Admin from './pages/AdminLogin';
import StaffManagementPage from './pages/AddStaff';
import Nav from './components/Nav';
import SearchPage from './pages/SearchPage'; 

      
const App = () => {
 
  
  return (
    
    <div className='app'>   
     <BrowserRouter>
     <Nav></Nav>

      
         {/* <Sidebar> */}
 
        <Routes>
          <Route path="/" element={<Login/>} /> 
          <Route path="/add_staff" element={<StaffManagementPage />} /> 
          <Route path="/admin_login" element={<Admin />} /> 
          <Route path="/home" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/AddStudents" element={<About />} />
          <Route path="/RoomAllocation" element={<RoomAllocation />} />
          <Route path="/AddRooms" element={<AddRoomForm />} />
          <Route path="/Student_Details" element={<Product />} />
          <Route path="/Attendance" element={<AttendancePage />} />
          <Route  path="/attendance_detail" element={<SearchPage/>}/>
        </Routes>
       

        {/* </Sidebar> */}
        
    </BrowserRouter>
    </div>

  );
};

export default App;