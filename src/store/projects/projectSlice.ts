import { Project } from "../../api/project/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { projectApi } from "../../api/project/project-api";
import { addRole } from "./utils";
import { Publisher } from "../../api/publisher/types";

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
    enabledPlatforms: []
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
    }
})

export const { setProjectState, getProjectState, setEnabledPlatforms } = projectSlice.actions;
export default projectSlice.reducer;

export const setSelectedProject = (projectID: string): AppThunk => async (dispatch) => {
    try {
        const [response, enabledPlatforms] = await Promise.all([
            projectApi.getProject({ projectID }),
            projectApi.getEnabledSocialPlatforms({ projectID })
        ]);
        const project = response.project;
        const team = addRole(response.users);
        dispatch(setProjectState({ activeProject: project, team, enabledPlatforms }));
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