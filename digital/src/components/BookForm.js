// components/BookForm.js
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Make sure this import is present and uuid is installed.
import styles from './BookForm.module.css';

const BookForm = ({ addBook, editingBook, updateBook, onCancelEdit }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');

    useEffect(() => {
        if (editingBook) {
            setTitle(editingBook.title);
            setAuthor(editingBook.author);
            setGenre(editingBook.genre);
        } else {
            setTitle('');
            setAuthor('');
            setGenre('');
        }
    }, [editingBook]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !author || !genre) {
            alert('Please fill in all fields.');
            return;
        }

        if (editingBook) {
            updateBook({ ...editingBook, title, author, genre });
        }
        else{
            addBook({
                id: uuidv4(),
                title,
                author,
                genre,
            });
        }

        setTitle('');
        setAuthor('');
        setGenre('');
    };

    return (
        <form onSubmit={handleSubmit} className={styles.bookForm}>
            <div className={styles.formGroup}>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="author">Author:</label>
                <input
                    type="text"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="genre">Genre:</label>
                <input
                    type="text"
                    id="genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                />
            </div>
            <div className={styles.buttonGroup}>
                <button type="submit">{editingBook ? 'Update Book' : 'Add Book'}</button>
                {editingBook && <button type="button" onClick={onCancelEdit}>Cancel Edit</button>}
            </div>

        </form>
    );
};

export default BookForm;