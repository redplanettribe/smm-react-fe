import { ApiConfig, createApi, EndpointConfig } from "../api";
import { CreateUserRequest, LoginResponse, UpdateUserRequest, User as UserResponse } from "./types";


const userApiConfig: ApiConfig<{
  login: EndpointConfig<{ email: string; password: string }, LoginResponse>;
  getUser: EndpointConfig<void, UserResponse>;
  createUser: EndpointConfig<CreateUserRequest, UserResponse>;
  updateUser: EndpointConfig<UpdateUserRequest, UserResponse>;
  deleteUser: EndpointConfig<{ id: string }, void>;
}> = {
  baseUrl: '/users',
  endpoints: {
    login: {
      method: 'POST',
      url: '/login',
    },
    getUser: {
      method: 'GET',
      url: '/',
    },
    createUser: {
      method: 'POST',
      url: '/create',
    },
    updateUser: {
      method: 'PUT',
      url: '/update',
    },
    deleteUser: {
      method: 'DELETE',
      url: '/delete',
    },
  },
};

export const userApi = createApi(userApiConfig);
