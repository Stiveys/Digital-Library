// components/BookForm.js
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid library to generate unique IDs for new books.
import styles from './BookForm.module.css'; // Import CSS module for styling the form.

// BookForm component takes props: addBook (function to add a new book),
// editingBook (book object if in edit mode, null otherwise),
// updateBook (function to update a book), and onCancelEdit (function to cancel edit).
const BookForm = ({ addBook, editingBook, updateBook, onCancelEdit }) => {
    // Initialize state variables to store the form input values: title, author, and genre.
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');

    // useEffect hook to handle populating the form when editingBook changes.
    useEffect(() => {
        // If in edit mode (editingBook is not null), set the input fields with the corresponding book properties.
        if (editingBook) {
            setTitle(editingBook.title);
            setAuthor(editingBook.author);
            setGenre(editingBook.genre);
        } else {
            // If not in edit mode, clear the form fields
            setTitle('');
            setAuthor('');
            setGenre('');
        }
        // The effect will re-run whenever editingBook changes.
    }, [editingBook]);

    // handleSubmit function is called when the form is submitted.
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior.

        // Check if all the form fields are filled in; if not, display an alert and return.
        if (!title || !author || !genre) {
            alert('Please fill in all fields.');
            return;
        }

        // If in edit mode (editingBook is not null), call updateBook and pass the updated book object to it.
        if (editingBook) {
            updateBook({ ...editingBook, title, author, genre });
        }
        else{
            // If not in edit mode, create a new book object with a unique ID (using uuid) and the form input values.
            addBook({
                id: uuidv4(),
                title,
                author,
                genre,
            });
        }

        // After submitting/updating, clear the input fields by resetting state.
        setTitle('');
        setAuthor('');
        setGenre('');
    };

    // Render the form
    return (
        <form onSubmit={handleSubmit} className={styles.bookForm}>
            {/* Form group for title input */}
            <div className={styles.formGroup}>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} // Update the title state when input changes.
                />
            </div>
            {/* Form group for author input */}
            <div className={styles.formGroup}>
                <label htmlFor="author">Author:</label>
                <input
                    type="text"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)} // Update the author state when input changes.
                />
            </div>
            {/* Form group for genre input */}
            <div className={styles.formGroup}>
                <label htmlFor="genre">Genre:</label>
                <input
                    type="text"
                    id="genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)} // Update the genre state when input changes.
                />
            </div>
            {/* Button group for submit/update and cancel buttons */}
            <div className={styles.buttonGroup}>
                {/* Submit button to add or update the book. Text dynamically changes based on edit mode */}
                <button type="submit">{editingBook ? 'Update Book' : 'Add Book'}</button>
                {/* Cancel button for editing mode, appears only when editingBook is not null.*/}
                {editingBook && <button type="button" onClick={onCancelEdit}>Cancel Edit</button>}
            </div>

        </form>
    );
};

export default BookForm;