const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    // Load token from localStorage
    this.token = localStorage.getItem('admin_token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('admin_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('admin_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      // Add Authorization header if token exists
      if (this.token) {
        headers['Authorization'] = `Bearer ${this.token}`;
      }

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers,
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

  // Lead endpoints
  async createLead(leadData: {
    name: string;
    email: string;
    phone: string;
    service?: string;
    message?: string;
    insuranceType?: string;
    subType?: string;
    vehicleType?: string;
    coverageType?: string;
    planDuration?: string;
    numberOfMembers?: number;
    emiRequested?: boolean;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
    referrer?: string;
  }) {
    return this.request('/leads', {
      method: 'POST',
      body: JSON.stringify(leadData),
    });
  }

  async getLeads(filters?: {
    campaign?: string;
    source?: string;
    service?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, String(value));
      });
    }
    return this.request(`/leads?${params.toString()}`, { method: 'GET' });
  }

  // Admin endpoints
  async adminLogin(email: string, password: string) {
    const response = await this.request<{ token: string; admin: any }>('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.success && response.data?.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async getAdminMe() {
    return this.request('/admin/me', { method: 'GET' });
  }

  logout() {
    this.clearToken();
  }

  // Analytics endpoints
  async getAnalytics(filters?: {
    startDate?: string;
    endDate?: string;
    campaign?: string;
    source?: string;
  }) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, String(value));
      });
    }
    return this.request(`/analytics?${params.toString()}`, { method: 'GET' });
  }

  async exportLeadsCSV(filters?: {
    startDate?: string;
    endDate?: string;
    campaign?: string;
    source?: string;
    service?: string;
    status?: string;
  }) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, String(value));
      });
    }

    const headers: HeadersInit = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(
      `${this.baseURL}/analytics/export?${params.toString()}`,
      { headers }
    );

    if (!response.ok) {
      throw new Error('Failed to export CSV');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-export-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  // Quote endpoints (legacy - keeping for backward compatibility)
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
