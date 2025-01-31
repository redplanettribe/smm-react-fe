import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { getFontStyles } from '../../components/design-system/Typography';
import { useEffect, useRef, useState } from 'react';
import Button from '../../components/design-system/Button';
import IconPlus from '../../assets/icons/Plus';
import { selectEnabledPlatforms } from '../../store/projects/projectSlice';
import PostList from './PostList';
import MediaCard from './MediaCard';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/modal/modalSlice';
import { PostStatusEnum } from '../../api/posts/types';
import {
  archivePost,
  deletePost,
  dequeuePost,
  enqueuePost,
  linkPostToPlatform,
  publishPost,
  restorePost,
  selectActivePost,
  selectActivePostMediaData,
  unschedulePost,
} from '../../store/activePost/activePostSlice';

const Container = styled.div`
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 24px;
  padding: 24px;
  height: 100%;
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Section = styled.div`
  background: ${(props) => props.theme.bgColors.secondary};
  color: ${(props) => props.theme.textColors.primary};
  border-radius: 8px;
  padding: 24px;
`;

const MediaSection = styled(Section)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 16px;
`;

const PostInfo = styled(Section)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  ${({ theme }) => getFontStyles('r_14')(theme)};
  color: ${(props) => props.theme.textColors.primary};
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const Tab = styled.div<{ $isActive: boolean }>`
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  ${({ theme }) => getFontStyles('r_14')(theme)};
  color: ${(props) => props.theme.textColors.primary};
  background: ${(props) => (props.$isActive ? props.theme.bgColors.primary : 'transparent')};

  &:hover {
    background: ${(props) => props.theme.bgColors.primary};
  }
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
  gap: 8px;
`;

const ButtonWrapper = styled.div`
  position: relative;
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

const Publish: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const activePost = useSelector(selectActivePost);
  const mediaData = useSelector(selectActivePostMediaData);
  const enabledPlatforms = useSelector(selectEnabledPlatforms);
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

  const handleLinkPlatform = async (platformId: string) => {
    if (!activePost) return;
    dispatch(linkPostToPlatform(activePost.projectID, activePost.id, platformId));
    setIsMenuOpen(false);
  };

  const handleUploadClick = () => {
    dispatch(openModal({ type: 'UPLOAD_MEDIA' }));
  };

  const handlePublish = async () => {
    if (!activePost) return;
    dispatch(publishPost(activePost.projectID, activePost.id));
  };

  const handleSchedule = () => {
    dispatch(openModal({ type: 'SCHEDULE_POST' }));
  };

  const handleEnqueue = () => {
    if (activePost?.projectID && activePost?.id) {
      dispatch(enqueuePost(activePost.projectID, activePost.id));
    }
  };

  const handleDequeue = () => {
    if (activePost?.projectID && activePost?.id) {
      dispatch(dequeuePost(activePost.projectID, activePost.id));
    }
  };

  const handleUnschedule = () => {
    if (activePost?.projectID && activePost?.id) {
      dispatch(unschedulePost(activePost.projectID, activePost.id));
    }
  };

  const handleArchive = () => {
    if (activePost?.projectID && activePost?.id) {
      dispatch(archivePost(activePost.projectID, activePost.id));
    }
  };

  const handleRestore = () => {
    if (activePost?.projectID && activePost?.id) {
      dispatch(restorePost(activePost.projectID, activePost.id));
    }
  };

  const handleDelete = () => {
    if (activePost?.projectID && activePost?.id) {
      dispatch(deletePost(activePost.projectID, activePost.id));
    }
  };

  return (
    <Container>
      <PostList />
      <ContentArea>
        {activePost ? (
          <>
            <ContentHeader>
              {activePost.linkedPlatforms.length > 0 ? (
                <>
                  {activePost.status === PostStatusEnum.ARCHIVED ? (
                    // Show restore and delete for archived posts
                    <>
                      <Button variant="off" onClick={handleRestore}>
                        Restore
                      </Button>
                      <Button variant="off" onClick={handleDelete}>
                        Delete
                      </Button>
                    </>
                  ) : (
                    // Show normal actions for non-archived posts
                    <>
                      {activePost.status === PostStatusEnum.SCHEDULED ? (
                        <Button variant="off" onClick={handleUnschedule}>
                          Unschedule
                        </Button>
                      ) : activePost.status === PostStatusEnum.QUEUED ? (
                        <Button variant="off" onClick={handleDequeue}>
                          Dequeue
                        </Button>
                      ) : (
                        <>
                          <Button variant="off" onClick={handleSchedule}>
                            Schedule
                          </Button>
                          <Button variant="off" onClick={handleEnqueue}>
                            Enqueue
                          </Button>
                        </>
                      )}
                      <Button variant="off" onClick={handleArchive}>
                        Archive
                      </Button>
                      <Button
                        onClick={handlePublish}
                        disabled={activePost.status === PostStatusEnum.PUBLISHED}
                      >
                        Publish Post
                      </Button>
                    </>
                  )}
                </>
              ) : (
                // Show platform linking prompt if no platforms are linked
                <ButtonWrapper ref={menuRef}>
                  <Button variant="off" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    Link to Platform
                  </Button>
                  <DropdownMenu $isOpen={isMenuOpen}>
                    {enabledPlatforms.map((platform) => (
                      <MenuItem key={platform.id} onClick={() => handleLinkPlatform(platform.id)}>
                        {platform.name}
                      </MenuItem>
                    ))}
                  </DropdownMenu>
                </ButtonWrapper>
              )}
            </ContentHeader>

            <MediaSection>
              {mediaData && mediaData.map((media) => <MediaCard key={media.id} media={media} />)}
              <Button variant="off" icon={<IconPlus />} onClick={handleUploadClick} />
            </MediaSection>
            <PostInfo>
              <InfoRow>
                <span>Title:</span>
                <span>{activePost.title}</span>
              </InfoRow>
              <InfoRow>
                <span>Type:</span>
                <span>{activePost.type}</span>
              </InfoRow>
              <InfoRow>
                <span>Content:</span>
                <span>{activePost.textContent}</span>
              </InfoRow>
              <InfoRow>
                <span>Created By:</span>
                <span>{activePost.createdBy}</span>
              </InfoRow>
            </PostInfo>
            {activePost.linkedPlatforms.length > 0 && (
              <Section>
                <TabsContainer>
                  {activePost.linkedPlatforms.map((platform) => (
                    <Tab
                      key={platform.id}
                      $isActive={activeTab === platform.id}
                      onClick={() => setActiveTab(platform.id)}
                    >
                      {platform.name}
                    </Tab>
                  ))}
                  <ButtonWrapper ref={menuRef}>
                    <Tab $isActive={false} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                      <IconPlus />
                    </Tab>
                    <DropdownMenu $isOpen={isMenuOpen}>
                      {enabledPlatforms
                        .filter(
                          (platform) =>
                            !activePost.linkedPlatforms.some((linked) => linked.id === platform.id)
                        )
                        .map((platform) => (
                          <MenuItem
                            key={platform.id}
                            onClick={() => handleLinkPlatform(platform.id)}
                          >
                            {platform.name}
                          </MenuItem>
                        ))}
                    </DropdownMenu>
                  </ButtonWrapper>
                </TabsContainer>

                {/* Platform specific settings would go here based on activeTab */}
              </Section>
            )}
          </>
        ) : (
          <Section>Select a post to view details</Section>
        )}
      </ContentArea>
    </Container>
  );
};

export default Publish;
