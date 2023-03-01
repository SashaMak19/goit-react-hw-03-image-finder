import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';
import PropTypes, { shape } from 'prop-types';

const ImageGallery = ({ data }) => {
  return (
    <>
      <List>
        {data.map(({ webformatURL, ...otherProps }, index) => (
          <ImageGalleryItem
            key={index}
            image={webformatURL}
            // tags={tags}
            // largeImageURL={largeImageURL}
            {...otherProps}
          ></ImageGalleryItem>
        ))}
      </List>
    </>
  );
};

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(shape({ webformatURL: PropTypes.string.isRequired }))
    .isRequired,
};

export { ImageGallery };
