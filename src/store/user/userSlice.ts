import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../features/user/User";
import {  AppThunk } from "../store";
import { userApi } from "../../api/user/user-api";
import { LoginResponse } from "../../api/user/types";

const initialState :User = {
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
    const user = loginResponse.User;
    dispatch(setUser({
      id: user.id,
      name: user.username,
      email: user.email,
      AppRoles: user.roles?.map((role) => role.Name),
      IsAuthenticated: true,
    }));
  } catch (error) {
    console.error('Failed to login:', error);
    // show an error message to the user
  }
};

export const getUser = (): AppThunk => async (dispatch) => {
  try {
    const user = await userApi.getUser();
    dispatch(setUser({
      id: user.id,
      name: user.username,
      email: user.email,
      AppRoles: user.roles?.map((role) => role.Name),
      IsAuthenticated: true,
    }));
  } catch (error) {
    
  }
};
  

export default userSlice.reducer;