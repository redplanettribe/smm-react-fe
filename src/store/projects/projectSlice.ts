import { Project, ProjectUser } from "../../api/project/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";


export interface ProjectState {
    activeProject: Project
    team: ProjectUser[]
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

export const login = (projectID: string): AppThunk => async (dispatch) => { }