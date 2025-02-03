// components/BookItem.js
import React from 'react';
import styles from './BookItem.module.css'; // Import CSS module

const BookItem = ({ book, onEdit, onDelete, highlight }) => {
    const highlightText = (text) => {
      if (!highlight) return text;

      const regex = new RegExp(`(${highlight})`, 'gi');
      const parts = text.split(regex);
      return parts.map((part, index) => {
        if (part.toLowerCase() === highlight.toLowerCase()) {
          return (
            <span key={index} className={styles.highlight}>
              {part}
            </span>
          );
        }
        return part;
      });
    };

  return (
    <li className={styles.bookItem}>
        <div className={styles.bookDetails}>
          <p><strong>Title:</strong> {highlightText(book.title)}</p>
          <p><strong>Author:</strong> {highlightText(book.author)}</p>
          <p><strong>Genre:</strong> {highlightText(book.genre)}</p>
        </div>
      <div className={styles.bookActions}>
          <button className={styles.editButton} onClick={() => onEdit(book.id)}>Edit</button>
          <button className={styles.deleteButton} onClick={() => onDelete(book.id)}>Delete</button>
      </div>
    </li>
  );
};
export default BookItem;