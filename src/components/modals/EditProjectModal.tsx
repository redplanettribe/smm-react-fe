import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '../design-system/Modal';
import Input from '../design-system/Input';
import Button from '../design-system/Button';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/modal/modalSlice';
import { AppDispatch } from '../../store/store';
import { selectActiveProject, updateProject } from '../../store/projects/projectSlice';

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

const EditProjectModal: React.FC = () => {
  const activeProject = useSelector(selectActiveProject);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (activeProject) {
      setName(activeProject.name);
      setDescription(activeProject.description);
    }
  }, [activeProject]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProject) return;

    dispatch(updateProject(activeProject.id, name, description));
    dispatch(closeModal());
  };

  return (
    <Modal title="Edit Project">
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
          <Button type="submit">Save Changes</Button>
        </ButtonGroup>
      </Form>
    </Modal>
  );
};

export default EditProjectModal;
