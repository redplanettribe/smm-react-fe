import { ApiConfig, createApi, EndpointConfig } from '../api';
import { Publisher } from './types';

const publisherApiConfig: ApiConfig<{
  getAvailablePublishers: EndpointConfig<void, Publisher[]>;
  authenticatePlatform: EndpointConfig<
    { projectID: string; userID: string; platformID: string; code: string },
    void
  >;
  publishPost: EndpointConfig<{ projectID: string; postID: string }, void>;
}> = {
  basePath: '/publishers',
  endpoints: {
    getAvailablePublishers: {
      method: 'GET',
      path: '',
    },
    authenticatePlatform: {
      method: 'POST',
      path: '/{projectID}/{userID}/{platformID}/authenticate/{code}',
      pathValues: ['projectID', 'userID', 'platformID', 'code'],
    },
    publishPost: {
      method: 'POST',
      path: '/{projectID}/{postID}',
      pathValues: ['projectID', 'postID'],
    },
  },
};

export const publisherApi = createApi(publisherApiConfig);
