import React from 'react';
import '../styles/Books.css';

const Book = ({ book, onPurchase }) => {
  const { title, author, image_url, description, price } = book;
  const imagePath = require(`../assets/images/${image_url}`).default;

  return (
    <div className="book">
      <h2>{title}</h2>
      <p>{author}</p>
      <img src={imagePath} alt={title} className="book-image" />
      <p>{description}</p>
      <p>{price}</p>
      <button onClick={onPurchase}>Buy</button>
    </div>
  );
};

export default Book;
