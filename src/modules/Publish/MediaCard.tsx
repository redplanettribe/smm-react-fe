import styled, { useTheme } from 'styled-components';
import { getFontStyles } from '../../components/design-system/Typography';
import Button from '../../components/design-system/Button';
import { DownloadMetadata } from '../../api/media/types';
import IconPlus from '../../assets/icons/Plus';
import IconDocument from '../../assets/icons/Document';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100px;
  cursor: pointer;

  &:hover {
    .hover-controls {
      opacity: 1;
    }
  }
`;

const ThumbnailContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 4px;
  overflow: hidden;
  background: ${(props) => props.theme.bgColors.primary};
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FileName = styled.div`
  ${({ theme }) => getFontStyles('r_12')(theme)};
  color: ${(props) => props.theme.textColors.secondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;

const HoverControls = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 8px;
  display: flex;
  justify-content: flex-end;
  opacity: 0;
  transition: opacity 0.2s ease;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%);
`;

const IconButton = styled(Button)`
  padding: 4px;
  height: auto;
  min-width: auto;
`;

const DocumentPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.bgColors.secondary};
`;

interface MediaCardProps {
  media: DownloadMetadata;
}

const MediaCard: React.FC<MediaCardProps> = ({ media }) => {
  const isDocument = media.mediaType === 'document';
  const theme = useTheme();

  return (
    <Container>
      <ThumbnailContainer>
        {isDocument ? (
          <DocumentPlaceholder>
            <IconDocument size={40} color={theme.textColors.primary} />
          </DocumentPlaceholder>
        ) : (
          <Thumbnail src={media.urlThumbnail} alt={media.altText || media.filename} />
        )}
        <HoverControls className="hover-controls">
          <IconButton
            variant="off"
            icon={<IconPlus size={16} />}
            onClick={() => {
              console.log('Link media:', media.id);
            }}
          />
        </HoverControls>
      </ThumbnailContainer>
      <FileName>{media.filename}</FileName>
    </Container>
  );
};

export default MediaCard;
