import React, { useState } from 'react'
import logo from "../Icons/Rekomendasi-Live-Chat-untuk-Website.png"
import "./styles.css";
import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, anticipate, motion } from 'framer-motion';
import axios from 'axios';

function Login() {
  
  const [name,setName] = useState('');
  const [password,setPassword] = useState('');

  const navigate = useNavigate();

  const loginHandler = async () => {
      try {
          const config = {
              headers: {
                  "Content-type": "application/json",
              },
          };

          const response = await axios.post(
              "http://localhost:3000/api/users/login",
              {
                  name
              },
              config
          );
          console.log(response.data.name);
          if(response.data.password === password){
            navigate("/app/welcome");
            localStorage.setItem("userData", JSON.stringify(response));
          }
      } catch (error) {
          console.log(error);
      }
  }

  return (
    <AnimatePresence>
      <motion.div initial={{opacity: 0, scale: 0}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0}} transition={{ease: anticipate, duration: "0.5"}} className='login-container'>
        <div className='image-container'>
          <img src={logo} alt='logo' className='welcome-logo'/>
        </div>
        <div className='login-box'>
          <p className='login-text'>Login to your Account Now!</p>
          <TextField 
            onChange={(e)=>{setName(e.target.value)}}
            id="standard-basic" 
            label="Username" 
            variant="standard" 
          />
          <TextField
            onChange={(e)=>{setPassword(e.target.value)}}
            id="standard-password-input"
            label="Password"
            type="password"
            variant="standard"
            autoComplete="current-password"
          />
          <Button variant="outlined" color='error' onClick={loginHandler}>Login</Button>
          <div>
            New to Chat App?<Link to="/register" style={{marginLeft: '10px'}}>Register</Link> 
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Login
