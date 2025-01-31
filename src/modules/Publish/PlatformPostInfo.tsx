import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PublishPostInfo } from '../../api/publisher/types';
import { publisherApi } from '../../api/publisher/publisher-api';
import { getFontStyles } from '../../components/design-system/Typography';
import { useSelector } from 'react-redux';
import { selectActivePost } from '../../store/activePost/activePostSlice';

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

interface PlatformPostInfoProps {
  platformId: string;
}

const PlatformPostInfo: React.FC<PlatformPostInfoProps> = ({ platformId }) => {
  const [publishInfo, setPublishInfo] = useState<PublishPostInfo | null>(null);
  const activePost = useSelector(selectActivePost);

  useEffect(() => {
    const fetchPublishInfo = async () => {
      if (!activePost) return;
      try {
        const info = await publisherApi.getPublishPostInfo({
          projectID: activePost.projectID,
          postID: activePost.id,
          platformID: platformId,
        });
        setPublishInfo(info);
      } catch (error) {
        console.error('Failed to fetch publish info:', error);
      }
    };

    fetchPublishInfo();
  }, [activePost, platformId]);

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
    </Container>
  );
};

export default PlatformPostInfo;
