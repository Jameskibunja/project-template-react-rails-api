import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../styles/SignUp.css';

function SignUp({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUpErrors, setSignUpErrors] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'email') {
      setEmail(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    axios.post('/users', { user: { username, email, password } },
     { headers: { 'Content-Type': 'application/json' },
      withCredentials: true }) .then(response => console.log(response.data)) 
      .catch(error => console.error(error)); 
    }
  
  return (
    <div className="signup-container">
      <header>
        <img src={logo} alt="Logo" className="logo" />
      </header>
      <div className="signup-form-container">
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="signup-button">
            Sign Up
          </button>
          {signUpErrors && <p className="error-message">{signUpErrors}</p>}
          <Link to="/login" className="login-link">
            Already have an account? Log in
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;