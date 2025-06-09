(function() {
  // script.js - Enhancements and interactive features for SmashLabs website

  // --- Intersection Observer for Animations --- //

  // Options for the Intersection Observers
  const observerOptions = {
    root: null, // Use the viewport as the root
    rootMargin: '0px', // No margin around the root
    threshold: 0.1 // Trigger when 10% of the element is visible
  };

  // Fade-in animation observer
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // If the element is visible, add the 'visible' class to trigger the fade-in animation
        entry.target.classList.add('visible');
      } else {
        // Optionally remove the 'visible' class when not intersecting if you want the fade-in to repeat on scroll
        // entry.target.classList.remove('visible');
      }
    });
  }, observerOptions);

  // Observe all elements with the 'fade-in' class
  document.querySelectorAll('.fade-in').forEach(element => {
    fadeObserver.observe(element);
  });

  // --- Smooth Scrolling --- //

  // Variable for tracking the last scroll position (used by navigation effects)
  let lastScroll = 0;

  // Smooth scroll for navigation links (anchors starting with #)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent default anchor click behavior
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        // Calculate the position to scroll to, accounting for the fixed navbar height
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: targetPosition - navbarHeight,
          behavior: 'smooth' // Use smooth scrolling animation
        });
        
        // Close mobile menu if open after clicking a link
        const navLinks = document.querySelector('.nav-links');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '☰'; // Reset mobile menu button icon
      }
    });
  });

  // Add smooth scrolling for the Home link
  document.querySelector('a[href="index.html"]').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default link behavior
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Use smooth scrolling animation
    });
  });

  // --- Mouse Follow Effect (for glass elements) --- //

  document.querySelectorAll('.glass-effect').forEach(element => {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate mouse position relative to the center of the element
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;
      
      // Apply a 3D transform effect based on mouse position
      element.style.transform = `
        perspective(1000px)
        rotateX(${deltaY * -5}deg) // Rotate based on vertical position
        rotateY(${deltaX * 5}deg) // Rotate based on horizontal position
        translateZ(10px)
      `;
    });
    
    element.addEventListener('mouseleave', () => {
      // Reset transform when mouse leaves the element
      element.style.transform = 'none';
    });
  });

  // --- Counter Animation (for impact stats) --- //

  // Function to animate a number from start to end over a duration
  const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = value.toLocaleString(); // Update text content with formatted number
      if (progress < 1) {
        window.requestAnimationFrame(step); // Continue animation if not finished
      }
    };
    window.requestAnimationFrame(step); // Start the animation
  };

  // Trigger counter animation immediately on page load
  document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      animateValue(counter, 0, target, 2000); // Animate from 0 to target in 2 seconds
    });
  });

  // --- Button Hover Effects --- //

  // Add a slight translateY effect on button hover
  document.querySelectorAll('.btn-main, .btn-secondary').forEach(button => {
    button.addEventListener('mouseover', () => {
      button.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseout', () => {
      button.style.transform = 'translateY(0)';
    });
  });

  // --- Form Validation and Enhancement --- //

  // Select all forms on the page
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    // Select all input, textarea, and select elements within the form
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      // Add focus effect to the parent element (e.g., form-group)
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
        validateInput(input); // Validate input on blur
      });
      
      // Real-time validation on input
      input.addEventListener('input', () => {
        validateInput(input); // Validate input as the user types
      });
    });
    
    // Form submission handling
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevent default form submission
      
      let isValid = true;
      // Validate all inputs in the form
      inputs.forEach(input => {
        if (!validateInput(input)) {
          isValid = false;
        }
      });
      
      // If form is not valid, stop the submission process
      if (!isValid) {
        return;
      }
      
      // Handle the submit button state
      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.classList.add('loading'); // Add loading class for styling
        submitButton.disabled = true; // Disable button to prevent multiple submissions
        
        try {
          // Simulate form submission (replace with actual submission logic later)
          await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate a network request delay
          
          // Show success message after successful simulation
          form.innerHTML = `
            <div class="success-message">
              <h3>Thank you for your interest!</h3>
              <p>We've received your request and will contact you shortly.</p>
            </div>
          `;
        } catch (error) {
          // Handle errors during submission
          submitButton.classList.remove('loading'); // Remove loading class
          submitButton.disabled = false; // Re-enable the button
          
          // Display a generic error message
          const errorDiv = document.createElement('div');
          errorDiv.className = 'error-message';
          errorDiv.textContent = 'An error occurred. Please try again later.';
          form.insertBefore(errorDiv, submitButton); // Insert error message before the button
        }
      }
    });
  });

  // Helper function for input validation
  function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Check for required fields
    if (input.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    } else if (input.type === 'email' && value) {
      // Basic email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    } else if (input.type === 'tel' && value) {
      // Basic phone number format validation (allows +, digits, spaces, and hyphens)
      const phoneRegex = /^\+?[\d\s-]{10,}$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
      }
    }
    
    // Update input state based on validity
    input.classList.toggle('error', !isValid);
    
    // Update or remove error message display
    let errorDiv = input.parentElement.querySelector('.error-message');
    if (!isValid) {
      if (!errorDiv) {
        // Create and append error message div if it doesn't exist
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        input.parentElement.appendChild(errorDiv);
      }
      errorDiv.textContent = errorMessage; // Set the error message text
    } else if (errorDiv) {
      // Remove error message div if the input is valid and an error message exists
      errorDiv.remove();
    }
    
    return isValid; // Return the validation result
  }

  // --- Mobile Navigation Toggle --- //

  // Select the navigation bar and mobile menu button elements
  const nav = document.querySelector('.nav');

  // Handle scroll behavior for the navigation bar
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Hide the navbar when scrolling down, show when scrolling up (after passing a threshold)
    if (currentScroll <= 0) {
      nav.classList.remove('scroll-up');
      return;
    }
    
    if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
      nav.classList.remove('scroll-up');
      nav.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
      nav.classList.remove('scroll-down');
      nav.classList.add('scroll-up');
    }
  });

  // WhatsApp booking message customization
  const whatsappLinks = document.querySelectorAll('a[href^="https://wa.me"]');
  whatsappLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const packageName = e.target.closest('.package')?.querySelector('h3')?.textContent;
      if (packageName) {
        const message = `Hi SmashLabs, I'd like to book a session for the ${packageName} package.`;
        link.href = `https://wa.me/919999999999?text=${encodeURIComponent(message)}`;
      }
    });
  });

  // --- Page Loading Overlay --- //

  // Hide the loading overlay when the page is fully loaded
  window.addEventListener('load', () => {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.classList.add('hidden');
    }
  });

  // --- Cookie Consent Banner --- //

  const cookieConsentBanner = document.getElementById('cookie-consent-banner');
  const acceptCookiesButton = document.getElementById('accept-cookies');
  const cookieName = 'smashlabs_cookie_consent';

  // Check if user has already accepted cookies
  function hasAcceptedCookies() {
    return localStorage.getItem(cookieName) === 'accepted';
  }

  // Show the cookie banner
  function showCookieBanner() {
    if (cookieConsentBanner && !hasAcceptedCookies()) {
      cookieConsentBanner.classList.add('show');
    }
  }

  // Hide the cookie banner and set consent
  function hideCookieBanner() {
    if (cookieConsentBanner) {
      cookieConsentBanner.classList.remove('show');
      localStorage.setItem(cookieName, 'accepted');
    }
  }

  // Add event listener to the accept button
  if (acceptCookiesButton) {
    acceptCookiesButton.addEventListener('click', hideCookieBanner);
  }

  // Show the banner when the DOM is fully loaded, if not already accepted
  document.addEventListener('DOMContentLoaded', showCookieBanner);

  // --- Back to Top Button --- //

  const backToTopButton = document.getElementById('back-to-top');

  // Show/hide the button based on scroll position
  window.addEventListener('scroll', () => {
    if (backToTopButton) {
      if (window.pageYOffset > 300) { // Show button after scrolling down 300px
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    }
  });

  // Smooth scroll to top when button is clicked
  if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // DOM Elements
  const loadingOverlay = document.getElementById('loading-overlay');
  const bookingForm = document.getElementById('booking-form');
  const dateInput = document.getElementById('booking-date');
  const timeSlotSelect = document.getElementById('time-slot');
  const packageSelect = document.getElementById('package-type');
  const participantsInput = document.getElementById('participants');

  // Initialize Stripe
  const stripe = Stripe('your_publishable_key');
  const elements = stripe.elements();
  const card = elements.create('card');
  card.mount('#card-element');

  // Show loading overlay
  function showLoading() {
    loadingOverlay.style.display = 'flex';
  }

  // Hide loading overlay
  function hideLoading() {
    loadingOverlay.style.display = 'none';
  }

  // Initialize the page
  async function init() {
    showLoading();
    try {
      // Check authentication
      const token = localStorage.getItem('token');
      if (token) {
        // Load user profile
        const profile = await API.corporate.getProfile(getClientId());
        updateUIWithProfile(profile);
      }

      // Initialize date picker
      initializeDatePicker();
      
      // Load available time slots for today
      await loadAvailableSlots(new Date().toISOString().split('T')[0]);
    } catch (error) {
      console.error('Initialization error:', error);
      showError('Failed to initialize the application');
    } finally {
      hideLoading();
    }
  }

  // Initialize date picker
  function initializeDatePicker() {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3); // Allow booking up to 3 months in advance

    dateInput.min = today.toISOString().split('T')[0];
    dateInput.max = maxDate.toISOString().split('T')[0];
    
    dateInput.addEventListener('change', async (e) => {
      await loadAvailableSlots(e.target.value);
    });
  }

  // Load available time slots
  async function loadAvailableSlots(date) {
    showLoading();
    try {
      const slots = await API.bookings.getAvailableSlots(date);
      updateTimeSlots(slots);
    } catch (error) {
      console.error('Error loading time slots:', error);
      showError('Failed to load available time slots');
    } finally {
      hideLoading();
    }
  }

  // Update time slots in the select element
  function updateTimeSlots(slots) {
    timeSlotSelect.innerHTML = '<option value="">Select a time slot</option>';
    slots.forEach(slot => {
      const option = document.createElement('option');
      option.value = slot.time_slot;
      option.textContent = formatTime(slot.time_slot);
      timeSlotSelect.appendChild(option);
    });
  }

  // Format time for display
  function formatTime(time) {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  // Handle booking form submission
  async function handleBookingSubmit(e) {
    e.preventDefault();
    showLoading();

    try {
      const bookingData = {
        date: dateInput.value,
        timeSlot: timeSlotSelect.value,
        packageType: packageSelect.value,
        participants: parseInt(participantsInput.value),
        clientId: getClientId()
      };

      // Create booking
      const booking = await API.bookings.createBooking(bookingData);

      // Create payment intent
      const { clientSecret } = await API.payments.createPaymentIntent({
        amount: calculateTotal(bookingData),
        bookingId: booking.bookingId,
        clientId: getClientId()
      });

      // Confirm payment
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: 'Corporate Client'
          }
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      showSuccess('Booking confirmed! Check your email for details.');
      resetForm();
    } catch (error) {
      console.error('Booking error:', error);
      showError('Failed to process booking');
    } finally {
      hideLoading();
    }
  }

  // Calculate total price
  function calculateTotal(bookingData) {
    const basePrices = {
      'team-express': 299,
      'corporate-catalyst': 599,
      'executive-edge': 999
    };
    
    return basePrices[bookingData.packageType] * bookingData.participants;
  }

  // Update UI with user profile
  function updateUIWithProfile(profile) {
    // Update UI elements with profile data
    document.querySelector('.user-name').textContent = profile.company_name;
    // Add more UI updates as needed
  }

  // Show error message
  function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    setTimeout(() => errorDiv.remove(), 5000);
  }

  // Show success message
  function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    document.body.appendChild(successDiv);
    setTimeout(() => successDiv.remove(), 5000);
  }

  // Reset form
  function resetForm() {
    bookingForm.reset();
    timeSlotSelect.innerHTML = '<option value="">Select a time slot</option>';
  }

  // Get client ID from token
  function getClientId() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id;
    } catch (error) {
      console.error('Error parsing token:', error);
      return null;
    }
  }

  // Event Listeners
  document.addEventListener('DOMContentLoaded', init);
  bookingForm.addEventListener('submit', handleBookingSubmit);
})();