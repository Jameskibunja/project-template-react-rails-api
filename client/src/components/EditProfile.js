import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const EditProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    address: '',
    image: '',
    contacts: ''
  });

  const fetchLoggedInUser = () => {
    const token = localStorage.getItem('token');
    if (token && token !== "null") {
      return token;
    } else {
      // handle redirect to login or show an error message
    }
  };

  useEffect(() => {
    fetch(`https://afternoon-falls-80454.herokuapp.com/profiles/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${fetchLoggedInUser()}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setProfile(data);
        setFormData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching profile details:', error);
        setLoading(false);
      });
  }, [id]);

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    const updatedProfile = {
      ...profile,
      ...formData
    };

    api
      .post(`https://afternoon-falls-80454.herokuapp.com/profiles/${id}`, updatedProfile, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${fetchLoggedInUser()}`
        }
      })
      .then(response => {
        console.log('Profile updated:', response.data);
        // Redirect to profile details page after successful update
        navigate(`/profile/${id}`);
      })
      .catch(error => {
        console.error('Error updating profile:', error);
        // Display an error message to the user
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Profile not found.</div>;
  }

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label>Bio:</label>
        <input
          type="text"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
        />
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        <label>Avatar:</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
        <label>Contacts:</label>
        <input
          type="number"
          name="contacts"
          value={formData.contacts}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditProfile;
