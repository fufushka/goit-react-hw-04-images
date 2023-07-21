// import PropTypes from 'prop-types'
import React, { Component } from 'react';
import css from './SearchBar.module.scss';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';
export class SearchBar extends Component {
  state = {
    searchQuery: '',
  };

  onSubmitForm = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.searchQuery);
    this.setState({
      searchQuery: '',
    });
  };

  onFormChange = ({ target: { value } }) => {
    this.setState({
      searchQuery: value,
    });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.SearchForm} onSubmit={this.onSubmitForm}>
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
            onChange={this.onFormChange}
            value={this.state.searchQuery}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
