import { ApiConfig, createApi, EndpointConfig } from '../api';
import { Publisher } from '../publisher/types';
import { DefaultUserPlatformInfo, GetProjectResponse, Project } from './types';

const projectApiConfig: ApiConfig<{
  createProject: EndpointConfig<{ name: string; description: string }, Project>;
  updateProject: EndpointConfig<{ projectID: string; name: string; description: string }, Project>;
  deleteProject: EndpointConfig<{ projectID: string }, void>;
  getProjects: EndpointConfig<void, Project[]>;
  getProject: EndpointConfig<{ projectID: string }, GetProjectResponse>;
  getEnabledSocialPlatforms: EndpointConfig<{ projectID: string }, Publisher[]>;
  enableSocialPlatform: EndpointConfig<{ projectID: string; platformID: string }, void>;
  disableSocialPlatform: EndpointConfig<{ projectID: string; platformID: string }, void>;
  getDefaultUserInfo: EndpointConfig<
    { projectID: string; platformID: string },
    DefaultUserPlatformInfo
  >;
  addUserToProject: EndpointConfig<{ projectID: string; email: string }, void>;
  removeUserFromProject: EndpointConfig<{ projectID: string; userID: string }, void>;
  getUserRoles: EndpointConfig<{ projectID: string; userID: string }, string[]>;
  addRoleToUser: EndpointConfig<{ projectID: string; userID: string; role: number }, void>;
  removeRoleFromUser: EndpointConfig<{ projectID: string; userID: string; role: number }, void>;
}> = {
  basePath: '/projects',
  endpoints: {
    createProject: {
      method: 'POST',
      path: '',
    },
    updateProject: {
      method: 'PATCH',
      path: '/{projectID}',
      pathValues: ['projectID'],
    },
    deleteProject: {
      method: 'DELETE',
      path: '/{projectID}',
      pathValues: ['projectID'],
    },
    getProjects: {
      method: 'GET',
      path: '',
    },
    getProject: {
      method: 'GET',
      path: '/{projectID}',
      pathValues: ['projectID'],
    },
    getEnabledSocialPlatforms: {
      method: 'GET',
      path: '/{projectID}/social-platforms',
      pathValues: ['projectID'],
    },
    enableSocialPlatform: {
      method: 'POST',
      path: '/{projectID}/enable-social-platform/{platformID}',
      pathValues: ['projectID', 'platformID'],
    },
    disableSocialPlatform: {
      method: 'DELETE',
      path: '/{projectID}/disable-social-platform/{platformID}',
      pathValues: ['projectID', 'platformID'],
    },
    getDefaultUserInfo: {
      method: 'GET',
      path: '/{projectID}/default-user-platform-info/{platformID}',
      pathValues: ['projectID', 'platformID'],
    },
    addUserToProject: {
      method: 'POST',
      path: '/{projectID}/add-user',
      pathValues: ['projectID'],
    },
    removeUserFromProject: {
      path: '/{projectID}/remove-user/{userID}',
      method: 'DELETE',
      pathValues: ['projectID', 'userID'],
    },
    getUserRoles: {
      method: 'GET',
      path: '/{projectID}/user-roles/{userID}',
      pathValues: ['projectID', 'userID'],
    },
    addRoleToUser: {
      method: 'POST',
      path: '/{projectID}/add-role/{userID}/{role}',
      pathValues: ['projectID', 'userID', 'role'],
    },
    removeRoleFromUser: {
      method: 'DELETE',
      path: '/{projectID}/remove-role/{userID}/{role}',
      pathValues: ['projectID', 'userID', 'role'],
    },
  },
};

export const projectApi = createApi(projectApiConfig);
