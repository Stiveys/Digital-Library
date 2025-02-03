// Import necessary dependencies from React
import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Import custom components
import BookList from '@/components/BookList';
import BookForm from '@/components/BookForm';
import SearchBar from '@/components/SearchBar';

// Import CSS styles for the Home component
import styles from '@/styles/Home.module.css';

// Define an initial array of books
const initialBooks = [
  { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic" },
  { id: "2", title: "1984", author: "George Orwell", genre: "Dystopian" },
  { id: "3", title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Classic" }
];

// Define the Home component
const Home = () => {
  // Use the useState hook to store the books array in state
  const [books, setBooks] = useState(initialBooks);

  // Use the useState hook to store the filtered books array in state
  const [filteredBooks, setFilteredBooks] = useState(initialBooks);

  // Use the useState hook to store the search term in state
  const [searchTerm, setSearchTerm] = useState('');

  // Use the useState hook to store the editing book in state
  const [editingBook, setEditingBook] = useState(null);

  // Define a callback function to handle adding a new book
  const handleAddBook = useCallback((newBook) => {
    // Update the books array with the new book
    setBooks(prevBooks => [...prevBooks, newBook]);
  }, []);

  // Define a callback function to handle searching for books
  const handleSearch = useCallback((term) => {
    // Update the search term in state
    setSearchTerm(term);
  }, []);

  // Define a callback function to handle editing a book
  const handleEditBook = useCallback((id) => {
    // Find the book to edit in the books array
    const bookToEdit = books.find(book => book.id === id);
    // Update the editing book in state
    setEditingBook(bookToEdit);
  }, [books]);

  // Define a callback function to handle updating a book
  const handleUpdateBook = useCallback((updatedBook) => {
    // Update the books array with the updated book
    setBooks(prevBooks => prevBooks.map(book => book.id === updatedBook.id ? updatedBook : book));
    // Reset the editing book in state
    setEditingBook(null);
  }, []);


  // Define a callback function to handle deleting a book
  const handleDeleteBook = useCallback((id) => {
    // Update the books array by removing the deleted book
    setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
  }, []);

  // Define a callback function to handle canceling editing a book
  const handleCancelEdit = useCallback(() => {
    // Reset the editing book in state
    setEditingBook(null);
  }, []);
  

  // Use the useEffect hook to filter the books array when the search term changes
  useEffect(() => {
    // Filter the books array based on the search term
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Update the filtered books array in state
    setFilteredBooks(filtered);
  }, [books, searchTerm]);

  // Return the JSX for the Home component
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Digital Library</h1>
      <BookForm
        addBook={handleAddBook}
        editingBook={editingBook}
        updateBook={handleUpdateBook}
        onCancelEdit={handleCancelEdit}
      />
      <SearchBar onSearch={handleSearch} />
      <BookList
        books={filteredBooks}
        onEdit={handleEditBook}
        onDelete={handleDeleteBook}
        highlight={searchTerm}
      />
    </div>
  );
};

// Export the Home component
export default Home;