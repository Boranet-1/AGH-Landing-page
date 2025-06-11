// DOM Elements
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const signInModal = document.getElementById('signInModal');
const signInForm = document.getElementById('signInForm');
const signUpForm = document.getElementById('signUpForm');
const contactForm = document.getElementById('contactForm');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const staffGrid = document.getElementById('staffGrid');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile nav when clicking on a link
navLinks.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  }
});

// Close mobile nav when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Header background on scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 100) {
    header.style.background = 'linear-gradient(135deg, rgba(30, 58, 138, 0.95) 0%, rgba(30, 64, 175, 0.95) 100%)';
    header.style.backdropFilter = 'blur(10px)';
  } else {
    header.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)';
    header.style.backdropFilter = 'none';
  }
});

// Modal Functions
function openSignInModal() {
  if (signInModal) {
    signInModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
}

function closeSignInModal() {
  if (signInModal) {
    signInModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

function showSignIn() {
  if (signInForm && signUpForm) {
    signInForm.style.display = 'block';
    signUpForm.style.display = 'none';
    document.getElementById('signInTab').classList.add('active');
    document.getElementById('signUpTab').classList.remove('active');
  }
}

function showSignUp() {
  if (signInForm && signUpForm) {
    signInForm.style.display = 'none';
    signUpForm.style.display = 'block';
    document.getElementById('signInTab').classList.remove('active');
    document.getElementById('signUpTab').classList.add('active');
  }
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === signInModal) {
    closeSignInModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && signInModal && signInModal.style.display === 'block') {
    closeSignInModal();
  }
});

// Sign In Form Submission
if (signInForm) {
  signInForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;
    
    // Basic validation
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
    
    // Simulate sign in process
    alert('Sign in successful! Welcome back to Amazing Grace High School.');
    closeSignInModal();
    this.reset();
  });
}

// Sign Up Form Submission
if (signUpForm) {
  signUpForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const role = formData.get('role');
    
    // Basic validation
    if (!name || !email || !password || !confirmPassword || !role) {
      alert('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
    
    // Simulate sign up process
    alert(`Account created successfully! Welcome to Amazing Grace High School, ${name}.`);
    closeSignInModal();
    this.reset();
  });
}

// Contact Form Submission
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields');
      return;
    }
    
    // Simulate form submission
    alert(`Thank you ${name}! Your message has been sent. We'll get back to you soon.`);
    this.reset();
  });
}

// Load More Staff Members
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', function() {
    // Additional staff members data
    const additionalStaff = [
      {
        name: 'Dr. Sarah Johnson',
        position: 'Chemistry Teacher',
        image: 'path/to/staff5.jpg' // PLACEHOLDER: Replace with actual staff image
      },
      {
        name: 'Mr. David Brown',
        position: 'Physical Education Coach',
        image: 'path/to/staff6.jpg' // PLACEHOLDER: Replace with actual staff image
      },
      {
        name: 'Mrs. Lisa Wilson',
        position: 'Art Teacher',
        image: 'path/to/staff7.jpg' // PLACEHOLDER: Replace with actual staff image
      },
      {
        name: 'Mr. James Miller',
        position: 'Music Director',
        image: 'path/to/staff8.jpg' // PLACEHOLDER: Replace with actual staff image
      }
    ];
    
    // Create HTML for additional staff
    additionalStaff.forEach(staff => {
      const staffCard = document.createElement('div');
      staffCard.className = 'staff-card';
      staffCard.innerHTML = `
        <div class="staff-image">
          <img src="${staff.image}" alt="${staff.name}">
        </div>
        <div class="staff-info">
          <h4>${staff.name}</h4>
          <p>${staff.position}</p>
        </div>
      `;
      staffGrid.appendChild(staffCard);
    });
    
    // Hide the load more button after loading
    this.style.display = 'none';
    
    // Add fade-in animation to new cards
    setTimeout(() => {
      const newCards = staffGrid.querySelectorAll('.staff-card:nth-last-child(-n+4)');
      newCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.transition = 'all 0.5s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 100);
      });
    }, 10);
  });
}

// Testimonial Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-item');
const totalTestimonials = testimonials.length;

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.classList.remove('active');
    if (i === index) {
      testimonial.classList.add('active');
    }
  });
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
  showTestimonial(currentTestimonial);
}

function prevTestimonial() {
  currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
  showTestimonial(currentTestimonial);
}

// Auto-slide testimonials
if (testimonials.length > 0) {
  setInterval(nextTestimonial, 5000); // Change testimonial every 5 seconds
}

// Navigation for testimonials
const nextBtn = document.getElementById('nextTestimonial');
const prevBtn = document.getElementById('prevTestimonial');

if (nextBtn) {
  nextBtn.addEventListener('click', nextTestimonial);
}

if (prevBtn) {
  prevBtn.addEventListener('click', prevTestimonial);
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});

// Newsletter Subscription
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    if (!email) {
      alert('Please enter your email address');
      return;
    }
    
    alert('Thank you for subscribing to our newsletter!');
    this.reset();
  });
}

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.style.display = 'block';
    } else {
      backToTopBtn.style.display = 'none';
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Search functionality
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
if (searchBtn && searchInput) {
  searchBtn.addEventListener('click', function() {
    const query = searchInput.value.trim();
    if (query) {
      alert(`Searching for: "${query}". This feature will be implemented with backend integration.`);
    }
  });
  
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      searchBtn.click();
    }
  });
}

// Dropdown menu functionality
const dropdownBtns = document.querySelectorAll('.dropdown-btn');
dropdownBtns.forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const dropdown = this.nextElementSibling;
    const isActive = dropdown.classList.contains('active');
    
    // Close all dropdowns
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
      menu.classList.remove('active');
    });
    
    // Toggle current dropdown
    if (!isActive) {
      dropdown.classList.add('active');
    }
  });
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
      menu.classList.remove('active');
    });
  }
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  // Show first testimonial
  if (testimonials.length > 0) {
    showTestimonial(0);
  }
  
  // Initialize any other components
  console.log('Amazing Grace High School website initialized successfully!');
});

// Social Media Share Functions
function shareOnFacebook() {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent('Check out Amazing Grace High School!');
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}

function shareOnTwitter() {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent('Check out Amazing Grace High School!');
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
}

function shareOnLinkedIn() {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
}