// API Configuration
const API_BASE_URL = '/api';

// Authentication API calls
const authAPI = {
  async register(companyData) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(companyData),
    });
    return response.json();
  },

  async login(credentials) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },
};

// Bookings API calls
const bookingsAPI = {
  async getAvailableSlots(date) {
    const response = await fetch(`${API_BASE_URL}/bookings/slots?date=${date}`);
    return response.json();
  },

  async createBooking(bookingData) {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(bookingData),
    });
    return response.json();
  },

  async getClientBookings(clientId) {
    const response = await fetch(`${API_BASE_URL}/bookings/client/${clientId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.json();
  },
};

// Corporate API calls
const corporateAPI = {
  async getProfile(clientId) {
    const response = await fetch(`${API_BASE_URL}/corporate/profile/${clientId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.json();
  },

  async updateProfile(clientId, profileData) {
    const response = await fetch(`${API_BASE_URL}/corporate/profile/${clientId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(profileData),
    });
    return response.json();
  },

  async getStats(clientId) {
    const response = await fetch(`${API_BASE_URL}/corporate/stats/${clientId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.json();
  },
};

// Payments API calls
const paymentsAPI = {
  async createPaymentIntent(paymentData) {
    const response = await fetch(`${API_BASE_URL}/payments/create-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(paymentData),
    });
    return response.json();
  },
};

// Export all API modules
window.API = {
  auth: authAPI,
  bookings: bookingsAPI,
  corporate: corporateAPI,
  payments: paymentsAPI,
}; 