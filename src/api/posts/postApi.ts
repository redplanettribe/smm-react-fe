import { ApiConfig, createApi, EndpointConfig } from '../api';
import { Post } from './types';

const postApiConfig: ApiConfig<{
  getProjectPosts: EndpointConfig<{ projectID: string }, Post[]>;
  getAvailablePostTypes: EndpointConfig<void, string[]>;
  createPost: EndpointConfig<
    { projectID: string; title: string; text_content: string; type: string; is_idea: boolean },
    Post
  >;
  getPost: EndpointConfig<{ projectID: string; postID: string }, Post>;
  linkPlatform: EndpointConfig<{ projectID: string; postID: string; platformID: string }, void>;
  enqueuePost: EndpointConfig<{ projectID: string; postID: string }, void>;
  schedulePost: EndpointConfig<{ projectID: string; postID: string; scheduled_at: string }, void>;
  unschedulePost: EndpointConfig<{ projectID: string; postID: string }, void>;
  movePostInQueue: EndpointConfig<
    { projectID: string; current_index: number; new_index: number },
    void
  >;
  archivePost: EndpointConfig<{ projectID: string; postID: string }, void>;
}> = {
  basePath: '/posts',
  endpoints: {
    getProjectPosts: {
      method: 'GET',
      path: '/{projectID}',
      pathValues: ['projectID'],
    },
    getAvailablePostTypes: {
      method: 'GET',
      path: '',
    },
    createPost: {
      method: 'POST',
      path: '/{projectID}/add',
      pathValues: ['projectID'],
    },
    getPost: {
      method: 'GET',
      path: '/{projectID}/{postID}',
      pathValues: ['projectID', 'postID'],
    },
    linkPlatform: {
      method: 'POST',
      path: '/{projectID}/{postID}/platforms/{platformID}',
      pathValues: ['projectID', 'postID', 'platformID'],
    },
    enqueuePost: {
      method: 'PATCH',
      path: '/{projectID}/{postID}/enqueue',
      pathValues: ['projectID', 'postID'],
    },
    schedulePost: {
      method: 'PATCH',
      path: '/{projectID}/{postID}/schedule',
      pathValues: ['projectID', 'postID'],
    },
    unschedulePost: {
      method: 'PATCH',
      path: '/{projectID}/{postID}/unschedule',
      pathValues: ['projectID', 'postID'],
    },
    movePostInQueue: {
      method: 'PATCH',
      path: '/{projectID}/queue/move',
      pathValues: ['projectID'],
    },
    archivePost: {
      method: 'PATCH',
      path: '/{projectID}/{postID}/archive',
      pathValues: ['projectID', 'postID'],
    },
  },
};

export const postApi = createApi(postApiConfig);
