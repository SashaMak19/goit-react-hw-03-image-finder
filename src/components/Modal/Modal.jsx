import { Component } from 'react';
import { Overlay, ModalStyled } from './Modal.styled';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onCloseModalByEsc);
    window.addEventListener('click', this.onCloseModalByBackdrop);
    console.log('DidMount');
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onCloseModalByEsc);
    window.removeEventListener('click', this.onCloseModalByBackdrop);
    console.log('WillUnmount');
  }

  onCloseModalByEsc = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onCloseModalByBackdrop = e => {
    if (e.target.nodeName !== 'IMG') {
      this.props.onClose();
    }
  };

  // onCloseModalByBackdrop = e => {
  //   if (e.currentTarget === e.target) {
  //     this.props.onClose();
  //   }
  //   console.log(e);
  //   console.log(e.target);
  //   console.log(e.currentTarget);
  // };

  render() {
    const { image, tags } = this.props;

    return createPortal(
      // onClick={this.onCloseModalByBackdrop}
      <Overlay>
        <ModalStyled>
          <img src={image} alt={tags} />
        </ModalStyled>
      </Overlay>,
      modalRoot
    );

    // return (
    //   <Overlay onClick={this.onCloseModalByBackdrop}>
    //     <ModalStyled>
    //       <img src={image} alt={tags} />
    //     </ModalStyled>
    //   </Overlay>
    // );
  }
}

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export { Modal };
