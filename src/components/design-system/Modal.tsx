import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../store/modal/modalSlice';
import { getFontStyles } from './Typography';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: ${props => props.theme.bgColors.primary};
  border-radius: 8px;
  padding: 24px;
  min-width: 400px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  ${({ theme }) => getFontStyles('m_18')(theme)};
  color: ${props => props.theme.textColors.primary};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.textColors.secondary};
  cursor: pointer;
  padding: 4px;
  font-size: 20px;

  &:hover {
    color: ${props => props.theme.textColors.primary};
  }
`;

interface ModalProps {
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, children }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Overlay onClick={handleClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <Title>{title}</Title>
          <CloseButton onClick={handleClose}>&times;</CloseButton>
        </ModalHeader>
        {children}
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;