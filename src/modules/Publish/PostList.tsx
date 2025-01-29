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

const PostList: React.FC = () => {
  const posts = useSelector(selectPosts);
  const activeProject = useSelector(selectActiveProject);
  const dispatch: AppDispatch = useDispatch();
  const selectedPost = useSelector(selectActivePost);
  const [activeTab, setActiveTab] = useState<'all' | 'queue' | 'ideas'>('all');
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
    all: 'All',
    queue: 'Post Queue',
    ideas: 'Idea Queue',
  };

  const handleCreatePost = () => {
    dispatch(openModal({ type: 'CREATE_POST' }));
  };

  const filteredPosts = useMemo(() => {
    switch (activeTab) {
      case 'queue':
        return posts.filter((post) => activeProject.postQueue.includes(post.id));
      case 'ideas':
        return posts.filter((post) => post.isIdea);
      default:
        return posts;
    }
  }, [posts, activeTab, activeProject.postQueue]);

  return (
    <PostsList>
      <HeaderContainer>
        <FilterContainer ref={menuRef}>
          <FilterButton onClick={() => setIsOpen(!isOpen)}>
            {filterLabels[activeTab]}
            <ChevronDownIcon />
          </FilterButton>
          <DropdownMenu $isOpen={isOpen}>
            <MenuItem
              onClick={() => {
                setActiveTab('all');
                setIsOpen(false);
              }}
            >
              Todos
            </MenuItem>
            <MenuItem
              onClick={() => {
                setActiveTab('queue');
                setIsOpen(false);
              }}
            >
              Cola
            </MenuItem>
            <MenuItem
              onClick={() => {
                setActiveTab('ideas');
                setIsOpen(false);
              }}
            >
              Ideas
            </MenuItem>
          </DropdownMenu>
          <CreateButtonWrapper>
            <Button variant="off" icon={<IconPlus />} onClick={handleCreatePost} />
          </CreateButtonWrapper>
        </FilterContainer>
      </HeaderContainer>

      {filteredPosts.map((post) => (
        <PostItem
          key={post.id}
          $isActive={selectedPost?.id === post.id}
          onClick={() => dispatch(setActivePostWithMetadata(post.projectID, post.id))}
        >
          {post.title}
        </PostItem>
      ))}
    </PostsList>
  );
};

export default PostList;
