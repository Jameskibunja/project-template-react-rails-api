import React, { useState } from 'react';
import axios from 'axios';
import libraryImage from '../assets/library.jpg'; // your background image
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom'; // import Link from react-router-dom
import '../styles/Login.css';

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginErrors, setLoginErrors] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        'http://localhost:3000/users',
        {
          username: username,
          password: password
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.logged_in) {
          setIsLoggedIn(true);
        } else {
          setLoginErrors('Invalid username or password');
        }
      })
      .catch((error) => {
        console.log('login error', error);
      });
  };

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${libraryImage})` }}
    >
      <header>
        <img src={logo} alt="Logo" className="logo" />
      </header>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
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
        <button type="submit" className="login-button">Login</button>
        {loginErrors && <p className="error-message">{loginErrors}</p>}
        <Link to="/profile" className="login-button">Sign up</Link> {/* Use the same class as the login button */}
      </form>
    </div>
  );
}

export default Login;
