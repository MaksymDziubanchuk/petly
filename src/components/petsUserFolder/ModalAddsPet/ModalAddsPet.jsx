import scss from './modaladdspet.module.scss';

import React from 'react';

import { createPortal } from 'react-dom';
import { useEffect } from 'react';
const modalRoot = document.querySelector('#modal-root');

const ModalAddsPet = ({ onClose, children }) => {
  useEffect(() => {
    const handleDownInEscape = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleDownInEscape);
    return () => {
      return window.removeEventListener('keydown', handleDownInEscape);
    };
  }, [onClose]);

  const handleDown = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  children = React.cloneElement(children, {
    close: onClose,
  });

  return createPortal(
    <div className={scss.modal} onClick={handleDown}>
      <div className={scss.modal__section}>{children}</div>
    </div>,
    modalRoot
  );
};

export default ModalAddsPet;
