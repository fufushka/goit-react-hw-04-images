import SearchBar from './components/SearchBar/SearchBar';
import React, { Component } from 'react';
import { getPhotosByQuery } from './Api/Api';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import css from './styles.module.scss';
import { InfinitySpin } from 'react-loader-spinner';
import Modal from './components/Modal/Modal';
export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    isLoading: false,
    showModal: false,
    largeImageUrl: '',
    asd: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  onSubmit = query => {
    this.setState({
      searchQuery: query,
      page: 1,
      images: [],
      showModal: false,
    });
  };

  fetchImages = async () => {
    const { searchQuery, page } = this.state;

    this.setState({ isLoading: true });

    const photos = await getPhotosByQuery(searchQuery, page);

    this.setState(prevState => ({
      images: [...prevState.images, ...photos.hits],
      isLoading: false,
      page: prevState.page + 1,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleImageClick = largeImageUrl => {
    this.setState({ largeImageUrl });
    this.toggleModal();
  };
  render() {
    return (
      <div className={css.App}>
        <SearchBar onSubmit={this.onSubmit} />

        <ImageGallery
          photos={this.state.images}
          onClick={this.handleImageClick}
        />
        {this.state.showModal && (
          <Modal
            onClose={this.toggleModal}
            largeImageUrl={this.state.largeImageUrl}
          />
        )}
        {this.state.images.length > 0 && (
          <Button
            isVisible={!this.state.isLoading}
            onClick={this.fetchImages}
          />
        )}
        {this.state.isLoading && (
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
  }
}
