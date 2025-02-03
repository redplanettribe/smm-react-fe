import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { getFontStyles } from '../../components/design-system/Typography';
import { useSelector } from 'react-redux';
import {
  getPublishPostInfo,
  selectActivePost,
  selectActivePostPublishInfo,
  unlinkPostMediaFromPlatform,
  validatePostForPlatform,
} from '../../store/activePost/activePostSlice';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import Button from '../../components/design-system/Button';
import IconClose from '../../assets/icons/Close';

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

const MediaItemContainer = styled.div`
  position: relative;

  &:hover {
    .hover-controls {
      opacity: 1;
    }
  }
`;

const HoverControls = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  opacity: 0;
  transition: opacity 0.2s ease;
`;

const IconButton = styled(Button)`
  padding: 4px;
  height: auto;
  min-width: auto;
  background: ${(props) => props.theme.bgColors.secondary};
  border-radius: 4px;

  &:hover {
    background: ${(props) => props.theme.bgColors.primary};
  }
`;

interface PlatformPostInfoProps {
  platformId: string;
}

const PlatformPostInfo: React.FC<PlatformPostInfoProps> = ({ platformId }) => {
  const publishInfo = useSelector(selectActivePostPublishInfo);
  const activePost = useSelector(selectActivePost);
  const dispatch: AppDispatch = useDispatch();
  const hasFetched = useRef(false);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    if (!activePost || hasFetched.current) return;

    const fetchData = async () => {
      if (!mounted.current) return;
      hasFetched.current = true;
      await dispatch(getPublishPostInfo(activePost.projectID, activePost.id, platformId));
    };

    fetchData();

    return () => {
      mounted.current = false;
      hasFetched.current = false;
    };
  }, [activePost, platformId, dispatch]);

  const handleValidate = () => {
    if (!activePost) return;
    dispatch(validatePostForPlatform(activePost.projectID, activePost.id, platformId));
  };

  const handleUnlinkMedia = (mediaId: string) => {
    if (!activePost) return;
    dispatch(unlinkPostMediaFromPlatform(activePost.projectID, activePost.id, mediaId, platformId));
  };

  if (!publishInfo) return <div>Loading...</div>;

  return (
    <Container>
      <h3>Linked Media</h3>
      <MediaList>
        {publishInfo.media.map((media) => (
          <MediaItemContainer key={media.id}>
            <MediaItem>
              <Thumbnail src={media.urlThumbnail} alt={media.altText || media.filename} />
              <FileName>{media.filename}</FileName>
            </MediaItem>
            <HoverControls className="hover-controls">
              <IconButton
                variant="off"
                onClick={() => handleUnlinkMedia(media.id)}
                icon={<IconClose size={16} />}
              />
            </HoverControls>
          </MediaItemContainer>
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
