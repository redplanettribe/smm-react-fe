import React from 'react';
import styled from 'styled-components';
import Modal from '../design-system/Modal';
import Button from '../design-system/Button';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/modal/modalSlice';
import { AppDispatch } from '../../store/store';
import { removeUserFromProject, selectActiveProject } from '../../store/projects/projectSlice';
import { getFontStyles } from '../design-system/Typography';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Message = styled.p`
  ${({ theme }) => getFontStyles('r_14')(theme)};
  color: ${(props) => props.theme.textColors.primary};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

interface ConfirmRemoveUserModalProps {
  userId: string;
  userName: string;
}

const ConfirmRemoveUserModal: React.FC<ConfirmRemoveUserModalProps> = ({ userId, userName }) => {
  const dispatch: AppDispatch = useDispatch();
  const activeProject = useSelector(selectActiveProject);

  const handleConfirm = () => {
    if (!activeProject) return;
    dispatch(removeUserFromProject(activeProject.id, userId));
    dispatch(closeModal());
  };

  return (
    <Modal title="Remove Team Member">
      <Content>
        <Message>Are you sure you want to remove {userName} from this project?</Message>
        <ButtonGroup>
          <Button variant="off" onClick={() => dispatch(closeModal())}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Remove</Button>
        </ButtonGroup>
      </Content>
    </Modal>
  );
};

export default ConfirmRemoveUserModal;
