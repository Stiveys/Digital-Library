import React, { useState } from 'react';
import BookList from './BookList';
import BookForm from './BookForm';
import SearchBar from './SearchBar';
import './App.css'; // Import CSS for basic styling

const initialBooks = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic" },
  { id: 2, title: "1984", author: "George Orwell", genre: "Dystopian" },
  { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Classic" }
];

function App() {
  const [books, setBooks] = useState(initialBooks);
  const [searchTerm, setSearchTerm] = useState('');

  const addBook = (newBook) => {
    setBooks([...books, { ...newBook, id: books.length + 1 }]);
  };

  const editBook = (book) => {
    const editedBooks = books.map((currentBook) => {
      if (currentBook.id === book.id) return book;
      return currentBook;
    });
    setBooks(editedBooks);
  };

  const deleteBook = (id) => {
    const filteredBooks = books.filter((book) => book.id !== id);
    setBooks(filteredBooks);
  };

  const filteredBooks = books.filter(book => {
    return book.title.toLowerCase().includes(searchTerm.toLowerCase()) || book.genre.toLowerCase().includes(searchTerm.toLowerCase())
  });

  return (
    <div className="app">
      <h1>Digital Library</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <BookList books={filteredBooks} deleteBook={deleteBook} editBook={editBook} />
      <BookForm onAdd={addBook} />
    </div>
  );
}

export default App;
