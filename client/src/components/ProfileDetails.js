import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../styles/ProfileDetails.css';

const ProfileDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = () => {
      const token = localStorage.getItem('token');
      if (!token || token === 'null') {
        navigate('/login');
        return;
      }

      fetch(`https://afternoon-falls-80454.herokuapp.com/profiles/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch profile');
          }
        })
        .then((data) => {
          setProfile(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching profile details:', error);
          setLoading(false);
        });
    };

    fetchProfile();
  }, [id, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Profile not found.</div>;
  }

  return (
    <div className="profile-details-container">
      <form className="profile-details-form">
        <h1>Profile Details</h1>
        <p>Name: {profile.name}</p>
        <p>Email: {profile.email}</p>
        <p>Bio: {profile.bio}</p>
        <p>Address: {profile.address}</p>
        <p>Avatar: {profile.image}</p>
        <p>Contacts: {profile.contacts}</p>
        <Link to={`/profile/${id}/edit`} className="edit-button">
          Edit
        </Link>
      </form>
    </div>
  );
};

export default ProfileDetails;
