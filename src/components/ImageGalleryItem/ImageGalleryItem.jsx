import { Component } from 'react';
import { Item, Image } from './ImageGalleryItem.styled';
import { Modal } from '../Modal/Modal';
import PropTypes from 'prop-types';

class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

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
      <Item>
        <Image src={image} alt={tags} onClick={this.onOpenModal} />
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
