import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '../design-system/Modal';
import Input from '../design-system/Input';
import Button from '../design-system/Button';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../store/modal/modalSlice';
import { AppDispatch } from '../../store/store';
import { postApi } from '../../api/posts/postApi';
import { getFontStyles } from '../design-system/Typography';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/root-reducer';
import { createPost } from '../../store/projects/projectSlice';

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

const TextArea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
  border: 1px solid ${(props) => props.theme.dividerColor};
  border-radius: 6px;
  ${({ theme }) => getFontStyles('r_14')(theme)};
  color: ${(props) => props.theme.textColors.primary};
  background-color: ${(props) => props.theme.bgColors.secondary};
  min-height: 100px;
  resize: vertical;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CreatePostModal: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('');
  const [isIdea, setIsIdea] = useState(false);
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const project = useSelector((state: RootState) => state.project.activeProject);

  const fetchPostTypes = async () => {
    try {
      const types = await postApi.getAvailablePostTypes();
      setAvailableTypes(types);
      if (types.length > 0) {
        setType(types[0]);
      }
    } catch (error) {
      console.error('Failed to fetch post types:', error);
    }
  };

  useEffect(() => {
    fetchPostTypes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(closeModal());
    dispatch(createPost(project.id, title, content, type, isIdea));
  };

  return (
    <Modal title="Create New Post">
      <Form onSubmit={handleSubmit}>
        <Input
          label="Title"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <InputGroup>
          <Label>Post Type</Label>
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            {availableTypes.map((postType) => (
              <option key={postType} value={postType}>
                {postType}
              </option>
            ))}
          </Select>
        </InputGroup>

        <InputGroup>
          <Label>Content</Label>
          <TextArea
            placeholder="Enter post content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <Label>
            <input type="checkbox" checked={isIdea} onChange={(e) => setIsIdea(e.target.checked)} />{' '}
            Save as idea
          </Label>
        </InputGroup>

        <ButtonGroup>
          <Button variant="off" onClick={() => dispatch(closeModal())}>
            Cancel
          </Button>
          <Button type="submit">Create Post</Button>
        </ButtonGroup>
      </Form>
    </Modal>
  );
};

export default CreatePostModal;
