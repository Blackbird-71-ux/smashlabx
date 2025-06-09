document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const submitButton = document.getElementById('submit-button');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Disable submit button and show loading state
      submitButton.disabled = true;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      formStatus.innerHTML = '';
      formStatus.className = '';

      try {
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
          name: formData.get('name'),
          email: formData.get('email'),
          company: formData.get('company'),
          phone: formData.get('phone'),
          message: formData.get('message'),
          package: formData.get('package'),
          participants: formData.get('participants') ? parseInt(formData.get('participants')) : undefined
        };

        // Send to API
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Failed to submit form');
        }

        // Show success message
        formStatus.innerHTML = 'Thank you for your message. We will get back to you soon.';
        formStatus.className = 'success';
        contactForm.reset();

      } catch (error) {
        // Show error message
        formStatus.innerHTML = error.message || 'An error occurred. Please try again.';
        formStatus.className = 'error';
      } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.innerHTML = 'Send Message';
      }
    });
  }

  // Form validation
  const validateForm = () => {
    const name = contactForm.querySelector('[name="name"]');
    const email = contactForm.querySelector('[name="email"]');
    const company = contactForm.querySelector('[name="company"]');
    const phone = contactForm.querySelector('[name="phone"]');
    const message = contactForm.querySelector('[name="message"]');

    let isValid = true;

    // Name validation
    if (name.value.trim().length < 2) {
      showError(name, 'Name must be at least 2 characters');
      isValid = false;
    } else {
      clearError(name);
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      showError(email, 'Please enter a valid email address');
      isValid = false;
    } else {
      clearError(email);
    }

    // Company validation
    if (company.value.trim().length < 2) {
      showError(company, 'Company name must be at least 2 characters');
      isValid = false;
    } else {
      clearError(company);
    }

    // Phone validation
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(phone.value)) {
      showError(phone, 'Please enter a valid phone number');
      isValid = false;
    } else {
      clearError(phone);
    }

    // Message validation
    if (message.value.trim().length < 10) {
      showError(message, 'Message must be at least 10 characters');
      isValid = false;
    } else {
      clearError(message);
    }

    return isValid;
  };

  // Helper functions for validation
  const showError = (input, message) => {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    if (!formGroup.querySelector('.error-message')) {
      formGroup.appendChild(errorElement);
    }
    input.classList.add('error');
  };

  const clearError = (input) => {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
    input.classList.remove('error');
  };

  // Add validation on input
  const inputs = contactForm.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      clearError(input);
    });
  });

  // Add validation before submit
  contactForm.addEventListener('submit', (e) => {
    if (!validateForm()) {
      e.preventDefault();
    }
  });
}); 