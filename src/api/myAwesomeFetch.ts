async function http<T>(path: string, config: any): Promise<T> {
  const request = new Request(path, config);
  const response = await fetch(request);

  const resBody = await response.json();

  if (!response.ok) {
    return Promise.reject(new Error(resBody.message ?? response.statusText));
  }

  // may error if there is no body, return empty array
  return resBody;
}

export async function get<T>(path: string, config?: any): Promise<T> {
  const init = { method: 'get', ...config };
  return http<T>(path, init);
}

export async function post<T, U>(path: string, body: T, config?: any): Promise<U> {
  const init = {
    method: 'post', body: JSON.stringify(body), headers: { 'content-type': 'application/json' }, ...config,
  };
  return http<U>(path, init);
}

export async function put<T, U>(path: string, body: T, config?: any): Promise<U> {
  const init = { method: 'put', body: JSON.stringify(body), ...config };
  return http<U>(path, init);
}
