import { Project } from '../../api/project/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { projectApi } from '../../api/project/project-api';
import { addRole } from './utils';
import { Publisher } from '../../api/publisher/types';
import { Post } from '../../api/posts/types';
import { postApi } from '../../api/posts/postApi';
import { RootState } from '../root-reducer';
import { DownloadMetadata } from '../../api/media/types';
import { mediaApi } from '../../api/media/mediaApi';
import { showNotification } from '../notifications/notificationSice';
import { publisherApi } from '../../api/publisher/publisher-api';

export interface User {
  id: string;
  name: string;
  email: string;
  defaultUser: boolean;
  addedAt: string;
  maxRole: number;
  role: string;
}

export interface DefaultUserPlatformInfo {
  platformID: string;
  isAuthenticated: boolean;
  authTTL: string;
}
export interface ProjectState {
  activeProject: Project;
  team: User[];
  enabledPlatforms: Publisher[];
  posts: Post[];
  activePost: Post | null;
  activePostMediaMetadata: DownloadMetadata[] | null;
  defaultUserPlatformInfo: DefaultUserPlatformInfo[];
}

const initialState: ProjectState = {
  activeProject: {
    id: '',
    name: '',
    ideaQueue: [],
    postQueue: [],
    description: '',
    createdAt: '',
    updatedAt: '',
    createdBy: '',
  },
  team: [],
  enabledPlatforms: [],
  posts: [],
  activePost: null,
  activePostMediaMetadata: null,
  defaultUserPlatformInfo: [],
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjectState(_, action: PayloadAction<ProjectState>) {
      return action.payload;
    },
    getProjectState(state) {
      return state;
    },
    setEnabledPlatforms(state, action: PayloadAction<Publisher[]>) {
      state.enabledPlatforms = action.payload;
    },
    setPosts(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
    },
    setActivePost(state, action: PayloadAction<{ post: Post; metadata: DownloadMetadata[] }>) {
      state.activePost = action.payload.post;
      state.activePostMediaMetadata = action.payload.metadata;
    },
    setActivePostMediaMetadata(state, action: PayloadAction<DownloadMetadata[]>) {
      state.activePostMediaMetadata = action.payload;
    },
    cleanProjectState() {
      return initialState;
    },
    addUserPlatformInfo(state, action: PayloadAction<DefaultUserPlatformInfo>) {
      if (state.defaultUserPlatformInfo) {
        const index = state.defaultUserPlatformInfo.findIndex(
          (info) => info.platformID === action.payload.platformID
        );
        if (index !== -1) {
          state.defaultUserPlatformInfo[index] = action.payload;
        } else {
          state.defaultUserPlatformInfo.push(action.payload);
        }
      }
    },
  },
});

export const {
  setProjectState,
  getProjectState,
  setEnabledPlatforms,
  setPosts,
  setActivePost,
  cleanProjectState,
  setActivePostMediaMetadata,
  addUserPlatformInfo,
} = projectSlice.actions;
export default projectSlice.reducer;

/**ASYNC ACTIONS */

export const setSelectedProject =
  (projectID: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      const [response, enabledPlatforms, posts] = await Promise.all([
        projectApi.getProject({ projectID }),
        projectApi.getEnabledSocialPlatforms({ projectID }),
        postApi.getProjectPosts({ projectID }),
      ]);
      const project = response.project;
      const team = addRole(response.users);
      const currentState = getState();
      dispatch(
        setProjectState({
          activeProject: project,
          team,
          enabledPlatforms,
          posts,
          activePost: null,
          activePostMediaMetadata: null,
          defaultUserPlatformInfo: currentState.project.defaultUserPlatformInfo,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

export const createProject =
  (name: string, description: string): AppThunk =>
  async (dispatch) => {
    try {
      const proj = await projectApi.createProject({ name, description });
      dispatch(setSelectedProject(proj.id));
      dispatch(showNotification(`Project ${proj.name} created succesfully`, 'success'));
    } catch (error) {
      dispatch(showNotification(`Failed to create project: ${error}`, 'error'));
    }
  };

export const getEnabledPlatforms =
  (projectID: string): AppThunk =>
  async (dispatch) => {
    try {
      const enabledPlatforms = await projectApi.getEnabledSocialPlatforms({ projectID });
      dispatch(setEnabledPlatforms(enabledPlatforms));
    } catch (error) {
      dispatch(showNotification(`Failed to get enabled platforms: ${error}`, 'error'));
    }
  };

export const enablePlatform =
  (projectID: string, platformID: string): AppThunk =>
  async (dispatch) => {
    try {
      await projectApi.enableSocialPlatform({ projectID, platformID });
      dispatch(getEnabledPlatforms(projectID));
      dispatch(showNotification('Platform enabled', 'success'));
    } catch (error) {
      dispatch(showNotification(`Failed to enable platform: ${error}`, 'error'));
    }
  };

export const getPosts =
  (projectID: string): AppThunk =>
  async (dispatch) => {
    try {
      const posts = await postApi.getProjectPosts({ projectID });
      dispatch(setPosts(posts));
    } catch (error) {
      dispatch(showNotification(`Failed to get posts: ${error}`, 'error'));
    }
  };

export const createPost =
  (projectID: string, title: string, content: string, type: string, isIdea: boolean): AppThunk =>
  async (dispatch) => {
    try {
      await postApi.createPost({ projectID, title, text_content: content, type, is_idea: isIdea });
      dispatch(getPosts(projectID));
      dispatch(showNotification('Post created', 'success'));
    } catch (error) {
      dispatch(showNotification(`Failed to create post: ${error}`, 'error'));
    }
  };

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

export const linkPostMediaToPlatform =
  (projectID: string, postID: string, mediaID: string, platformID: string): AppThunk =>
  async (dispatch) => {
    try {
      await mediaApi.linkToPlatform({
        projectID,
        post_id: postID,
        media_id: mediaID,
        platform_id: platformID,
      });
      dispatch(setActivePostWithMetadata(projectID, postID));
      dispatch(showNotification('Media linked to platform', 'success'));
    } catch (error) {
      dispatch(showNotification(`Failed to link media to platform: ${error}`, 'error'));
    }
  };

export const getDefaulUserPlatformInfo =
  (projectID: string, platformID: string): AppThunk =>
  async (dispatch) => {
    try {
      const info = await projectApi.getDefaultUserInfo({ projectID, platformID });
      const defaultUserPlatformInfo = {
        ...info,
        platformID,
      };
      dispatch(addUserPlatformInfo(defaultUserPlatformInfo));
    } catch (error) {
      dispatch(showNotification(`Failed to get default user platform info: ${error}`, 'error'));
    }
  };

export const publishPost =
  (projectID: string, postID: string): AppThunk =>
  async (dispatch) => {
    try {
      await publisherApi.publishPost({ projectID, postID });
      dispatch(showNotification('Post published', 'success'));
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
    } catch (error) {
      dispatch(showNotification(`Failed to enqueue post: ${error}`, 'error'));
    }
  };

/**SELECTORS */
export const selectActiveProject = (state: RootState) => state.project.activeProject;
export const selectActivePost = (state: RootState) => state.project.activePost;
export const selectPosts = (state: RootState) => state.project.posts;
export const selectTeam = (state: RootState) => state.project.team;
export const selectEnabledPlatforms = (state: RootState) => state.project.enabledPlatforms;
export const selectActivePostMediaData = (state: RootState) =>
  state.project.activePostMediaMetadata;
export const selectActivePostLinkedPlatforms = (state: RootState) =>
  state.project.activePost?.linkedPlatforms;
export const selectPlatformInfo = (platformID: string) => (state: RootState) =>
  state.project.defaultUserPlatformInfo.find((info) => info.platformID === platformID);
