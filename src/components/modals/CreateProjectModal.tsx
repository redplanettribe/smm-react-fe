import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../design-system/Modal';
import Input from '../design-system/Input';
import Button from '../design-system/Button';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../store/modal/modalSlice';

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

const CreateProjectModal: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement project creation logic
    console.log('Creating project:', { name, description });
    dispatch(closeModal());
  };

  return (
    <Modal title="Create New Project">
      <Form onSubmit={handleSubmit}>
        <Input
          label="Project Name"
          placeholder="Enter project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Description"
          placeholder="Enter project description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <ButtonGroup>
          <Button variant="off" onClick={() => dispatch(closeModal())}>
            Cancel
          </Button>
          <Button type="submit">Create Project</Button>
        </ButtonGroup>
      </Form>
    </Modal>
  );
};

export default CreateProjectModal;