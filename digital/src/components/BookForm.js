// Import necessary React hooks and CSS module for styling.
import React, { useState, useEffect } from 'react';
import styles from './BookForm.module.css';

// Custom function to generate unique IDs for new books.
// This replaces the need for the uuid library.
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

// BookForm component that handles adding or editing books.
const BookForm = ({ addBook, editingBook, updateBook, onCancelEdit }) => {
    // State variables to store the form input values: title, author, and genre.
    const [title, setTitle] = useState(''); // Title of the book.
    const [author, setAuthor] = useState(''); // Author of the book.
    const [genre, setGenre] = useState(''); // Genre of the book.
    const [errors, setErrors] = useState({}); // Object to store validation errors.

    // useEffect hook to populate the form fields when editing an existing book.
    useEffect(() => {
        // If in edit mode (editingBook is not null), populate the form fields with the book's data.
        if (editingBook) {
            setTitle(editingBook.title); // Set the title field.
            setAuthor(editingBook.author); // Set the author field.
            setGenre(editingBook.genre); // Set the genre field.
        } else {
            // If not in edit mode, clear the form fields.
            setTitle('');
            setAuthor('');
            setGenre('');
        }
    }, [editingBook]); // Re-run the effect whenever editingBook changes.

    // Function to validate the form inputs and return any errors.
    const validateInputs = () => {
        const newErrors = {}; // Object to store validation errors.

        // Validate the title field.
        if (!title || title.length < 2) {
            newErrors.title = 'Title must be at least 2 characters.';
        }

        // Validate the author field.
        if (!author || author.length < 2) {
            newErrors.author = 'Author must be at least 2 characters.';
        }

        // Validate the genre field.
        if (!genre || genre.length < 2) {
            newErrors.genre = 'Genre must be at least 2 characters.';
        }

        return newErrors; // Return the errors object.
    };

    // handleSubmit function is called when the form is submitted.
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior.

        // Validate the form inputs.
        const validationErrors = validateInputs();

        // If there are validation errors, display them and stop further execution.
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors); // Update the errors state with validation messages.
            return;
        }

        // Clear any previous errors since the form is valid.
        setErrors({});

        // Check if the form is in edit mode (editingBook is not null).
        if (editingBook) {
            // Call the updateBook function to update the existing book.
            updateBook({ ...editingBook, title, author, genre });
        } else {
            // Create a new book object with a unique ID and call the addBook function to add it.
            addBook({
                id: generateUniqueId(), // Generate a unique ID for the new book.
                title,
                author,
                genre,
            });
        }

        // Clear the form fields after submitting or updating the book.
        setTitle('');
        setAuthor('');
        setGenre('');
    };

    // Render the form JSX.
    return (
        <form onSubmit={handleSubmit} className={styles.bookForm}>
            {/* Fieldset to group the form elements semantically. */}
            <fieldset>
                {/* Legend to describe the purpose of the form. */}
                <legend>{editingBook ? 'Edit Book' : 'Add New Book'}</legend>

                {/* Form group for the title input field. */}
                <div className={styles.formGroup}>
                    <label htmlFor="title">Title:</label> {/* Label for the title input. */}
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter book title" // Placeholder text for user guidance.
                        value={title} // Bind the input value to the title state.
                        onChange={(e) => setTitle(e.target.value)} // Update the title state on input change.
                        required // Make the field required.
                    />
                    {/* Display an error message if there is a validation error for the title. */}
                    {errors.title && <p className={styles.error}>{errors.title}</p>}
                </div>

                {/* Form group for the author input field. */}
                <div className={styles.formGroup}>
                    <label htmlFor="author">Author:</label> {/* Label for the author input. */}
                    <input
                        type="text"
                        id="author"
                        placeholder="Enter author name" // Placeholder text for user guidance.
                        value={author} // Bind the input value to the author state.
                        onChange={(e) => setAuthor(e.target.value)} // Update the author state on input change.
                        required // Make the field required.
                    />
                    {/* Display an error message if there is a validation error for the author. */}
                    {errors.author && <p className={styles.error}>{errors.author}</p>}
                </div>

                {/* Form group for the genre input field. */}
                <div className={styles.formGroup}>
                    <label htmlFor="genre">Genre:</label> {/* Label for the genre input. */}
                    <input
                        type="text"
                        id="genre"
                        placeholder="Enter book genre" // Placeholder text for user guidance.
                        value={genre} // Bind the input value to the genre state.
                        onChange={(e) => setGenre(e.target.value)} // Update the genre state on input change.
                        required // Make the field required.
                    />
                    {/* Display an error message if there is a validation error for the genre. */}
                    {errors.genre && <p className={styles.error}>{errors.genre}</p>}
                </div>

                {/* Button group for submit/update and cancel buttons. */}
                <div className={styles.buttonGroup}>
                    {/* Submit button to add or update the book. Text dynamically changes based on edit mode. */}
                    <button type="submit">{editingBook ? 'Update Book' : 'Add Book'}</button>

                    {/* Cancel button for editing mode, appears only when editingBook is not null. */}
                    {editingBook && (
                        <button type="button" onClick={onCancelEdit} className={styles.cancelButton}>
                            Cancel Edit
                        </button>
                    )}
                </div>
            </fieldset>
        </form>
    );
};

export default BookForm; // Export the BookForm component for use in other parts of the application.