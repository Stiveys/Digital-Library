// components/BookList.js
import React from 'react';
import BookItem from './BookItem'; // Import the BookItem component
import styles from './BookList.module.css'; // Import CSS module for styling

// BookList component takes props: books (array of book objects), onEdit (function to edit a book),
// onDelete (function to delete a book), and highlight (text to highlight).
const BookList = ({ books, onEdit, onDelete, highlight }) => {
    return (
      // Render an unordered list to hold the book items with the specified class for styling
      <ul className={styles.bookList}>
        {/* Map over the books array to render a BookItem component for each book */}
        {books.map((book) => (
          <BookItem
            key={book.id} // Use the book ID as a key for efficient rendering in React
            book={book} // Pass the individual book object to the BookItem component
            onEdit={onEdit} // Pass the onEdit function to the BookItem component
            onDelete={onDelete} // Pass the onDelete function to the BookItem component
            highlight={highlight} // Pass the highlight text to the BookItem component
            />
        ))}
      </ul>
    );
  };

export default BookList;


