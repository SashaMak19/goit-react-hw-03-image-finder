import { ButtonLoad } from './Button.styled';
import PropTypes from 'prop-types';

const LoadMore = ({ onLoad }) => {
  return <ButtonLoad onClick={() => onLoad()}>Load more</ButtonLoad>;
};

LoadMore.propTypes = {
  onLoad: PropTypes.func.isRequired,
};

export { LoadMore };
