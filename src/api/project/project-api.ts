import { ApiConfig, createApi, EndpointConfig } from "../api";
import { Project } from "./types";


const projectApiConfig: ApiConfig<{
    getProjects: EndpointConfig<void, Project[]>;
}> = {
    basePath: '/projects',
    endpoints: {
        getProjects: {
            method: 'GET',
            path: '',
        },
    },
}

export const projectApi = createApi(projectApiConfig);