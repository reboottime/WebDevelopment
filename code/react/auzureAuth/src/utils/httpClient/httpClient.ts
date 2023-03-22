import { HttpClientOptions, RequestConf, UpdateRequestConf } from './typings';

export default class HttpClient {
  readonly baseUri: string;
  readonly options: HttpClientOptions;

  constructor(baseUri: string, options?: HttpClientOptions) {
    this.baseUri = baseUri;
    this.options = options ?? {
      headers: {
        Accept: 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    };
  }

  private getRequestBody(body: unknown): { body: RequestInit['body'] } {
    if (body instanceof FormData) {
      return { body };
    } else if (typeof body === 'object' && body !== null) {
      return { body: JSON.stringify(body) };
    }

    return { body } as { body: RequestInit['body'] };
  }

  async request<T>(conf: RequestConf): Promise<T | undefined> {
    const { apiPath, data, method, query } = conf;

    const search = query
      ? `?${new URLSearchParams(query).toString()}`
      : '';
    const url = `${this.baseUri}/${apiPath}${search}`;

    const ignoreHeader = data instanceof FormData;

    const reqestInit = {
      ...this.options,
      method,
      ...(data !== undefined && this.getRequestBody(data)),
      ...(!ignoreHeader && {
        headers: new Headers({
          ...this.options.headers,
          ...conf.headers,
        }),
      }),
    };

    const response = await fetch(url, reqestInit);
    const text = await response.text();

    if (response.ok) {
      try {
        return JSON.parse(text) as T;
      } catch {
        return text as T;
      }
    }

    throw new Error(`HTTP error! status: ${response.status}, info: ${text}`);
  }

  delete<T>(conf: Omit<RequestConf, 'method'>): Promise<T | undefined> {
    return this.request({
      ...conf,
      method: 'DELETE',
    });
  }

  get<T>(conf: Omit<RequestConf, 'method' | 'data'>): Promise<T | undefined> {
    return this.request({
      ...conf,
      method: 'GET',
    });
  }

  patch<T>(conf: UpdateRequestConf): Promise<T | undefined> {
    return this.request({
      ...conf,
      method: 'PATCH',
    });
  }

  post<T>(conf: UpdateRequestConf): Promise<T | undefined> {
    return this.request({
      ...conf,
      method: 'POST',
    });
  }

  put<T>(conf: UpdateRequestConf): Promise<T | undefined> {
    return this.request({
      ...conf,
      method: 'PUT',
    });
  }
}
