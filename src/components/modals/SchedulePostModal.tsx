import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../design-system/Modal';
import Button from '../design-system/Button';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../store/modal/modalSlice';
import { AppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import { getFontStyles } from '../design-system/Typography';
import { schedulePost, selectActivePost } from '../../store/activePost/activePostSlice';

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

const SchedulePostModal: React.FC = () => {
  const [scheduledDate, setScheduledDate] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const activePost = useSelector(selectActivePost);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePost || !scheduledDate) return;

    const date = new Date(scheduledDate);
    dispatch(schedulePost(activePost.projectID, activePost.id, date));
    dispatch(closeModal());
  };

  return (
    <Modal title="Schedule Post">
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>Schedule Date</Label>
          <DateInput
            type="datetime-local"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
          />
        </InputGroup>

        <ButtonGroup>
          <Button variant="off" onClick={() => dispatch(closeModal())}>
            Cancel
          </Button>
          <Button type="submit" disabled={!scheduledDate}>
            Schedule
          </Button>
        </ButtonGroup>
      </Form>
    </Modal>
  );
};

export default SchedulePostModal;
