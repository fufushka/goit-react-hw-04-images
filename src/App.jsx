import SearchBar from './components/SearchBar/SearchBar';
import React, { useEffect, useState, useCallback } from 'react';
import { getPhotosByQuery } from './Api/Api';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import css from './styles.module.scss';
import { InfinitySpin } from 'react-loader-spinner';
import Modal from './components/Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState('');

  const fetchImages = useCallback(
    async pageNumber => {
      setIsLoading(true);

      const photos = await getPhotosByQuery(searchQuery, pageNumber);

      setImages(prevImages => [...prevImages, ...photos.hits]);
      setIsLoading(false);
    },
    [searchQuery]
  );

  useEffect(() => {
    setPage(1);
    setImages([]);
    if (searchQuery !== '') {
      fetchImages(1);
    }
  }, [searchQuery, fetchImages]);

  useEffect(() => {
    if (page === 1) return;
    fetchImages(page);
  }, [page, fetchImages]);

  const handleLoadMore = () => {
    const nextPage = page + 1;

    setPage(nextPage);
    console.log(page);
  };
  // useEffect(() => {
  //   if (searchQuery !== '') {
  //     fetchImages();
  //   }
  // }, [searchQuery, fetchImages]);

  const onSubmit = query => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
    setShowModal(false);
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const handleImageClick = largeImageUrl => {
    setLargeImageUrl(largeImageUrl);
    toggleModal();
  };
  return (
    <div className={css.App}>
      <SearchBar onSubmit={onSubmit} />

      <ImageGallery photos={images} onClick={handleImageClick} />
      {showModal && (
        <Modal onClose={toggleModal} largeImageUrl={largeImageUrl} />
      )}
      {images.length > 0 && (
        <Button isVisible={!isLoading} onClick={handleLoadMore} />
      )}
      {isLoading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 0,
          }}
        >
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      )}
    </div>
  );
};
