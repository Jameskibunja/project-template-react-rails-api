import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Book from './Book';
import logo from '../assets/logo.png';
import '../styles/Library.css';
import api from '../services/api';

const Library = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  const fetchLoggedInUser = useCallback(() => {
    const token = localStorage.getItem('token');
    if (token && token !== 'null') {
      return token;
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const getBooks = () => {
      api
        .get('https://afternoon-falls-80454.herokuapp.com/books', {
          params: {
            page: page,
            limit: 6,
          },
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${fetchLoggedInUser()}`,
          },
        })
        .then((response) => {
          setBooks(response.data);
        })
        .catch((error) => {
          console.log('book fetch error', error);
        });
    };

    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);
    getBooks();
  }, [page, fetchLoggedInUser]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handlePurchase = (bookId, bookPrice) => {
    api
      .post(
        '/transactions',
        {
          book_id: bookId,
          transaction: {
            amount: bookPrice * 100,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${fetchLoggedInUser()}`,
          },
        }
      )
      .then((response) => {
        const confirmationCode = response.data.confirmationCode;
        console.log('Transaction confirmed with code:', confirmationCode);
        alert('Thank you for purchasing this book. Please wait as we process your payment.');
      })
      .catch((error) => {
        console.log('Transaction failed:', error);
      });
  };

  const truncateDescription = (text, limit) => {
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return text;
  };

  return (
    <div className="library-container">
      <header>
        <img src={logo} alt="Logo" className="logo" />
        <div className="user-details">{username}</div>
      </header>
      <div className="books-grid">
        {books.map((book) => (
          <Book
            key={book.id}
            book={book}
            onPurchase={() => handlePurchase(book.id, book.price)}
            truncatedDescription={truncateDescription(book.description, 13)}
          />
        ))}
      </div>
      <div className="pagination-buttons">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default Library;
