import { ApiConfig, createApi, EndpointConfig } from "../api";
import { Publisher } from "./types";


const publisherApiConfig: ApiConfig<{
    getAvailablePublishers: EndpointConfig<void, Publisher[]>;
}> = {
    basePath: '/publishers',
    endpoints: {
        getAvailablePublishers: {
            method: 'GET',
            path: '',
        },
    },
}

export const publisherApi = createApi(publisherApiConfig);