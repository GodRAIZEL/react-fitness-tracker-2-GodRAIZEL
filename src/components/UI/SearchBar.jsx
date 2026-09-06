import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './UI.module.css';

/**
 * SearchBar - a controlled text input for filtering exercises.
 * Demonstrates onChange, onSubmit and onFocus/onBlur event handling.
 */
const SearchBar = ({ searchTerm, onSearch, onClear, placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={styles.searchInput}
        style={{ borderColor: isFocused ? 'var(--ember)' : 'var(--steel-light)' }}
      />
      {searchTerm.length > 0 && (
        <button type="button" onClick={onClear} className={styles.clearBtn}>
          Clear
        </button>
      )}
      <button type="submit" className={styles.searchSubmitBtn}>
        Search
      </button>
    </form>
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  onClear: PropTypes.func,
  placeholder: PropTypes.string
};

SearchBar.defaultProps = {
  onClear: () => {},
  placeholder: 'Search exercises...'
};

export default SearchBar;
