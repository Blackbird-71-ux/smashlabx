// Intersection Observer options
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

// Fade-in animation observer
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(element => {
  fadeObserver.observe(element);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: targetPosition - navbarHeight,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      const navLinks = document.querySelector('.nav-links');
      const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
      navLinks.classList.remove('active');
      mobileMenuBtn.innerHTML = '☰';
    }
  });
});

// Mouse follow effect for glass elements
document.querySelectorAll('.glass-effect').forEach(element => {
  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;
    
    element.style.transform = `
      perspective(1000px)
      rotateX(${deltaY * -5}deg)
      rotateY(${deltaX * 5}deg)
      translateZ(10px)
    `;
  });
  
  element.addEventListener('mouseleave', () => {
    element.style.transform = 'none';
  });
});

// Animate numbers in impact stats
const animateValue = (element, start, end, duration) => {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    element.textContent = value.toLocaleString();
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};

// Observe impact stats and animate when visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumber = entry.target.querySelector('.stat-number');
      if (statNumber) {
        const endValue = parseInt(statNumber.getAttribute('data-value'));
        animateValue(statNumber, 0, endValue, 2000);
      }
      statsObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.impact-stat').forEach(stat => {
  statsObserver.observe(stat);
});

// Add hover effect to buttons
document.querySelectorAll('.btn-main, .btn-secondary').forEach(button => {
  button.addEventListener('mouseover', () => {
    button.style.transform = 'translateY(-2px)';
  });
  
  button.addEventListener('mouseout', () => {
    button.style.transform = 'translateY(0)';
  });
});

// Form validation and enhancement
const forms = document.querySelectorAll('form');
forms.forEach(form => {
  const inputs = form.querySelectorAll('input, textarea, select');
  
  inputs.forEach(input => {
    // Add focus effect
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focused');
      validateInput(input);
    });
    
    // Real-time validation
    input.addEventListener('input', () => {
      validateInput(input);
    });
  });
  
  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    let isValid = true;
    inputs.forEach(input => {
      if (!validateInput(input)) {
        isValid = false;
      }
    });
    
    if (!isValid) {
      return;
    }
    
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.classList.add('loading');
      submitButton.disabled = true;
      
      try {
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        form.innerHTML = `
          <div class="success-message">
            <h3>Thank you for your interest!</h3>
            <p>We've received your request and will contact you shortly.</p>
          </div>
        `;
      } catch (error) {
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = 'An error occurred. Please try again later.';
        form.insertBefore(errorDiv, submitButton);
      }
    }
  });
});

// Input validation helper
function validateInput(input) {
  const value = input.value.trim();
  let isValid = true;
  let errorMessage = '';
  
  if (input.hasAttribute('required') && !value) {
    isValid = false;
    errorMessage = 'This field is required';
  } else if (input.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    }
  } else if (input.type === 'tel' && value) {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid phone number';
    }
  }
  
  // Update input state
  input.classList.toggle('error', !isValid);
  
  // Update error message
  let errorDiv = input.parentElement.querySelector('.error-message');
  if (!isValid) {
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      input.parentElement.appendChild(errorDiv);
    }
    errorDiv.textContent = errorMessage;
  } else if (errorDiv) {
    errorDiv.remove();
  }
  
  return isValid;
}

// Mobile navigation
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
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
  lastScroll = currentScroll;
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

// Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.round(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.round(start);
        }
    }, 16);
}

// Counter animation observer
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe the impact stats section
document.addEventListener('DOMContentLoaded', () => {
    const impactStats = document.querySelector('.impact-stats');
    if (impactStats) {
        counterObserver.observe(impactStats);
    }
});

// Scroll Progress Indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  progressBar.style.transform = `scaleX(${scrolled / 100})`;
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  if (currentScroll > lastScroll && currentScroll > 100) {
    navbar.style.transform = 'translateY(-100%)';
  } else {
    navbar.style.transform = 'translateY(0)';
  }
  
  lastScroll = currentScroll;
});

// Mobile menu
const mobileMenuBtn = document.createElement('button');
mobileMenuBtn.className = 'mobile-menu-btn';
mobileMenuBtn.innerHTML = '☰';
document.querySelector('.navbar .container').appendChild(mobileMenuBtn);

const navLinks = document.querySelector('.nav-links');
mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-links') && !e.target.closest('.mobile-menu-btn')) {
    navLinks.classList.remove('active');
    mobileMenuBtn.innerHTML = '☰';
  }
});

// Enhanced card hover effects
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;
    
    card.style.transform = `
      perspective(1000px)
      rotateX(${deltaY * -5}deg)
      rotateY(${deltaX * 5}deg)
      translateZ(10px)
    `;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'none';
  });
});
