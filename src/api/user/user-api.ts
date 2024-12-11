import { ApiConfig, createApi, EndpointConfig } from "../api";
import { CreateUserRequest, LoginResponse, UpdateUserRequest, UserResponse as UserResponse } from "./types";


const userApiConfig: ApiConfig<{
  login: EndpointConfig<{ email: string; password: string }, LoginResponse>;
  logout: EndpointConfig<void, void>;
  getUser: EndpointConfig<void, UserResponse>;
  createUser: EndpointConfig<CreateUserRequest, UserResponse>;
  updateUser: EndpointConfig<UpdateUserRequest, UserResponse>;
  deleteUser: EndpointConfig<{ id: string }, void>;
}> = {
  basePath: '/users',
  endpoints: {
    login: {
      method: 'POST',
      path: '/login',
    },
    logout: {
      method: 'POST',
      path: '/logout',
    },
    getUser: {
      method: 'GET',
      path: '/me',
    },
    createUser: {
      method: 'POST',
      path: '',
    },
    updateUser: {
      method: 'PUT',
      path: '/update',
    },
    deleteUser: {
      method: 'DELETE',
      path: '/delete',
    },
  },
};

export const userApi = createApi(userApiConfig);
