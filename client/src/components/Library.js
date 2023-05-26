import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Book from './Book';
import logo from '../assets/logo.png';
import '../styles/Library.css';

const Library = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);
    getBooks(page);
  }, [page]);

  const getBooks = (page) => {
    axios
      .get(` http://localhost:3000/books`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.log('book fetch error', error);
      });
  };

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const handlePurchase = (bookId, bookPrice) => {
    axios
      .post('/transactions', {
        book_id: bookId,
        transaction: {
          amount: bookPrice * 100,
        },
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        const confirmationCode = response.data.confirmationCode;
        console.log('Transaction confirmed with code:', confirmationCode);
      })
      .catch(error => {
        console.log('Transaction failed:', error);
      });
  };

  return (
    <div className="library-container">
      <header>
        <img src={logo} alt="Logo" className="logo" />
        <div className="user-details">{username}</div>
      </header>
      <div className="books-grid">
        {books.map(book => (
          <Book key={book.id} book={book} onPurchase={() => handlePurchase(book.id, book.price)} />
        ))}
      </div>
      <div className="pagination-buttons">
        <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default Library;
