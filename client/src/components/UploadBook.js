import React, { useState } from 'react';
import axios from 'axios';
import '../styles/UploadBook.css';
import logo from '../assets/logo.png';

const fetchLoggedInUser = () => {
  const token = localStorage.getItem('token');
  if (token && token !== "null") {
    return token;
  }
  else {
    // redirect to login component
    // Add the redirection logic here
  }
};

const UploadBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const book = {
      title: title,
      author: author,
      description: description,
      image: imageUrl,
    };

    axios
      .post('http://localhost:3000/books/upload', book, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${fetchLoggedInUser()}`
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
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
      </form>
    </div>
  );
};

export default UploadBook;