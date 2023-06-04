import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/UploadBook.css';
import logo from '../assets/logo.png';

const fetchLoggedInUser = () => {
  const token = localStorage.getItem('token');
  return token || '';
};

const UploadBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const book = {
      title: title,
      author: author,
      description: description,
      image_url: imageUrl,
    };

    const token = fetchLoggedInUser();

    if (token) {
      axios
        .post('/books/upload', book, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          setUploadMessage('Book has been added to your library');
          setTimeout(() => {
            setUploadMessage('');
            navigate('/library'); // Redirect to the library page
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="upload-book-container">
      <header>
        <img src={logo} alt="Logo" className="logo" />
      </header>
      <form onSubmit={handleSubmit} className="upload-book-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="url"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
        <button type="submit">Upload</button>
        {uploadMessage && <p>{uploadMessage}</p>}
      </form>
    </div>
  );
};

export default UploadBook;
