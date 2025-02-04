import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../design-system/Modal';
import Input from '../design-system/Input';
import Button from '../design-system/Button';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/modal/modalSlice';
import { AppDispatch } from '../../store/store';
import { addUserToProject, selectActiveProject } from '../../store/projects/projectSlice';

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

const AddUserModal: React.FC = () => {
  const [email, setEmail] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const activeProject = useSelector(selectActiveProject);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProject) return;

    dispatch(addUserToProject(activeProject.id, email));
    dispatch(closeModal());
  };

  return (
    <Modal title="Add Team Member">
      <Form onSubmit={handleSubmit}>
        <Input
          label="Email"
          placeholder="Enter user email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <ButtonGroup>
          <Button variant="off" onClick={() => dispatch(closeModal())}>
            Cancel
          </Button>
          <Button type="submit">Add User</Button>
        </ButtonGroup>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
