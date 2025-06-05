// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Fade-in animation on scroll
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

fadeElements.forEach(element => {
  observer.observe(element);
});

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
