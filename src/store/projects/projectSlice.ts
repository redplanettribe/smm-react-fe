import { Project, ProjectUser } from "../../api/project/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { projectApi } from "../../api/project/project-api";

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
    team: []
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
        }
    }
})

export const { setProjectState, getProjectState } = projectSlice.actions;
export default projectSlice.reducer;

export const setSelectedProject = (projectID: string): AppThunk => async (dispatch) => {
    try {
        const response = await projectApi.getProject({ projectID });
        const project = response.project;
        const team = addRole(response.users);
        dispatch(setProjectState({ activeProject: project, team }));
    } catch (error) {
        console.error(error);
    }
}

export const PROJECT_ROLES = {
    1: 'Member',
    2: 'Manager',
    3: 'Owner',
} as const;

const addRole = (users: ProjectUser[]): User[] => {
    return users.map(user => {
        return {
            ...user,
            role: PROJECT_ROLES[user.maxRole as keyof typeof PROJECT_ROLES]
        }
    })
}

export const createProject = (name: string, description: string): AppThunk => async (dispatch) => {
    try {
        const proj = await projectApi.createProject({ name, description });
        dispatch(setSelectedProject(proj.id));
    } catch (error) {
        console.error(error);
    }
}