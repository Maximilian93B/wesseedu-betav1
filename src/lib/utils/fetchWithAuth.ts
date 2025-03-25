/**
 * Utility function to make authenticated API requests
 * This handles the common pattern of fetching data with authentication
 * and returning a standardized response format
 */
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for including cookies
    });

    if (!response.ok) {
      // Special handling for 401 unauthorized errors
      if (response.status === 401) {
        return {
          data: null,
          error: "Unauthorized",
          status: response.status,
        };
      }

      // For other errors, try to parse the error message
      const errorData = await response.json().catch(() => ({}));
      return {
        data: null,
        error: errorData.error || `Request failed with status ${response.status}`,
        status: response.status,
      };
    }

    const data = await response.json();
    return {
      data,
      error: null,
      status: response.status,
    };
  } catch (error) {
    console.error('Error in fetchWithAuth:', error);
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      status: 500,
    };
  }
} 