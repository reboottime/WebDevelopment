export type HttpClientOptions = Pick<
  RequestInit,
  'credentials' | 'headers' | 'mode'
>;

export interface RequestConf {
  apiPath: string;
  data?: unknown;
  headers?: HttpClientOptions['headers'];
  method: 'DELETE' | 'GET' | 'POST' | 'PATCH' | 'PUT';
  query?: Record<string, string> | string[][];
}

export interface UpdateRequestConf
  extends Required<Pick<RequestConf, 'apiPath' | 'data'>> {
  headers?: RequestConf['headers'];
}
