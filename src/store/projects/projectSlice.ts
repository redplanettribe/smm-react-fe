import { Project } from "../../api/project/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { projectApi } from "../../api/project/project-api";
import { addRole } from "./utils";
import { Publisher } from "../../api/publisher/types";
import { Post } from "../../api/posts/types";
import { postApi } from "../../api/posts/postApi";
import { RootState } from "../root-reducer";
import { DownloadMetadata } from "../../api/media/types";
import { mediaApi } from "../../api/media/mediaApi";

export interface User {
    id: string
    name: string
    email: string
    defaultUser: boolean
    addedAt: string
    maxRole: number
    role: string
}
export interface ProjectState {
    activeProject: Project
    team: User[]
    enabledPlatforms: Publisher[]
    posts: Post[]
    activePost: Post | null
    activePostMediaMetadata: DownloadMetadata[] | null
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
}

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
        setActivePost(state, action: PayloadAction<{ post: Post, metadata: DownloadMetadata[] }>) {
            state.activePost = action.payload.post;
            state.activePostMediaMetadata = action.payload.metadata;
        },
        cleanProjectState() {
            return initialState;
        },
    }
})

export const { setProjectState, getProjectState, setEnabledPlatforms, setPosts, setActivePost, cleanProjectState } = projectSlice.actions;
export default projectSlice.reducer;

/**ASYNC ACTIONS */

export const setSelectedProject = (projectID: string): AppThunk => async (dispatch) => {
    try {
        const [response, enabledPlatforms, posts] = await Promise.all([
            projectApi.getProject({ projectID }),
            projectApi.getEnabledSocialPlatforms({ projectID }),
            postApi.getProjectPosts({ projectID }),
        ]);
        const project = response.project;
        const team = addRole(response.users);
        dispatch(setProjectState({ activeProject: project, team, enabledPlatforms, posts, activePost: null, activePostMediaMetadata: null }));
    } catch (error) {
        console.error(error);
    }
}

export const createProject = (name: string, description: string): AppThunk => async (dispatch) => {
    try {
        const proj = await projectApi.createProject({ name, description });
        dispatch(setSelectedProject(proj.id));
    } catch (error) {
        console.error(error);
    }
}

export const getEnabledPlatforms = (projectID: string): AppThunk => async (dispatch) => {
    try {
        const enabledPlatforms = await projectApi.getEnabledSocialPlatforms({ projectID });
        dispatch(setEnabledPlatforms(enabledPlatforms));
    } catch (error) {
        console.error(error);
    }
}

export const enablePlatform = (projectID: string, platformID: string): AppThunk => async (dispatch) => {
    try {
        await projectApi.enableSocialPlatform({ projectID, platformID });
        dispatch(getEnabledPlatforms(projectID));
    } catch (error) {
        console.error(error);
    }
}

export const getPosts = (projectID: string): AppThunk => async (dispatch) => {
    try {
        const posts = await postApi.getProjectPosts({ projectID });
        dispatch(setPosts(posts));
    } catch (error) {
        console.error(error);
    }
}

export const createPost = (projectID: string, title: string, content: string, type: string, isIdea: boolean): AppThunk => async (dispatch) => {
    try {
        await postApi.createPost({ projectID, title, text_content: content, type, is_idea: isIdea });
        dispatch(getPosts(projectID));
    } catch (error) {
        console.error(error);
    }
}

export const setActivePostWithMetadata = (projectID: string, postID: string): AppThunk => async (dispatch) => {
    try {
        const [post, metadata] = await Promise.all([
            postApi.getPost({ projectID, postID }),
            mediaApi.downloadMediaMetadata({ projectID, postID }),
        ]);
        dispatch(setActivePost({ post, metadata }));
    } catch (error) {
        console.error(error);
    }
}

/**SELECTORS */
export const selectActivePost = (state: RootState) => state.project.activePost;
export const selectPosts = (state: RootState) => state.project.posts;
export const selectTeam = (state: RootState) => state.project.team;
export const selectEnabledPlatforms = (state: RootState) => state.project.enabledPlatforms;
export const selectActivePostMediaData = (state: RootState) => state.project.activePostMediaMetadata;