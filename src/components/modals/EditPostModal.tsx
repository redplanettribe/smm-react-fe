import React, { useState, useEffect, act } from 'react';
import styled from 'styled-components';
import Modal from '../design-system/Modal';
import Input from '../design-system/Input';
import Button from '../design-system/Button';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/modal/modalSlice';
import { AppDispatch } from '../../store/store';
import { postApi } from '../../api/posts/postApi';
import { getFontStyles } from '../design-system/Typography';
import { selectActivePost, updatePost } from '../../store/activePost/activePostSlice';

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

const EditPostModal: React.FC = () => {
  const activePost = useSelector(selectActivePost);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('');
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (activePost) {
      setTitle(activePost.title);
      setContent(activePost.textContent);
      setType(activePost.type);
    }
  }, [activePost]);

  useEffect(() => {
    const fetchPostTypes = async () => {
      try {
        const types = await postApi.getAvailablePostTypes();
        setAvailableTypes(types);
      } catch (error) {
        console.error('Failed to fetch post types:', error);
      }
    };

    fetchPostTypes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePost) return;
    dispatch(
      updatePost(activePost.projectID, activePost.id, {
        ...activePost,
        title,
        textContent: content,
        type,
      })
    );
    dispatch(closeModal());
  };

  if (!activePost) return null;

  return (
    <Modal title="Edit Post">
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

        <ButtonGroup>
          <Button variant="off" onClick={() => dispatch(closeModal())}>
            Cancel
          </Button>
          <Button type="submit">Update Post</Button>
        </ButtonGroup>
      </Form>
    </Modal>
  );
};

export default EditPostModal;
