// import PropTypes from 'prop-types'
import React, { useState } from 'react';
import css from './SearchBar.module.scss';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';

const SearchBar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const onSubmitForm = e => {
    e.preventDefault();

    onSubmit(searchQuery);
    setSearchQuery('');
  };

  const onFormChange = ({ target: { value } }) => {
    setSearchQuery(value);
  };
  return (
    <header className={css.searchbar}>
      <form className={css.SearchForm} onSubmit={onSubmitForm}>
        <button type="submit" className={css.SearchForm_button}>
          <BsSearch />
          <span className={css.SearchForm_button_label}>Search</span>
        </button>

        <input
          className={css.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onFormChange}
          value={searchQuery}
        />
      </form>
    </header>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
