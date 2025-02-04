import styled, { useTheme } from 'styled-components';
import { getFontStyles } from '../../components/design-system/Typography';
import Button from '../../components/design-system/Button';
import { DownloadMetadata } from '../../api/media/types';
import IconPlus from '../../assets/icons/Plus';
import IconDocument from '../../assets/icons/Document';
import { useSelector } from 'react-redux';
import { selectActiveProject } from '../../store/projects/projectSlice';
import { useEffect, useRef, useState } from 'react';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import {
  linkPostMediaToPlatform,
  selectActivePost,
  selectActivePostLinkedPlatforms,
  deleteMedia,
} from '../../store/activePost/activePostSlice';
import IconClose from '../../assets/icons/Close';

const Controls = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

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

const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background-color: ${(props) => props.theme.bgColors.primary};
  border: 1px solid ${(props) => props.theme.dividerColor};
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  min-width: 150px;
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
  z-index: 1000;
`;

const MenuItem = styled.div`
  padding: 12px 16px;
  ${({ theme }) => getFontStyles('r_14')(theme)};
  color: ${(props) => props.theme.textColors.primary};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.bgColors.secondary};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.dividerColor};
  }
`;

const ButtonWrapper = styled.div`
  position: relative;
`;

interface MediaCardProps {
  media: DownloadMetadata;
}

const MediaCard: React.FC<MediaCardProps> = ({ media }) => {
  const isDocument = media.mediaType === 'document';
  const theme = useTheme();
  const project = useSelector(selectActiveProject);
  const post = useSelector(selectActivePost);
  const linkedPlatforms = useSelector(selectActivePostLinkedPlatforms);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkToPlatform = async (platformID: string) => {
    if (!project || !post) return;
    dispatch(linkPostMediaToPlatform(project.id, post.id, media.id, platformID));
    setIsMenuOpen(false);
  };

  const handleDelete = () => {
    if (!project || !post) return;
    dispatch(deleteMedia(project.id, post.id, media.id));
  };

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
          <Controls>
            <IconButton variant="off" icon={<IconClose size={16} />} onClick={handleDelete} />
            <ButtonWrapper ref={menuRef}>
              <IconButton
                variant="off"
                icon={<IconPlus size={16} />}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
              <DropdownMenu $isOpen={isMenuOpen}>
                {linkedPlatforms &&
                  linkedPlatforms.map((platform) => (
                    <MenuItem key={platform.id} onClick={() => handleLinkToPlatform(platform.id)}>
                      {platform.name}
                    </MenuItem>
                  ))}
              </DropdownMenu>
            </ButtonWrapper>
          </Controls>
        </HoverControls>
      </ThumbnailContainer>
      <FileName>{media.filename}</FileName>
    </Container>
  );
};

export default MediaCard;
