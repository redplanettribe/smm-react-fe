import { ApiConfig, createApi, EndpointConfig } from "../api";

const healthApiConfig: ApiConfig<{
    ok: EndpointConfig<void, { message: string }>;
    okAuthenticated: EndpointConfig<void, { message: string }>;
}> = {
    basePath: '/health',
    endpoints: {
        ok: {
            method: 'GET',
            path: '',
        },
        okAuthenticated: {
            method: 'GET',
            path: '/auth',
        },
    },
};

export const healthApi = createApi(healthApiConfig);