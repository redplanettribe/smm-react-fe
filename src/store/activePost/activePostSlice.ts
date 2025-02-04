import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { Post } from '../../api/posts/types';
import { DownloadMetadata } from '../../api/media/types';
import { postApi } from '../../api/posts/postApi';
import { mediaApi } from '../../api/media/mediaApi';
import { RootState } from '../root-reducer';
import { showNotification } from '../notifications/notificationSice';
import { PostListTabEnum, setPostListTab } from '../ui/uiSlice';
import { setPosts } from '../projects/projectSlice';
import { publisherApi } from '../../api/publisher/publisher-api';
import { PublishPostInfo } from '../../api/publisher/types';

export interface ActivePostState {
  post: Post | null;
  mediaMetadata: DownloadMetadata[] | null;
  publishInfo: PublishPostInfo | null;
}

const initialState: ActivePostState = {
  post: null,
  mediaMetadata: null,
  publishInfo: null,
};

const activePostSlice = createSlice({
  name: 'activePost',
  initialState,
  reducers: {
    setActivePost(state, action: PayloadAction<{ post: Post; metadata: DownloadMetadata[] }>) {
      state.post = action.payload.post;
      state.mediaMetadata = action.payload.metadata;
    },
    resetActivePost(state) {
      state.post = null;
      state.mediaMetadata = null;
    },
    setActivePostMediaMetadata(state, action: PayloadAction<DownloadMetadata[]>) {
      state.mediaMetadata = action.payload;
    },
    setPublishInfo(state, action: PayloadAction<PublishPostInfo>) {
      state.publishInfo = action.payload;
    },
    updatePostInState(state, action: PayloadAction<Post>) {
      // this belongs to project
      if (state.post?.id === action.payload.id) {
        state.post = action.payload;
      }
    },
  },
});

export const {
  setActivePost,
  resetActivePost,
  setActivePostMediaMetadata,
  updatePostInState,
  setPublishInfo,
} = activePostSlice.actions;

// Async Actions
export const setActivePostWithMetadata =
  (projectID: string, postID: string): AppThunk =>
  async (dispatch) => {
    try {
      const [post, metadata] = await Promise.all([
        postApi.getPost({ projectID, postID }),
        mediaApi.downloadMediaMetadata({ projectID, postID }),
      ]);
      dispatch(setActivePost({ post, metadata }));
    } catch (error) {
      dispatch(showNotification(`Failed to get active post: ${error}`, 'error'));
    }
  };

export const updatePostMediaMetadata =
  (projectID: string, postID: string): AppThunk =>
  async (dispatch) => {
    try {
      const metadata = await mediaApi.downloadMediaMetadata({ projectID, postID });
      dispatch(setActivePostMediaMetadata(metadata));
    } catch (error) {
      dispatch(showNotification(`Failed to update media metadata: ${error}`, 'error'));
    }
  };

export const updatePost =
  (projectID: string, postID: string, post: Post): AppThunk =>
  async (dispatch) => {
    try {
      await postApi.updatePost({
        projectID,
        postID,
        title: post.title,
        text_content: post.textContent,
        type: post.type,
        is_idea: post.isIdea,
      });
      dispatch(updatePostInState(post));
      dispatch(showNotification('Post updated', 'success'));
    } catch (error) {
      dispatch(showNotification(`Failed to update post: ${error}`, 'error'));
    }
  };

export const linkPostToPlatform =
  (projectID: string, postID: string, platformID: string): AppThunk =>
  async (dispatch) => {
    try {
      await postApi.linkPlatform({ projectID, postID, platformID });
      dispatch(setActivePostWithMetadata(projectID, postID));
      dispatch(showNotification('Platform added to post succesfuly', 'success'));
    } catch (error) {
      dispatch(showNotification(`Failed to link post to platform: ${error}`, 'error'));
    }
  };

export const uploadMedia =
  (projectID: string, postID: string, file: File, altText: string): AppThunk =>
  async (dispatch) => {
    try {
      await mediaApi.uploadMedia({ projectID, postID, file, alt_text: altText });
      dispatch(updatePostMediaMetadata(projectID, postID));
      dispatch(showNotification('Media uploaded', 'success'));
    } catch (error) {
      dispatch(showNotification(`Failed to upload media: ${error}`, 'error'));
    }
  };

export const deleteMedia =
  (projectID: string, postID: string, mediaID: string): AppThunk =>
  async (dispatch) => {
    try {
      await mediaApi.deleteMedia({ projectID, postID, mediaID });
      dispatch(updatePostMediaMetadata(projectID, postID));
      dispatch(showNotification('Media deleted', 'success'));
    } catch (error) {
      dispatch(showNotification(`Failed to delete media: ${error}`, 'error'));
    }
  };

export const linkPostMediaToPlatform =
  (projectID: string, postID: string, mediaID: string, platformID: string): AppThunk =>
  async (dispatch) => {
    try {
      await mediaApi.linkToPlatform({
        projectID,
        postID: postID,
        mediaID: mediaID,
        platformID: platformID,
      });
      dispatch(setActivePostWithMetadata(projectID, postID));
      dispatch(showNotification('Media linked to platform', 'success'));
    } catch (error) {
      dispatch(showNotification(`Failed to link media to platform: ${error}`, 'error'));
    }
  };

export const unlinkPostFromPlatform =
  (projectID: string, postID: string, platformID: string): AppThunk =>
  async (dispatch) => {
    try {
      await postApi.unlinkPlatform({ projectID, postID, platformID });
      dispatch(setActivePostWithMetadata(projectID, postID));
      dispatch(showNotification('Platform removed from post', 'success'));
    } catch (error) {
      dispatch(showNotification(`Failed to unlink post from platform: ${error}`, 'error'));
    }
  };

export const unlinkPostMediaFromPlatform =
  (projectID: string, postID: string, mediaID: string, platformID: string): AppThunk =>
  async (dispatch) => {
    try {
      await mediaApi.unlinkToPlatform({
        projectID,
        postID: postID,
        mediaID: mediaID,
        platformID: platformID,
      });
      dispatch(setActivePostWithMetadata(projectID, postID));
      dispatch(showNotification('Media unlinked from platform', 'success'));
    } catch (error) {
      dispatch(showNotification(`Failed to unlink media from platform: ${error}`, 'error'));
    }
  };

export const archivePost =
  (projectID: string, postID: string): AppThunk =>
  async (dispatch) => {
    try {
      await postApi.archivePost({ projectID, postID });
      dispatch(showNotification('Post archived', 'success'));
      dispatch(setActivePostWithMetadata(projectID, postID));
      dispatch(setPostListTab(PostListTabEnum.ARCHIVED));
    } catch (error) {
      dispatch(showNotification(`Failed to archive post: ${error}`, 'error'));
    }
  };

export const restorePost =
  (projectID: string, postID: string): AppThunk =>
  async (dispatch) => {
    try {
      await postApi.restorePost({ projectID, postID });
      dispatch(showNotification('Post restored', 'success'));
      dispatch(setActivePostWithMetadata(projectID, postID));
      dispatch(setPostListTab(PostListTabEnum.DRAFT));
    } catch (error) {
      dispatch(showNotification(`Failed to restore post: ${error}`, 'error'));
    }
  };

export const deletePost =
  (projectID: string, postID: string): AppThunk =>
  async (dispatch) => {
    try {
      await postApi.deletePost({ projectID, postID });
      dispatch(showNotification('Post deleted', 'success'));
      const posts = await postApi.getProjectPosts({ projectID });
      dispatch(setPosts(posts));
      dispatch(resetActivePost());
      dispatch(setPostListTab(PostListTabEnum.DRAFT));
    } catch (error) {
      dispatch(showNotification(`Failed to delete post: ${error}`, 'error'));
    }
  };

export const publishPost =
  (projectID: string, postID: string): AppThunk =>
  async (dispatch) => {
    try {
      await publisherApi.publishPost({ projectID, postID });
      dispatch(showNotification('Post published', 'success'));
      dispatch(setActivePostWithMetadata(projectID, postID));
      dispatch(setPostListTab(PostListTabEnum.PUBLISHED));
    } catch (error) {
      dispatch(showNotification(`Failed to publish post: ${error}`, 'error'));
    }
  };

export const enqueuePost =
  (projectID: string, postID: string): AppThunk =>
  async (dispatch) => {
    try {
      await postApi.enqueuePost({ projectID, postID });
      dispatch(showNotification('Post enqueued', 'success'));
      dispatch(setActivePostWithMetadata(projectID, postID));
      dispatch(setPostListTab(PostListTabEnum.QUEUE));
    } catch (error) {
      dispatch(showNotification(`Failed to enqueue post: ${error}`, 'error'));
    }
  };

export const dequeuePost =
  (projectID: string, postID: string): AppThunk =>
  async (dispatch) => {
    try {
      await postApi.dequeuePost({ projectID, postID });
      dispatch(showNotification('Post dequeued', 'success'));
      dispatch(setActivePostWithMetadata(projectID, postID));
      dispatch(setPostListTab(PostListTabEnum.DRAFT));
    } catch (error) {
      dispatch(showNotification(`Failed to dequeue post: ${error}`, 'error'));
    }
  };

export const schedulePost =
  (projectID: string, postID: string, scheduledAt: Date): AppThunk =>
  async (dispatch) => {
    try {
      await postApi.schedulePost({ projectID, postID, scheduled_at: scheduledAt.toISOString() });
      dispatch(showNotification('Post scheduled', 'success'));
      dispatch(setActivePostWithMetadata(projectID, postID));
      dispatch(setPostListTab(PostListTabEnum.SCHEDULED));
    } catch (error) {
      dispatch(showNotification(`Failed to schedule post: ${error}`, 'error'));
    }
  };

export const unschedulePost =
  (projectID: string, postID: string): AppThunk =>
  async (dispatch) => {
    try {
      await postApi.unschedulePost({ projectID, postID });
      dispatch(showNotification('Post unscheduled', 'success'));
      dispatch(setActivePostWithMetadata(projectID, postID));
      dispatch(setPostListTab(PostListTabEnum.DRAFT));
    } catch (error) {
      dispatch(showNotification(`Failed to unschedule post: ${error}`, 'error'));
    }
  };

export const validatePostForPlatform =
  (projectID: string, postID: string, platformID: string): AppThunk =>
  async (dispatch) => {
    try {
      await publisherApi.validatePostForPlatform({ projectID, postID, platformID });
      dispatch(showNotification('Post validated', 'success'));
    } catch (error) {
      dispatch(showNotification(`Failed to validate post: ${error}`, 'error'));
    }
  };

export const getPublishPostInfo =
  (projectID: string, postID: string, platformID: string): AppThunk =>
  async (dispatch) => {
    try {
      const info = await publisherApi.getPublishPostInfo({ projectID, postID, platformID });
      dispatch(setPublishInfo(info));
    } catch (error) {
      dispatch(showNotification(`Failed to get publish info: ${error}`, 'error'));
    }
  };

// Selectors
export const selectActivePost = (state: RootState) => state.activePost.post;
export const selectActivePostMediaData = (state: RootState) => state.activePost.mediaMetadata;
export const selectActivePostLinkedPlatforms = (state: RootState) =>
  state.activePost.post?.linkedPlatforms;
export const selectActivePostPublishInfo = (state: RootState) => state.activePost.publishInfo;

export default activePostSlice.reducer;
