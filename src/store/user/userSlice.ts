import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { userApi } from "../../api/user/user-api";
import { marshallUnauthenticatedUser, marshallUser } from "./utils";

export interface User {
  id: string
  name: string
  email: string
  AppRoles: string[]
  IsAuthenticated: boolean
}

const initialState: User = {
  id: '',
  name: '',
  email: '',
  AppRoles: [],
  IsAuthenticated: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(_, action: PayloadAction<User>) {
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

export const login = (email: string, password: string): AppThunk => async (dispatch) => {
  try {
    const loginResponse = await userApi.login({ email, password });
    const user = marshallUser(loginResponse.User);
    dispatch(setUser(user));
  } catch (error) {
    console.error('Failed to login:', error);
    // show an error message to the user
  }
};

export const logout = (): AppThunk => async (dispatch) => {
  try {
    await userApi.logout();
    dispatch(clearUser());
  } catch (error) {
    console.error('Failed to logout:', error);
    // show an error message to the user
  }
};

export const getUser = (): AppThunk => async (dispatch) => {
  try {
    const user = marshallUser(await userApi.getUser());
    dispatch(setUser(user));
  } catch (error) {

  }
};

export const signup = (username: string, email: string, password: string): AppThunk => async (dispatch) => {
  try {
    const user = marshallUnauthenticatedUser(await userApi.createUser({ username, email, password }));
    dispatch(setUser(user));
  } catch (error) {
    console.error('Failed to signup:', error);
    // show an error message to the user
  }
};


export default userSlice.reducer;