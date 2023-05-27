import React, { Component } from 'react';
import axios from 'axios';
// import '../styles/SignUp.css';
import libraryImage from '../assets/library.jpg'; // your background image
import logo from '../assets/logo.png';

class SignUp extends Component {
    state = {
        name: '',
        password: '',
        loginErrors: ''
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { name, password } = this.state;
        axios
            .post(
                "/users", // replace with your API endpoint
                {
                    user: {
                        username: name,
                        password: password
                    }
                },
                { withCredentials: true }
            )
            .then(response => {
                if (response.data.logged_in) {
                    this.props.handleSuccessfulAuth(response.data);
                }
            })
            .catch(error => {
                console.log('signup error', error);
            });
    };

    render() {
        return (
            <div className="signup-container" style={{backgroundImage: `url(${libraryImage})`}}>
                <header>
                    <img src={logo} alt="Logo" className="logo" />
                </header>
                <form onSubmit={this.handleSubmit} className="signup-form">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={this.state.username}
                        onChange={this.handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                    />
                    <button type="submit">SignUp</button>
                </form>
            </div>
        );
    }
}

export default SignUp;
