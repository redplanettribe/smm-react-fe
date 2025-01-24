import { ApiConfig, createApi, EndpointConfig } from '../api';
import { Publisher } from './types';

const publisherApiConfig: ApiConfig<{
  getAvailablePublishers: EndpointConfig<void, Publisher[]>;
  authenticatePlatform: EndpointConfig<
    { projectID: string; userID: string; platformID: string; code: string },
    void
  >;
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
  },
};

export const publisherApi = createApi(publisherApiConfig);
