import { ContactFormData } from '../services/api';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateForm = (data: ContactFormData): { isValid: boolean; errors: Partial<ContactFormData> } => {
  const errors: Partial<ContactFormData> = {};

  if (!data.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Invalid email format';
  }

  if (!data.company.trim()) {
    errors.company = 'Company name is required';
  }

  if (!data.message.trim()) {
    errors.message = 'Message is required';
  } else if (data.message.length < 10) {
    errors.message = 'Message must be at least 10 characters long';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const formatFormData = (data: ContactFormData): ContactFormData => {
  return {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    company: data.company.trim(),
    message: data.message.trim(),
  };
}; 