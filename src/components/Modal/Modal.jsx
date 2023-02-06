import { Component, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { ModalWindow, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ close, children }) => {
  const closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeModal);

    return () => document.removeEventListener('keydown', closeModal);
  }, [closeModal]);

  return createPortal(
    <Overlay onClick={closeModal}>
      <ModalWindow>{children}</ModalWindow>
    </Overlay>,
    modalRoot
  );
};

export default Modal;

// export class Modal extends Component {
//   componentDidMount() {
//     document.addEventListener('keydown', this.closeModal);
//   }

//   componentWillUnmount() {
//     document.removeEventListener('keydown', this.closeModal);
//   }

//   closeModal = ({ target, currentTarget, code }) => {
//     if (target === currentTarget || code === 'Escape') {
//       this.props.close();
//     }
//   };

//   render() {
//     const { children } = this.props;
//     const { closeModal } = this;

//     return createPortal(
//       <Overlay onClick={closeModal}>
//         <ModalWindow>{children}</ModalWindow>
//       </Overlay>,
//       modalRoot
//     );
//   }
// }
