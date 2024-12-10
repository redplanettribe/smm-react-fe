import { ApiConfig, createApi, EndpointConfig } from "../api";
import { CreateUserRequest, LoginResponse, UpdateUserRequest, User as UserResponse } from "./types";


const userApiConfig: ApiConfig<{
  login: EndpointConfig<{ email: string; password: string }, LoginResponse>;
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
    getUser: {
      method: 'GET',
      path: '/me',
    },
    createUser: {
      method: 'POST',
      path: '/create',
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
