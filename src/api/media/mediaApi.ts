import { ApiConfig, createApi, EndpointConfig } from "../api";
import { DownloadMetadata, UploadMediaRequest } from "./types";

const mediaApiConfig: ApiConfig<{
    downloadMediaMetadata: EndpointConfig<{ projectID: string, postID: string }, DownloadMetadata[]>;
    uploadMedia: EndpointConfig<UploadMediaRequest, DownloadMetadata>;
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
    },
}

export const mediaApi = createApi(mediaApiConfig);