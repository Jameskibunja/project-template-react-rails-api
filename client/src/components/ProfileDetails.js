import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProfileDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/profiles/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching profile details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Profile not found.</div>;
  }

  return (
    <div>
      <h1>{profile.name}</h1>
      <p>Email: {profile.email}</p>
      <p>Bio: {profile.bio}</p>
      <p>Address: {profile.address}</p>
      <p>Avatar: {profile.image}</p>
      <p>Contacts: {profile.contacts}</p>
    </div>
  );
};

export default ProfileDetails;
