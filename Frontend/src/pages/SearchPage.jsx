import React, { useState } from 'react';
// import '../CSS/Searchpage.css'
import Sidebar from '../components/Sidebar';
const SearchPage = () => {
  const [searchInput, setSearchInput] = useState('');
  const [data, setData] = useState([]);

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    // Perform the search based on the searchInput value
    // Make an API call to fetch the data from the server
    // Assuming you have a backend server running at http://localhost:8080
    // Adjust the URL and query parameter according to your server implementation
    fetch(`http://localhost:8080/api/attendances/date?date=${searchInput}`)
      .then((response) => response.json())
      .then((responseData) => {
        // Update the 'data' state with the fetched data
        setData(responseData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div>
      <Sidebar>
    <div className="your-search-page-class">
     <div className='search' style={{display:"flex",justifyContent:"center"}}>
      <input
        type="date"
        value={searchInput}
        onChange={handleInputChange}
        className="your-search-input-class"
      />
      <button onClick={handleSearch} className="your-search-button-class">Search</button>
      </div>
      <table className="your-search-results-table-class">
        <thead>
          <tr>
            <th>ID</th>
            <th>Student ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Admission Date</th>
            <th>Course</th>
            <th>Date</th>
            <th><b>Status</b></th>
          </tr>
        </thead>
        <tbody>
          {data.map((attendance) => (
            <tr key={attendance.id}>
              <td>{attendance.id}</td>
              <td>{attendance.student.id}</td>
              <td>{attendance.student.name}</td>
              <td>{attendance.student.email}</td>
              <td>{attendance.student.dateOfBirth}</td>
              <td>{attendance.student.admissionDate}</td>
              <td>{attendance.student.course}</td>
              <td>{attendance.date}</td>
              <td><b>{attendance.status ? 'Present' : 'Absent'}</b></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </Sidebar>
    </div>
  );
};

export default SearchPage;
