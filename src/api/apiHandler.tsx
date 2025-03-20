// src/utils/api.ts

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: any;
  }
  
  // Function to get token from localStorage
  const getAuthToken = (): string | null => {
    return localStorage.getItem('token'); // Adjust key if needed
  };
  
  export const apiHandler = async <T = any>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: any,
    isMultipart: boolean = false
  ): Promise<ApiResponse<T>> => {
    try {
      const token = getAuthToken();
  
      const headers: HeadersInit = {
        ...(isMultipart ? {} : { 'Content-Type': 'application/json' }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}), // Auto-add token if exists
      };
  
      const response = await fetch(endpoint, {
        method,
        headers,
        body: isMultipart ? body : JSON.stringify(body),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }
  
      return { success: true, data: result.data };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  };
  