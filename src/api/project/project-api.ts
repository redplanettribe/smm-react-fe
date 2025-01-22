import { ApiConfig, createApi, EndpointConfig } from "../api";
import { GetProjectResponse, Project } from "./types";


const projectApiConfig: ApiConfig<{
    getProjects: EndpointConfig<void, Project[]>;
    getProject: EndpointConfig<{ projectID: string }, GetProjectResponse>;
}> = {
    basePath: '/projects',
    endpoints: {
        getProjects: {
            method: 'GET',
            path: '',
        },
        getProject: {
            method: 'GET',
            path: '/{projectID}',
            pathValues: ['projectID'],
        },
    },
}

export const projectApi = createApi(projectApiConfig);