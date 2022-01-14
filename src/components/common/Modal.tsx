import ModalUnstyled from '@mui/base/ModalUnstyled';
import { styled } from '@mui/system';
import React from 'react';

import Container from 'components/common/Container';

interface Props {
  open: boolean;
  onClose: () => void;
}

const Modal: React.FC<Props> = ({ children, open, onClose }) => {
  return (
    <ModalWrapper open={open} onClose={onClose} BackdropComponent={Backdrop} disableEnforceFocus>
      <Container size="middle">{children}</Container>
    </ModalWrapper>
  );
};

export default Modal;

const ModalWrapper = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;
