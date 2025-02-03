// components/SearchBar.js
import React from 'react';
import styles from './SearchBar.module.css'; // Import CSS module for styling


// SearchBar component takes one prop: onSearch (function to handle search input).
const SearchBar = ({ onSearch }) => {
  return (
    // Render a div with the specified class for styling the search bar.
    <div className={styles.searchBar}>
      {/* Render an input field for searching. */}
      <input
        type="text"
        placeholder="Search by title or genre..." // Placeholder text within the input
        onChange={(e) => onSearch(e.target.value)} // Call the onSearch function when the input changes, passing the new value.
      />
    </div>
  );
};

export default SearchBar;