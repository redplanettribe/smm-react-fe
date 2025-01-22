import React from 'react';
import { useSelector } from 'react-redux';
import { selectModal } from '../../store/modal/modalSlice';
import CreateProjectModal from './CreateProjectModal';

const MODAL_COMPONENTS = {
  CREATE_PROJECT: CreateProjectModal,
};

const ModalManager: React.FC = () => {
  const { isOpen, type } = useSelector(selectModal);

  if (!isOpen || !type) {
    return null;
  }

  const ModalComponent = MODAL_COMPONENTS[type as keyof typeof MODAL_COMPONENTS];
  return ModalComponent ? <ModalComponent /> : null;
};

export default ModalManager;