import styled from 'styled-components';
import { getFontStyles } from '../../components/design-system/Typography';
import Button from '../../components/design-system/Button';
import IconPlus from '../../assets/icons/Plus';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/modal/modalSlice';
import { useSelector } from 'react-redux';
import {
  selectActivePost,
  selectActiveProject,
  selectPosts,
  setActivePostWithMetadata,
} from '../../store/projects/projectSlice';
import { AppDispatch } from '../../store/store';
import { useEffect, useMemo, useRef, useState } from 'react';
import ChevronDownIcon from '../../assets/icons/ChevronDown';
import { Post, PostStatusEnum } from '../../api/posts/types';
import { PostListTab, selectPostListTab, setPostListTab } from '../../store/ui/uiSlice';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { movePostInQueue, moveIdeaInQueue } from '../../store/projects/projectSlice';

const PostsList = styled.div`
  background: ${(props) => props.theme.bgColors.secondary};
  border-radius: 8px;
  padding: 16px;
  height: 100%;
`;

const PostItem = styled.div<{ $isActive: boolean }>`
  padding: 16px;
  border-radius: 4px;
  cursor: pointer;
  ${({ theme }) => getFontStyles('r_14')(theme)};
  color: ${(props) => props.theme.textColors.primary};
  ${({ $isActive, theme }) =>
    $isActive &&
    `
    boder: 1px solid ${theme.dividerColor};
    background: ${theme.bgColors.primary}`};

  &:hover {
    background: ${(props) => props.theme.bgColors.primary};
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

const CreateButtonWrapper = styled.div`
  margin-left: auto;
`;

const FilterContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const FilterButton = styled.div`
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  ${({ theme }) => getFontStyles('r_14')(theme)};
  color: ${(props) => props.theme.textColors.primary};
  background: transparent;
  border: 1px solid ${(props) => props.theme.dividerColor};
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${(props) => props.theme.bgColors.primary};
  }
`;

const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
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

const DroppableList = styled.div`
  min-height: 100px;
`;

const DraggableItem = styled(PostItem)`
  margin-bottom: 8px;
  background: ${(props) => props.theme.bgColors.secondary};

  &:hover {
    background: ${(props) => props.theme.bgColors.primary};
  }
`;

const PostList: React.FC = () => {
  const posts = useSelector(selectPosts);
  const activeProject = useSelector(selectActiveProject);
  const dispatch: AppDispatch = useDispatch();
  const selectedPost = useSelector(selectActivePost);
  const activeTab = useSelector(selectPostListTab);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (tab: PostListTab) => {
    dispatch(setPostListTab(tab));
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filterLabels = {
    draft: 'Drafts',
    queue: 'Post Queue',
    ideas: 'Idea Queue',
    scheduled: 'Scheduled',
    published: 'Published',
    failed: 'Failed',
  };

  const handleCreatePost = () => {
    dispatch(openModal({ type: 'CREATE_POST' }));
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || !activeProject) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) return;

    if (activeTab === 'queue') {
      dispatch(movePostInQueue(activeProject.id, sourceIndex, destinationIndex));
    } else if (activeTab === 'ideas') {
      dispatch(moveIdeaInQueue(activeProject.id, sourceIndex, destinationIndex));
    }
  };

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    switch (activeTab) {
      case 'queue':
        return activeProject.postQueue
          .map((postId) => posts.find((post) => post.id === postId))
          .filter((post): post is Post => post !== undefined);
      case 'ideas':
        return activeProject.ideaQueue
          .map((postId) => posts.find((post) => post.id === postId))
          .filter((post): post is Post => post !== undefined);
      case 'scheduled':
        return posts.filter((post) => post.status === PostStatusEnum.SCHEDULED);
      case 'draft':
        return posts.filter((post) => post.status === PostStatusEnum.DRAFT && !post.isIdea);
      case 'published':
        return posts.filter(
          (post) =>
            post.status === PostStatusEnum.PUBLISHED ||
            post.status === PostStatusEnum.PARTIALLY_PUBLISHED
        );
      case 'failed':
        return posts.filter((post) => post.status === PostStatusEnum.FAILED);
      default:
        return posts;
    }
  }, [posts, activeTab, activeProject.postQueue, activeProject.ideaQueue]);

  return (
    <PostsList>
      <HeaderContainer>
        <FilterContainer ref={menuRef}>
          <FilterButton onClick={() => setIsOpen(!isOpen)}>
            {filterLabels[activeTab]}
            <ChevronDownIcon />
          </FilterButton>
          <DropdownMenu $isOpen={isOpen}>
            <MenuItem onClick={() => handleTabChange('draft')}>{filterLabels.draft}</MenuItem>
            <MenuItem onClick={() => handleTabChange('queue')}>{filterLabels.queue}</MenuItem>
            <MenuItem onClick={() => handleTabChange('scheduled')}>
              {filterLabels.scheduled}
            </MenuItem>
            <MenuItem onClick={() => handleTabChange('published')}>
              {filterLabels.published}
            </MenuItem>
            <MenuItem onClick={() => handleTabChange('failed')}>{filterLabels.failed}</MenuItem>
            <MenuItem onClick={() => handleTabChange('ideas')}>{filterLabels.ideas}</MenuItem>
          </DropdownMenu>
          <CreateButtonWrapper>
            <Button variant="off" icon={<IconPlus />} onClick={handleCreatePost} />
          </CreateButtonWrapper>
        </FilterContainer>
      </HeaderContainer>

      <DragDropContext onDragEnd={handleDragEnd}>
        {activeTab === 'queue' || activeTab === 'ideas' ? (
          <Droppable droppableId="post-list">
            {(provided) => (
              <DroppableList {...provided.droppableProps} ref={provided.innerRef}>
                {filteredPosts.map((post, index) => (
                  <Draggable key={post.id} draggableId={post.id} index={index}>
                    {(provided, snapshot) => (
                      <DraggableItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        $isActive={selectedPost?.id === post.id}
                        style={{
                          ...provided.draggableProps.style,
                          opacity: snapshot.isDragging ? 0.8 : 1,
                        }}
                        onClick={() => dispatch(setActivePostWithMetadata(post.projectID, post.id))}
                      >
                        {post.title}
                      </DraggableItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </DroppableList>
            )}
          </Droppable>
        ) : (
          // Regular list for non-draggable tabs
          filteredPosts.map((post) => (
            <PostItem
              key={post.id}
              $isActive={selectedPost?.id === post.id}
              onClick={() => dispatch(setActivePostWithMetadata(post.projectID, post.id))}
            >
              {post.title}
            </PostItem>
          ))
        )}
      </DragDropContext>
    </PostsList>
  );
};

export default PostList;
