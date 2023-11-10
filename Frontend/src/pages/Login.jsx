import React, { useEffect, useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom' 
import '../CSS/login.css'
 

function Login() {
    const nav=useNavigate();
  const[username,setUsername]=useState('');
  const[password,setpassword]=useState('');
  const[user,setUser]=useState('');
  const fetchData = () => {
    return fetch("http://localhost:8080/login/get")
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
    nav("/home")
  }
}
  return (
    <div class="wrapper">
  <div class="container">
    <div class="col-left">
      <div class="login-text">
        <h2>Welcome Back</h2>
        <p>If You Are Admin <br></br>Click Here</p>
  <Link  className='btn' to={"/admin_login"}> ADMIN</Link>
      </div>
    </div>
    <div class="col-right">
      <div class="login-form">
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
            <input onClick={authenticate} type="submit" value="Sign In" />
          </p>
           
        </form>
      </div>
    </div>
  </div>
  <div class="credit">

  
  Copyright ©<a href=" ">Hostel Management System  </a>2023
  </div>
</div>
 
  );
}

export default Login;