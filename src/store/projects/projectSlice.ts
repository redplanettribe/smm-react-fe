import { Project } from "../../api/project/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { projectApi } from "../../api/project/project-api";
import { addRole } from "./utils";
import { Publisher } from "../../api/publisher/types";
import { Post } from "../../api/posts/types";
import { postApi } from "../../api/posts/postApi";

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
        }
    }
})

export const { setProjectState, getProjectState, setEnabledPlatforms, setPosts } = projectSlice.actions;
export default projectSlice.reducer;

export const setSelectedProject = (projectID: string): AppThunk => async (dispatch) => {
    try {
        const [response, enabledPlatforms, posts] = await Promise.all([
            projectApi.getProject({ projectID }),
            projectApi.getEnabledSocialPlatforms({ projectID }),
            postApi.getProjectPosts({ projectID }),
        ]);
        const project = response.project;
        const team = addRole(response.users);
        dispatch(setProjectState({ activeProject: project, team, enabledPlatforms, posts }));
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