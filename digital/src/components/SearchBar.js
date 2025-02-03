// components/SearchBar.js
import React from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search by title or genre..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;