import { ApiConfig, createApi, EndpointConfig } from '../api';
import { DownloadMetadata, UploadMediaRequest } from './types';

const mediaApiConfig: ApiConfig<{
  downloadMediaMetadata: EndpointConfig<{ projectID: string; postID: string }, DownloadMetadata[]>;
  uploadMedia: EndpointConfig<UploadMediaRequest, DownloadMetadata>;
  linkToPlatform: EndpointConfig<
    { projectID: string; post_id: string; media_id: string; platform_id: string },
    string
  >;
}> = {
  basePath: '/media',
  endpoints: {
    downloadMediaMetadata: {
      method: 'GET',
      path: '/{projectID}/{postID}/meta',
      pathValues: ['projectID', 'postID'],
    },
    uploadMedia: {
      method: 'POST',
      path: '/{projectID}/{postID}',
      pathValues: ['projectID', 'postID'],
      contentType: 'multipart',
    },
    linkToPlatform: {
      method: 'POST',
      path: '/{projectID}/link-to-platform',
      pathValues: ['projectID'],
    },
  },
};

export const mediaApi = createApi(mediaApiConfig);
