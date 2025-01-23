import styled from 'styled-components';
import { getFontStyles } from '../../components/design-system/Typography';
import Button from '../../components/design-system/Button';
import IconPlus from '../../assets/icons/Plus';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/modal/modalSlice';
import { useSelector } from 'react-redux';
import {
  selectActivePost,
  selectPosts,
  setActivePostWithMetadata,
} from '../../store/projects/projectSlice';
import { AppDispatch } from '../../store/store';

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

const ListHeader = styled.div`
  margin-bottom: 16px;
`;

const CreateButton = styled(Button)`
  width: 100%;
`;

const PostList: React.FC = () => {
  const posts = useSelector(selectPosts);
  const dispatch: AppDispatch = useDispatch();
  const selectedPost = useSelector(selectActivePost);

  const handleCreatePost = () => {
    dispatch(openModal({ type: 'CREATE_POST' }));
  };

  return (
    <PostsList>
      <ListHeader>
        <CreateButton variant="off" icon={<IconPlus />} onClick={handleCreatePost}>
          Create Post
        </CreateButton>
      </ListHeader>
      {posts &&
        posts.map((post) => (
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
