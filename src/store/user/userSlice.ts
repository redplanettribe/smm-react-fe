import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { userApi } from "../../api/user/user-api";
import { marshallUnauthenticatedUser, marshallUser } from "./utils";
import { showNotification } from "../notifications/notificationSice";
import { cleanProjectState } from "../projects/projectSlice";

export interface UserState {
  id: string
  name: string
  email: string
  appRoles: string[]
  isAuthenticated: boolean
}

const initialState: UserState = {
  id: '',
  name: '',
  email: '',
  appRoles: [],
  isAuthenticated: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(_, action: PayloadAction<UserState>) {
      return action.payload;
    },
    getUser(state) {
      return state;
    },
    clearUser() {
      return initialState;
    }
  }
})

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

export const login = (email: string, password: string): AppThunk => async (dispatch) => {
  try {
    const loginResponse = await userApi.login({ email, password });
    const user = marshallUser(loginResponse.user);
    dispatch(setUser(user));
    dispatch(cleanProjectState)
    dispatch(showNotification('User logged in', 'success'));
  } catch (error) {
    console.error('Failed to login:', error);
    dispatch(showNotification('Failed to login' + error, 'error'));
  }
};

export const logout = (): AppThunk => async (dispatch) => {
  try {
    await userApi.logout();
    dispatch(clearUser());
  } catch (error) {
    dispatch(showNotification('Failed to logout', 'error'));
  }
};

export const getUser = (): AppThunk => async (dispatch) => {
  try {
    const user = marshallUser(await userApi.getUser());
    dispatch(setUser(user));
    dispatch(showNotification('User loaded', 'success'));
  } catch (error) {
    dispatch(showNotification('Failed to get user', 'error'));
    dispatch(clearUser());
  }
};

export const signup = (username: string, email: string, password: string): AppThunk => async (dispatch) => {
  try {
    const user = marshallUnauthenticatedUser(await userApi.createUser({ username, email, password }));
    dispatch(showNotification(`User ${user.name} succesfully registered`, 'success'));
    window.location.href = '/login';
  } catch (error) {
    dispatch(showNotification('Failed to signup', 'error'));
  }
};
