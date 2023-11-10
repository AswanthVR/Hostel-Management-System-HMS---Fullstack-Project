import React, { useEffect, useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom' 
import '../CSS/Adminlogin.css'
 

function Admin() {
    const nav=useNavigate();
  const[username,setUsername]=useState('');
  const[password,setpassword]=useState('');
  const[user,setUser]=useState('');
  const fetchData = () => {
    return fetch("http://localhost:8080/login/getadmin")
    .then((response) => response.json())
    .then((data) => setUser(data));
  }
  useEffect(() => {
    fetchData();
  },[])
  const authenticate=(e)=>{
    e.preventDefault();
  const usercheck = user.find(user => (user.username === username && user.password === password));
 if(username.length===0){
  alert("Enter Username")
 }
 else if(password.length===0){
  alert("Enter password")
 }
  else if(!usercheck){
    alert("Wrong Username or Password!")
  }
  else {
    nav("/add_staff")
  }
}
  return (
    <div className='loginall'>
    <div class="wrapper-admin">
  <div class="container-admin">
    <div class="col-left-admin">
      <div class="login-text-admin">
        <h2>Welcome Back</h2>
        <p>FOR STAFF LOGIN  <br></br>Click Here</p>
        <Link  className='btn' to={"/"}> STAFF</Link>
      </div>
    </div>
    <div class="col-right-admin">
      <div class="login-form-admin">
        <h2>Login</h2>
        <form>
          <p>
            <label>Username<span>*</span></label>
            <input type="text" placeholder="Username" required onChange={(e)=>setUsername(e.target.value)}/>
          </p>
          <p>
            <label>Password<span>*</span></label>
            
            <input type="password" onChange={(e)=>setpassword(e.target.value)} placeholder="Password"/>
      
          </p>
          <p>
            <input className='admin' onClick={authenticate} type="submit" value="Sign In" />
          </p>
           
        </form>
      </div>
    </div>
  </div>
  <div class="credit">

  
  Copyright ©<a href=" ">Hostel Management System  </a>2023
  </div>
</div>
</div>
  );
}

export default Admin;