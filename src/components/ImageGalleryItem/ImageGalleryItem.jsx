import React from 'react';
import css from './ImageGalleryItem.module.scss';
import PropTypes from 'prop-types';
const ImageGalleryItem = ({ src, alt, onClick, largeImageUrl }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={src}
        alt={alt}
        className={css.ImageGalleryItem_image}
        onClick={() => {
          onClick(largeImageUrl);
        }}
      />
    </li>
  );
};
ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  largeImageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default ImageGalleryItem;
