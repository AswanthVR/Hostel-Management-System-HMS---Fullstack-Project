import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList
}from "react-icons/fa";
import {
    MdOutlineAddHome,
    MdOutlinePeople,
    MdPlaylistAddCheckCircle
}from "react-icons/md";
import {
    BsFillPersonPlusFill,
    BsClipboardCheckFill
}from "react-icons/bs";
import {
    FcViewDetails
}from "react-icons/fc";
import {
    FiLogOut
}from "react-icons/fi";
import { NavLink } from 'react-router-dom';

const Sidebar = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggle = () => {
    setIsExpanded(!isExpanded);
  };

  const menuItem = [
    {
      path: "/home",
      name: "Dashboard",
      icon: <FaTh />
    },
    {
      path: "/AddStudents",
      name: "Add Students",
      icon: <BsFillPersonPlusFill />
    },
    {
      path: "/AddRooms",
      name: "Add Rooms",
      icon: <MdOutlineAddHome />
    },
    {
      path: "/RoomAllocation",
      name: "Room Allocation",
      icon: <MdPlaylistAddCheckCircle />
    },
    {
      path: "/Student_Details",
      name: "Student Details",
      icon: <FcViewDetails />
    },
    {
      path: "/Attendance",
      name: "Attendance",
      icon: <BsClipboardCheckFill />
    },
    {
      path: "/",
      name: "LOG OUT",
      icon: <FiLogOut />
    }
  ];

  return (
    <div className={`scontainer ${isExpanded ? "sidebar-expanded" : ""}`}>
      <div style={{ width: isExpanded ? "200px" : "70px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isExpanded ? "block" : "none" }} className="logo">HMS</h1>
          <div style={{ marginLeft: isExpanded ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {
          menuItem.map((item, index) => (
            <NavLink to={item.path} key={index} className="link" activeClassName="active">
              <div className="icon">{item.icon}</div>
              <div style={{ display: isExpanded ? "block" : "none" }} className="link_text">{item.name}</div>
            </NavLink>
          ))
        }
      </div>
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Sidebar;
