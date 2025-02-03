// components/BookItem.js
import React from 'react';
import styles from './BookItem.module.css'; // Import CSS module for styling

// BookItem component takes props: book (book object), onEdit (function to edit a book),
// onDelete (function to delete a book), and highlight (text to highlight).
const BookItem = ({ book, onEdit, onDelete, highlight }) => {

    // Function to highlight matching text within the book details.
    const highlightText = (text) => {
      // If no highlight text is provided, return the original text
      if (!highlight) return text;

      // Create a regular expression to find all occurrences of the highlight text (case-insensitive).
      const regex = new RegExp(`(${highlight})`, 'gi');
      // Split the text by the highlight text, while keeping the matched text as parts in the array.
      const parts = text.split(regex);
      // Map over the parts array to wrap the matching highlight in a span with highlight class.
      return parts.map((part, index) => {
        // Check if part matches the highlight (case insensitive).
        if (part.toLowerCase() === highlight.toLowerCase()) {
          return (
            // If it matches, return the highlighted part wrapped in a span.
            <span key={index} className={styles.highlight}>
              {part}
            </span>
          );
        }
        // If not, return the original part without highlighting
        return part;
      });
    };

  return (
    // Render the book item as a list item with a specific class.
    <li className={styles.bookItem}>
      {/* Container for book details */}
        <div className={styles.bookDetails}>
          {/* Display the book title, author and genre with highlighting applied */}
          <p><strong>Title:</strong> {highlightText(book.title)}</p>
          <p><strong>Author:</strong> {highlightText(book.author)}</p>
          <p><strong>Genre:</strong> {highlightText(book.genre)}</p>
        </div>
        {/* Container for book action buttons. */}
      <div className={styles.bookActions}>
          {/* Edit button. Clicking it triggers the onEdit function with the book ID. */}
          <button className={styles.editButton} onClick={() => onEdit(book.id)}>Edit</button>
          {/* Delete button. Clicking it triggers the onDelete function with the book ID. */}
          <button className={styles.deleteButton} onClick={() => onDelete(book.id)}>Delete</button>
      </div>
    </li>
  );
};
export default BookItem;