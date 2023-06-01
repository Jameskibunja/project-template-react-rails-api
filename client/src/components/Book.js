import React from 'react';
import '../styles/Books.css';

const Book = ({ book, onPurchase }) => {
  const { title, author, image_url, description, price } = book;

  // Split the description into an array of words
  const words = description.split(' ');

  // Take the first 5 words and join them back into a string
  const limitedDescription = words.slice(0, 5).join(' ');

  return (
    <div className="book">
      <h2>{title}</h2>
      <p>{author}</p>
      {image_url && <img src={image_url} alt={title} className="book-image" />}
      <p>{limitedDescription}</p>
      <p>{price}</p>
      <button onClick={onPurchase}>Buy</button>
    </div>
  );
};

export default Book;
