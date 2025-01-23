import store from "../store/store";
import { clearUser } from "../store/user/userSlice";
import { toCamelCase } from "./utils";

export const config = {
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5555'
};

console.log('API URL:', config.baseUrl);

export type EndpointConfig<RequestType, ResponseType> = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  pathValues?: (keyof RequestType)[];
  requestType?: RequestType;
  responseType?: ResponseType;
  contentType?: 'json' | 'multipart'
};

export type ApiConfig<Endpoints extends Record<string, EndpointConfig<any, any>>> = {
  basePath: string;
  endpoints: Endpoints;
};

export function createApi<Endpoints extends { [key: string]: EndpointConfig<any, any> }>(
  enpointConfig: ApiConfig<Endpoints>
) {
  type ApiMethods = {
    [K in keyof Endpoints]: Endpoints[K] extends EndpointConfig<infer Req, infer Res>
    ? (params: Req) => Promise<Res>
    : never;
  };

  const api = {} as ApiMethods;

  const createApiMethod = <K extends keyof Endpoints>(key: K, endpoint: Endpoints[K]) => {
    return async (params: Endpoints[K] extends EndpointConfig<infer Req, any> ? Req : never) => {
      try {

        // Replace path values in the URL with the actual values from the params object
        let path = endpoint.path;
        if (endpoint.pathValues && params) {
          for (const param of endpoint.pathValues as (keyof typeof params)[]) {
            path = path.replace(`{${String(param)}}`, String(params[param]));
          }
        }

        // Remove path values from params
        type RequestType = Endpoints[K] extends EndpointConfig<infer Req, any> ? Req : never;
        const bodyParams: Partial<RequestType> =
          params && typeof params === 'object' && !Array.isArray(params)
            ? { ...params as Partial<RequestType> }
            : {};

        // Remove path values from params
        if (endpoint.pathValues) {
          for (const param of endpoint.pathValues as (keyof typeof params)[]) {
            delete bodyParams[param];
          }
        }
        let body: string | FormData | undefined;
        const headers: HeadersInit = {};

        if (Object.keys(bodyParams).length > 0) {
          if (endpoint.contentType === 'multipart') {
            // Handle form-data
            const formData = new FormData();
            Object.entries(bodyParams).forEach(([key, value]) => {
              if (value instanceof File) {
                formData.append(key, value);
              } else {
                formData.append(key, String(value));
              }
            });
            body = formData;
          } else {
            // Handle JSON
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(bodyParams);
          }
        }


        const response = await fetch(
          config.baseUrl + enpointConfig.basePath + path,
          {
            method: endpoint.method,
            headers,
            credentials: 'include',
            body,
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            store.dispatch(clearUser());
            window.location.href = '/login';
            return;
          }
          const errorText = await response.text();
          throw new Error(`${response.status}: ${errorText}`);
        }

        const contentType = response.headers.get('Content-Type');
        if (endpoint.method !== 'DELETE' && contentType?.includes('application/json')) {
          const data = await response.json();
          return toCamelCase(data) as Endpoints[K] extends EndpointConfig<any, infer Res> ? Res : never;
        } else {
          return undefined as any;
        }
      } catch (error) {
        console.error(`Error in API method ${String(key)}:`, error);
        throw error;
      }
    };
  };

  for (const key in enpointConfig.endpoints) {
    api[key] = createApiMethod(key, enpointConfig.endpoints[key]) as ApiMethods[typeof key];
  }

  return api;
}