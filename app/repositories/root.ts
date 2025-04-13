// services/api.service.ts



const BASE_URL = 'https://hcmutssps.id.vn/';

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
  fingerprint?: string,
  token?: string;
}

export class ApiService {
  static async request<T>(endpoint: string, method: string, body?: any, options: RequestOptions = {}): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (options.token) {
      headers['Authorization'] = `Bearer ${options.token}`;
    }
    if (options.fingerprint) {
      headers['x-fingerprint'] = options.fingerprint
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'API request failed');
    }

    return response.json();
  }

  static get<T>(endpoint: string, options?: RequestOptions) {
    return this.request<T>(endpoint, 'GET', undefined, options);
  }

  static post<T>(endpoint: string, body: any, options?: RequestOptions) {
    return this.request<T>(endpoint, 'POST', body, options);
  }

  static patch<T>(endpoint: string, body: any, options?: RequestOptions) {
    return this.request<T>(endpoint, 'PATCH', body, options);
  }

  static put<T>(endpoint: string, body: any, options?: RequestOptions) {
    return this.request<T>(endpoint, 'PUT', body, options);
  }

  static delete<T>(endpoint: string, options?: RequestOptions) {
    return this.request<T>(endpoint, 'DELETE', undefined, options);
  }

  
}
