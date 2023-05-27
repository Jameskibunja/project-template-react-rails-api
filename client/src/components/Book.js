import React from 'react';
import '../styles/Books.css';

const Book = ({ book, onPurchase }) => {
  const { title, author, image_url, description, price } = book;

  return (
    <div className="book">
      <h2>{title}</h2>
      <p>{author}</p>
      {image_url && <img src={image_url} alt={title} className="book-image" />}
      <p>{description}</p>
      <p>{price}</p>
      <button onClick={onPurchase}>Buy</button>
    </div>
  );
};

export default Book;
