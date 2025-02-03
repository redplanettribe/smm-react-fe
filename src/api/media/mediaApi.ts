import { ApiConfig, createApi, EndpointConfig } from '../api';
import { DownloadMetadata, UploadMediaRequest } from './types';

const mediaApiConfig: ApiConfig<{
  downloadMediaMetadata: EndpointConfig<{ projectID: string; postID: string }, DownloadMetadata[]>;
  uploadMedia: EndpointConfig<UploadMediaRequest, DownloadMetadata>;
  linkToPlatform: EndpointConfig<
    { projectID: string; postID: string; mediaID: string; platformID: string },
    string
  >;
  unlinkToPlatform: EndpointConfig<
    { projectID: string; postID: string; mediaID: string; platformID: string },
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
      path: '/{projectID}/{postID}/{platformID}/{mediaID}/link',
      pathValues: ['projectID', 'postID', 'platformID', 'mediaID'],
    },
    unlinkToPlatform: {
      method: 'DELETE',
      path: '/{projectID}/{postID}/{platformID}/{mediaID}/unlink',
      pathValues: ['projectID', 'postID', 'platformID', 'mediaID'],
    },
  },
};

export const mediaApi = createApi(mediaApiConfig);
