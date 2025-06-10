import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const contactApi = {
  submit: (data: { name: string; email: string; message: string }) =>
    api.post('/contact', data),
};

export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  register: (userData: { name: string; email: string; password: string }) =>
    api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
};

export const bookingApi = {
  getAvailableSlots: (date: string) =>
    api.get(`/bookings/available-slots?date=${date}`),
  createBooking: (bookingData: {
    date: string;
    time: string;
    service: string;
  }) => api.post('/bookings', bookingData),
  getBookings: () => api.get('/bookings'),
  cancelBooking: (bookingId: string) =>
    api.delete(`/bookings/${bookingId}`),
};

export const corporateApi = {
  getPackages: () => api.get('/corporate/packages'),
  getClients: () => api.get('/corporate/clients'),
  createClient: (clientData: {
    name: string;
    email: string;
    company: string;
  }) => api.post('/corporate/clients', clientData),
};

export default api; 