const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'An error occurred');
      }

      return data;
    } catch (error: any) {
      console.error('API Error:', error);
      return {
        success: false,
        error: error.message || 'Network error',
      };
    }
  }

  // Quote endpoints
  async createQuote(quoteData: {
    name: string;
    email: string;
    phone: string;
    service?: string;
    message?: string;
  }) {
    return this.request('/quotes', {
      method: 'POST',
      body: JSON.stringify(quoteData),
    });
  }

  // Service endpoints
  async getServices() {
    return this.request('/services', { method: 'GET' });
  }

  // Testimonial endpoints
  async getTestimonials() {
    return this.request('/testimonials', { method: 'GET' });
  }

  // FAQ endpoints
  async getFAQs() {
    return this.request('/faqs', { method: 'GET' });
  }
}

export const api = new ApiClient(API_BASE_URL);
