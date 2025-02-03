// components/BookList.js
import React from 'react';
import BookItem from './BookItem';
import styles from './BookList.module.css';

const BookList = ({ books, onEdit, onDelete, highlight }) => {
    return (
      <ul className={styles.bookList}>
        {books.map((book) => (
          <BookItem
            key={book.id}
            book={book}
            onEdit={onEdit}
            onDelete={onDelete}
            highlight={highlight}
            />
        ))}
      </ul>
    );
  };

export default BookList;