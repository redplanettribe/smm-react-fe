import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Modal from '../design-system/Modal';
import Input from '../design-system/Input';
import Button from '../design-system/Button';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../store/modal/modalSlice';
import { useSelector } from 'react-redux';
import { selectActivePost, uploadMedia } from '../../store/projects/projectSlice';
import { getFontStyles } from '../design-system/Typography';
import { AppDispatch } from '../../store/store';

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

const FileInfo = styled.div`
  ${({ theme }) => getFontStyles('r_14')(theme)};
  color: ${(props) => props.theme.textColors.primary};
  padding: 16px;
  background: ${(props) => props.theme.bgColors.secondary};
  border-radius: 4px;
  margin-bottom: 16px;
`;

const HiddenInput = styled.input`
  display: none;
`;

const UploadMediaModal: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [altText, setAltText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch: AppDispatch = useDispatch();
  const activePost = useSelector(selectActivePost);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleClearFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !activePost) return;
    dispatch(uploadMedia(activePost.projectID, activePost.id, file, altText));
    dispatch(closeModal());
  };

  return (
    <Modal title="Upload Media">
      <Form onSubmit={handleSubmit}>
        <HiddenInput
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*,video/*"
        />

        {file ? (
          <FileInfo>
            Selected file: {file.name}
            <Button variant="off" onClick={handleClearFile}>
              Clear
            </Button>
          </FileInfo>
        ) : (
          <Button type="button" variant="off" onClick={() => fileInputRef.current?.click()}>
            Select File
          </Button>
        )}

        <Input
          label="Alt Text"
          placeholder="Enter alt text for the media"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
        />

        <ButtonGroup>
          <Button variant="off" onClick={() => dispatch(closeModal())}>
            Cancel
          </Button>
          <Button type="submit" disabled={!file || !altText}>
            Upload
          </Button>
        </ButtonGroup>
      </Form>
    </Modal>
  );
};

export default UploadMediaModal;
