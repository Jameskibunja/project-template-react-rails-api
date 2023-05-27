import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import libraryImage from '../assets/library.jpg';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginErrors, setLoginErrors] = useState('');

  const navigate = useNavigate();

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
        'http://localhost:3000/login',
        {
          username: username,
          password: password
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.jwt) {
          localStorage.setItem('token', response.data.jwt);
          localStorage.setItem('username', username);
          navigate("/library");
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
        <button type="submit" className="login-button">
          Login
        </button>
        {loginErrors && <p className="error-message">{loginErrors}</p>}
        <Link to="/signup" className="login-button">
          Sign up
        </Link>
      </form>
    </div>
  );
}

export default Login;
