import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        'http://localhost:3000/users',
        {
          username: username,
          email: email,
          password: password
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.jwt) {
          localStorage.setItem('token', response.data.jwt)
          setIsLoggedIn(true);
        } else {
          setSignUpErrors('Failed to create account');
        }
      })
      .catch((error) => {
        console.log('sign up error', error);
      });
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Sign Up</button>
        {signUpErrors && <p>{signUpErrors}</p>}
      </form>
      <Link to="/login">Already have an account? Log in</Link>
    </div>
  );
}

export default SignUp;
