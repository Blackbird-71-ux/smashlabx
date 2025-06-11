/// <reference types="vite/client" />

import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const sendContactForm = async (data: ContactFormData): Promise<ApiResponse<null>> => {
  try {
    const response = await api.post<ApiResponse<null>>('/api/contact', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to submit form');
    }
    throw new Error('An unexpected error occurred');
  }
};

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface BookingData {
  date: string;
  time: string;
  service: string;
}

interface ClientData {
  name: string;
  email: string;
  company: string;
}

export const authApi = {
  login: (credentials: LoginCredentials) =>
    api.post<ApiResponse<{ token: string }>>('/auth/login', credentials),
  register: (userData: RegisterData) =>
    api.post<ApiResponse<{ token: string }>>('/auth/register', userData),
  logout: () => api.post<ApiResponse<null>>('/auth/logout'),
};

export const bookingApi = {
  getAvailableSlots: (date: string) =>
    api.get<ApiResponse<string[]>>(`/bookings/available-slots?date=${date}`),
  createBooking: (bookingData: BookingData) => 
    api.post<ApiResponse<{ bookingId: string }>>('/bookings', bookingData),
  getBookings: () => api.get<ApiResponse<Array<{ id: string; date: string; time: string; service: string }>>>('/bookings'),
  cancelBooking: (bookingId: string) =>
    api.delete<ApiResponse<null>>(`/bookings/${bookingId}`),
};

export const corporateApi = {
  getPackages: () => api.get<ApiResponse<Array<{ id: string; name: string; price: number }>>>('/corporate/packages'),
  getClients: () => api.get<ApiResponse<Array<{ id: string; name: string; email: string; company: string }>>>('/corporate/clients'),
  createClient: (clientData: ClientData) => 
    api.post<ApiResponse<{ clientId: string }>>('/corporate/clients', clientData),
};

export default api;