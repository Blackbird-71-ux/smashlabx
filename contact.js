document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // Basic validation
        if (!validateForm(data)) {
            return;
        }

        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        try {
            // Simulate API call (replace with actual API endpoint)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            showFormStatus('Message sent successfully! We\'ll get back to you soon.', 'success');
            contactForm.reset();
        } catch (error) {
            // Show error message
            showFormStatus('Failed to send message. Please try again later.', 'error');
        } finally {
            // Reset button state
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });

    function validateForm(data) {
        // Reset previous error messages
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(el => el.remove());

        let isValid = true;

        // Validate name
        if (!data.name.trim()) {
            showFieldError('name', 'Name is required');
            isValid = false;
        }

        // Validate email
        if (!data.email.trim()) {
            showFieldError('email', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(data.email)) {
            showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        }

        // Validate phone
        if (!data.phone.trim()) {
            showFieldError('phone', 'Phone number is required');
            isValid = false;
        } else if (!isValidPhone(data.phone)) {
            showFieldError('phone', 'Please enter a valid phone number');
            isValid = false;
        }

        // Validate subject
        if (!data.subject.trim()) {
            showFieldError('subject', 'Subject is required');
            isValid = false;
        }

        // Validate message
        if (!data.message.trim()) {
            showFieldError('message', 'Message is required');
            isValid = false;
        }

        return isValid;
    }

    function showFieldError(fieldName, message) {
        const field = document.getElementById(fieldName);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'var(--primary)';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.5rem';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
        field.style.borderColor = 'var(--primary)';
    }

    function showFormStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        formStatus.style.display = 'block';

        // Hide status after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        return phoneRegex.test(phone);
    }

    // Add input event listeners to clear error states
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            input.style.borderColor = 'var(--glass-border)';
            const errorMessage = input.parentNode.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        });
    });

    // Form Focus Effects
    document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(element => {
        element.addEventListener('focus', () => {
            element.closest('.form-group').classList.add('focused');
        });

        element.addEventListener('blur', () => {
            if (!element.value) {
                element.closest('.form-group').classList.remove('focused');
            }
        });
    });

    // Fade-in Animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // Contact Card Hover Effects
    document.querySelectorAll('.contact-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Smooth Scroll for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize form fields with saved values
    const savedFormData = JSON.parse(localStorage.getItem('contactFormData') || '{}');
    Object.entries(savedFormData).forEach(([key, value]) => {
        const input = contactForm.querySelector(`[name="${key}"]`);
        if (input) {
            input.value = value;
            if (value) {
                input.closest('.form-group').classList.add('focused');
            }
        }
    });

    // Save form data on input
    contactForm.querySelectorAll('input, select, textarea').forEach(element => {
        element.addEventListener('input', () => {
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            localStorage.setItem('contactFormData', JSON.stringify(data));
        });
    });
}); 