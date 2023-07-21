import React from 'react';
import css from './Button.module.scss';
import PropTypes from 'prop-types';
const Button = ({ isVisible, onClick }) => {
  return (
    <div className={css.container}>
      <button
        type="button"
        className={css.button_85}
        style={{ display: isVisible ? 'block' : 'none' }}
        onClick={onClick}
      >
        Load More
      </button>
    </div>
  );
};
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default Button;
