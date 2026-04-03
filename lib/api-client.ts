import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface ApiConfig {
  baseURL: string;
  headers: {
    'Content-Type': string;
  };
}

class ApiClient {
  private client: AxiosInstance;
  private token: string | null = null;

  constructor(config: ApiConfig) {
    this.client = axios.create(config);
    this.loadToken();
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers.Authorization = `Token ${this.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.clearToken();
          if (typeof window !== 'undefined') {
            window.location.href = '/auth/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private loadToken(): void {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('authToken');
    }
  }

  setToken(token: string): void {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }

  clearToken(): void {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userProfile');
    }
  }

  getToken(): string | null {
    return this.token;
  }

  // Auth endpoints
  async register(data: {
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
  }) {
    const response = await this.client.post('/auth/register/', data);
    return response.data;
  }

  async login(data: { email: string; password: string }) {
    const response = await this.client.post('/auth/login/', data);
    if (response.data.token) {
      this.setToken(response.data.token);
      if (typeof window !== 'undefined') {
        localStorage.setItem('userProfile', JSON.stringify(response.data.profile));
      }
    }
    return response.data;
  }

  async logout() {
    try {
      await this.client.post('/auth/logout/');
    } finally {
      this.clearToken();
    }
  }

  // User profile endpoints
  async getProfile() {
    const response = await this.client.get('/users/profile/me/');
    return response.data;
  }

  async updateProfile(data: any) {
    const response = await this.client.put('/users/profile/update_profile/', data);
    return response.data;
  }

  // Visa request endpoints
  async getVisaRequests() {
    const response = await this.client.get('/visa-requests/');
    return response.data;
  }

  async getVisaRequest(id: string) {
    const response = await this.client.get(`/visa-requests/${id}/`);
    return response.data;
  }

  async submitVisaRequest(data: any) {
    const response = await this.client.post('/visa-requests/', data);
    return response.data;
  }

  async updateVisaRequestStatus(id: string, status: string) {
    const response = await this.client.patch(`/visa-requests/${id}/update_status/`, {
      status,
    });
    return response.data;
  }

  async assignVisaAgent(id: string, agentId: number) {
    const response = await this.client.post(`/visa-requests/${id}/assign_agent/`, {
      agent_id: agentId,
    });
    return response.data;
  }

  // Appointment endpoints
  async getAppointments() {
    const response = await this.client.get('/appointments/');
    return response.data;
  }

  async getAppointment(id: string) {
    const response = await this.client.get(`/appointments/${id}/`);
    return response.data;
  }

  async getAvailableSlots(serviceType: string, date: string) {
    const response = await this.client.get('/appointments/available_slots/', {
      params: { service_type: serviceType, date },
    });
    return response.data;
  }

  async bookAppointment(data: any) {
    const response = await this.client.post('/appointments/', data);
    return response.data;
  }

  async updateAppointmentStatus(id: string, status: string) {
    const response = await this.client.patch(`/appointments/${id}/update_status/`, {
      status,
    });
    return response.data;
  }

  async assignAppointmentAgent(id: string, agentId: number) {
    const response = await this.client.post(`/appointments/${id}/assign_agent/`, {
      agent_id: agentId,
    });
    return response.data;
  }

  // Contact message endpoints
  async getContactMessages() {
    const response = await this.client.get('/contact-messages/');
    return response.data;
  }

  async getContactMessage(id: string) {
    const response = await this.client.get(`/contact-messages/${id}/`);
    return response.data;
  }

  async sendContactMessage(data: any) {
    const response = await this.client.post('/contact-messages/', data);
    return response.data;
  }

  async markContactMessageAsRead(id: string) {
    const response = await this.client.patch(`/contact-messages/${id}/mark_as_read/`);
    return response.data;
  }

  async replyContactMessage(id: string, replyMessage: string) {
    const response = await this.client.post(`/contact-messages/${id}/reply/`, {
      reply_message: replyMessage,
    });
    return response.data;
  }
}

export const apiClient = new ApiClient({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
