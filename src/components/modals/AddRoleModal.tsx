import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../design-system/Modal';
import Button from '../design-system/Button';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/modal/modalSlice';
import { AppDispatch } from '../../store/store';
import { addRoleToUser, selectActiveProject } from '../../store/projects/projectSlice';
import { getFontStyles } from '../design-system/Typography';
import { PROJECT_ROLES } from '../../api/project/types';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;

const Select = styled.select`
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
  border: 1px solid ${(props) => props.theme.dividerColor};
  border-radius: 6px;
  ${({ theme }) => getFontStyles('r_14')(theme)};
  color: ${(props) => props.theme.textColors.primary};
  background-color: ${(props) => props.theme.bgColors.secondary};
`;

const Label = styled.label`
  margin-bottom: 10px;
  color: ${(props) => props.theme.textColors.primary};
  ${({ theme }) => getFontStyles('m_14')(theme)};
`;

interface AddRoleModalProps {
  userId: string;
  userName: string;
}

const AddRoleModal: React.FC<AddRoleModalProps> = ({ userId, userName }) => {
  const [selectedRole, setSelectedRole] = useState<number>(1);
  const dispatch: AppDispatch = useDispatch();
  const activeProject = useSelector(selectActiveProject);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProject) return;

    dispatch(addRoleToUser(activeProject.id, userId, selectedRole));
    dispatch(closeModal());
  };

  return (
    <Modal title={`Add Role for ${userName}`}>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label>Select Role</Label>
          <Select value={selectedRole} onChange={(e) => setSelectedRole(Number(e.target.value))}>
            {Object.entries(PROJECT_ROLES).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </Select>
        </div>

        <ButtonGroup>
          <Button variant="off" onClick={() => dispatch(closeModal())}>
            Cancel
          </Button>
          <Button type="submit">Add Role</Button>
        </ButtonGroup>
      </Form>
    </Modal>
  );
};

export default AddRoleModal;
