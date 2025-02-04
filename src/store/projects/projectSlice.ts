import { Project } from '../../api/project/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { projectApi } from '../../api/project/project-api';
import { addRole } from './utils';
import { Publisher } from '../../api/publisher/types';
import { Post } from '../../api/posts/types';
import { postApi } from '../../api/posts/postApi';
import { RootState } from '../root-reducer';
import { showNotification } from '../notifications/notificationSice';
import { PostListTabEnum, setPostListTab } from '../ui/uiSlice';
import { resetActivePost } from '../activePost/activePostSlice';

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
    setActiveProject(state, action: PayloadAction<Project>) {
      state.activeProject = action.payload;
    },
    setEnabledPlatforms(state, action: PayloadAction<Publisher[]>) {
      state.enabledPlatforms = action.payload;
    },
    setPosts(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
    },
    setTeam(state, action: PayloadAction<User[]>) {
      state.team = action.payload;
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
  cleanProjectState,
  addUserPlatformInfo,
  setActiveProject,
  setTeam,
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
export const deleteProject =
  (projectID: string): AppThunk =>
  async (dispatch) => {
    try {
      await projectApi.deleteProject({ projectID });
      dispatch(cleanProjectState());
      dispatch(resetActivePost());
      dispatch(showNotification('Project deleted', 'success'));
    } catch (error) {
      dispatch(showNotification(`Failed to delete project: ${error}`, 'error'));
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
      dispatch(setPostListTab(PostListTabEnum.DRAFT));
    } catch (error) {
      dispatch(showNotification(`Failed to create post: ${error}`, 'error'));
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
export const movePostInQueue =
  (projectID: string, currentIndex: number, newIndex: number): AppThunk =>
  async (dispatch) => {
    try {
      await postApi.movePostInQueue({
        projectID,
        current_index: currentIndex,
        new_index: newIndex,
      });
      const project = (await projectApi.getProject({ projectID })).project;
      dispatch(setActiveProject(project));
    } catch (error) {
      dispatch(showNotification(`Failed to move post in queue: ${error}`, 'error'));
    }
  };
export const moveIdeaInQueue =
  (projectID: string, currentIndex: number, newIndex: number): AppThunk =>
  async (dispatch) => {
    try {
      await postApi.moveIdeaInQueue({
        projectID,
        current_index: currentIndex,
        new_index: newIndex,
      });
      const project = (await projectApi.getProject({ projectID })).project;
      dispatch(setActiveProject(project));
    } catch (error) {
      dispatch(showNotification(`Failed to move idea in queue: ${error}`, 'error'));
    }
  };
export const updateProject =
  (projectID: string, name: string, description: string): AppThunk =>
  async (dispatch) => {
    try {
      const project = await projectApi.updateProject({ projectID, name, description });
      dispatch(setActiveProject(project));
      dispatch(showNotification('Project updated', 'success'));
    } catch (error) {
      dispatch(showNotification(`Failed to update project: ${error}`, 'error'));
    }
  };
export const updateTeamMembers =
  (projectID: string): AppThunk =>
  async (dispatch) => {
    try {
      const response = await projectApi.getProject({ projectID });
      const team = addRole(response.users);
      dispatch(setTeam(team));
    } catch (error) {
      dispatch(showNotification(`Failed to update team members: ${error}`, 'error'));
    }
  };
export const addUserToProject =
  (projectID: string, email: string): AppThunk =>
  async (dispatch) => {
    try {
      await projectApi.addUserToProject({ projectID, email });
      dispatch(showNotification('User added to project', 'success'));
      dispatch(updateTeamMembers(projectID));
    } catch (error) {
      dispatch(showNotification(`Failed to add user to project: ${error}`, 'error'));
    }
  };
export const removeUserFromProject =
  (projectID: string, userID: string): AppThunk =>
  async (dispatch) => {
    try {
      await projectApi.removeUserFromProject({ projectID, userID });
      dispatch(showNotification('User removed from project', 'success'));
      dispatch(updateTeamMembers(projectID));
    } catch (error) {
      dispatch(showNotification(`Failed to remove user from project: ${error}`, 'error'));
    }
  };

/**SELECTORS */
export const selectActiveProject = (state: RootState) => state.project.activeProject;
export const selectPosts = (state: RootState) => state.project.posts;
export const selectTeam = (state: RootState) => state.project.team;
export const selectEnabledPlatforms = (state: RootState) => state.project.enabledPlatforms;
export const selectPlatformInfo = (platformID: string) => (state: RootState) =>
  state.project.defaultUserPlatformInfo.find((info) => info.platformID === platformID);
