export const config = {
  baseUrl: 'https://localhost:8443'
};

export type EndpointConfig<RequestType, ResponseType> = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    path: string;
    pathValues?: (keyof RequestType)[];
    requestType?: RequestType;
    responseType?: ResponseType;
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
        let url = endpoint.path;
        if (endpoint.pathValues && params) {
          for (const param of endpoint.pathValues as (keyof typeof params)[]) {
            url = url.replace(`{${String(param)}}`, String(params[param]));
          }
        }

        // Remove path values from the params object
        if (endpoint.pathValues) {
          for (const param of endpoint.pathValues as (keyof typeof params)[]) {
            delete params[param];
          }
        }
       
        const response = await fetch(
          config.baseUrl + enpointConfig.basePath + url,
          {
            method: endpoint.method,
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body:
              endpoint.method !== 'GET' && endpoint.method !== 'DELETE'
                ? JSON.stringify(params)
                : undefined,
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API request failed with status ${response.status}: ${errorText}`);
        }

        const contentType = response.headers.get('Content-Type');
        if (endpoint.method !== 'DELETE' && contentType?.includes('application/json')) {
          const data = await response.json();
          return data as Endpoints[K] extends EndpointConfig<any, infer Res> ? Res : never;
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