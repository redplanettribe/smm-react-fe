import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../design-system/Modal';
import Button from '../design-system/Button';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/modal/modalSlice';
import { AppDispatch } from '../../store/store';
import { addPostingTimeSlot, selectActiveProject } from '../../store/projects/projectSlice';
import { getFontStyles } from '../design-system/Typography';

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

const DateInput = styled.input`
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

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AddTimeSlotModal: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const activeProject = useSelector(selectActiveProject);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProject || !selectedDate) return;

    const date = new Date(selectedDate);
    console.log('Date to post', date);
    dispatch(addPostingTimeSlot(activeProject.id, date));
    dispatch(closeModal());
  };

  return (
    <Modal title="Add Publishing Time Slot">
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>Select Time</Label>
          <DateInput
            type="datetime-local"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </InputGroup>

        <ButtonGroup>
          <Button variant="off" onClick={() => dispatch(closeModal())}>
            Cancel
          </Button>
          <Button type="submit" disabled={!selectedDate}>
            Add Time Slot
          </Button>
        </ButtonGroup>
      </Form>
    </Modal>
  );
};

export default AddTimeSlotModal;
