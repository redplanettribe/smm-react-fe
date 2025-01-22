import { ApiConfig, createApi, EndpointConfig } from "../api";
import { Post } from "./types";

const postApiConfig: ApiConfig<{
    getProjectPosts: EndpointConfig<{ projectID: string }, Post[]>;
    getAvailablePostTypes: EndpointConfig<void, string[]>;
    createPost: EndpointConfig<{ title: string, content: string, type: string, isIdea: boolean }, Post>;
    getPost: EndpointConfig<{ projectID: string, postID: string }, Post>;
    linkPlatform: EndpointConfig<{ projectID: string, postID: string, platformID: string }, void>;
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
            path: '',
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

    },
}

export const postApi = createApi(postApiConfig);
