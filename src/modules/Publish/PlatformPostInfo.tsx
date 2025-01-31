import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { getFontStyles } from '../../components/design-system/Typography';
import { useSelector } from 'react-redux';
import {
  getPublishPostInfo,
  selectActivePost,
  selectActivePostPublishInfo,
  validatePostForPlatform,
} from '../../store/activePost/activePostSlice';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import Button from '../../components/design-system/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MediaList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 16px;
`;

const MediaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Thumbnail = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
`;

const FileName = styled.div`
  ${({ theme }) => getFontStyles('r_12')(theme)};
  color: ${(props) => props.theme.textColors.secondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

interface PlatformPostInfoProps {
  platformId: string;
}

const PlatformPostInfo: React.FC<PlatformPostInfoProps> = ({ platformId }) => {
  const publishInfo = useSelector(selectActivePostPublishInfo);
  const activePost = useSelector(selectActivePost);
  const dispatch: AppDispatch = useDispatch();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!activePost) return;
    hasFetched.current = true;
    dispatch(getPublishPostInfo(activePost.projectID, activePost.id, platformId));
    return () => {
      hasFetched.current = false;
    };
  }, [activePost, platformId]);

  const handleValidate = () => {
    if (!activePost) return;
    dispatch(validatePostForPlatform(activePost.projectID, activePost.id, platformId));
  };

  if (!publishInfo) return <div>Loading...</div>;

  return (
    <Container>
      <h3>Linked Media</h3>
      <MediaList>
        {publishInfo.media.map((media) => (
          <MediaItem key={media.id}>
            <Thumbnail src={media.urlThumbnail} alt={media.altText || media.filename} />
            <FileName>{media.filename}</FileName>
          </MediaItem>
        ))}
      </MediaList>
      <ButtonContainer>
        <Button variant="off" onClick={handleValidate}>
          Validate for Platform
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default PlatformPostInfo;
