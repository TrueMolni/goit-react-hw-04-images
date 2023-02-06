import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

import { ModalWindow, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ close, children }) => {
  const closeModal = useCallback(({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      close();
    }
  }, []);

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
