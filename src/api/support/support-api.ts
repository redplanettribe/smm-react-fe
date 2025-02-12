import { ApiConfig, createApi, EndpointConfig } from '../api';

const supportApiConfig: ApiConfig<{
  getXRequestToken: EndpointConfig<
    void,
    { oauthToken: string; oauthTokenSecret: string; oauthCallbackConfirmed: string }
  >;
}> = {
  basePath: '/support',
  endpoints: {
    getXRequestToken: {
      method: 'GET',
      path: '/x/get-request-token',
    },
  },
};

export const supportApi = createApi(supportApiConfig);
