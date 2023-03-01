import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Item, Image } from './ImageGalleryItem.styled';
import { Modal } from '../Modal/Modal';
import PropTypes from 'prop-types';

class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  // toggleModal = () => {
  //   this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
  // };

  onOpenModal = () => {
    this.setState({
      isModalOpen: true,
    });
  };

  onCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { isModalOpen } = this.state;
    const { image, tags, largeImageURL } = this.props;

    return (
      <Item onClick={this.onOpenModal}>
        <Image src={image} alt={tags} />
        {isModalOpen && (
          <Modal
            image={largeImageURL}
            tags={tags}
            onClose={this.onCloseModal}
          />
        )}
      </Item>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export { ImageGalleryItem };
