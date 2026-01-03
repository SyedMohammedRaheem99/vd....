/**
 * ============================================
 * DESIGN VISION - MAIN JAVASCRIPT
 * Premium Interior Design Website
 * ============================================
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initMobileNav();
  initScrollAnimations();
  initCounters();
  initFAQ();
  initTestimonials();
  initGalleryFilter();
  initLightbox();
  initBackToTop();
  initStickyHeader();
  initSmoothScroll();
  initHeroAnimation();
  initWhatsApp();
  initScrollProgress();
});

/**
 * ============================================
 * MOBILE NAVIGATION
 * Toggle mobile menu with smooth animations
 * ============================================
 */
function initMobileNav() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const closeBtn = document.querySelector('.mobile-close-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const overlay = document.querySelector('.mobile-menu-overlay');
  const body = document.body;

  if (!menuBtn || !mobileNav) return;

  // Open menu
  menuBtn.addEventListener('click', function() {
    mobileNav.classList.add('active');
    overlay.classList.add('active');
    body.style.overflow = 'hidden';
  });

  // Close menu function
  const closeMenu = () => {
    mobileNav.classList.remove('active');
    overlay.classList.remove('active');
    body.style.overflow = '';
  };

  // Close button
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  // Click overlay to close
  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Close on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });

  // Close menu when clicking nav links
  const navLinks = mobileNav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/**
 * ============================================
 * SCROLL ANIMATIONS
 * Reveal elements on scroll using IntersectionObserver
 * ============================================
 */
function initScrollAnimations() {
  // Options for IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  // Observer callback function
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add visible class to trigger animation
        entry.target.classList.add('is-visible');
        
        // For reveal-scale elements, add delay for staggered effect
        if (entry.target.classList.contains('reveal-scale')) {
          entry.target.style.transitionDelay = '0.1s';
        }
        
        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  };

  // Create the observer
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Select all elements to animate
  const animateElements = document.querySelectorAll(
    '.reveal-on-scroll, .reveal-left, .reveal-scale, .animate-on-scroll'
  );

  // Observe each element
  animateElements.forEach((el, index) => {
    // Add staggered delay for grid items
    if (el.classList.contains('stagger-item')) {
      el.style.transitionDelay = `${index * 0.1}s`;
    }
    observer.observe(el);
  });

  // Parallax effect for hero section (optional)
  const heroSection = document.querySelector('.hero-parallax');
  if (heroSection) {
    window.addEventListener('scroll', debounce(() => {
      const scrolled = window.pageYOffset;
      heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }, 10));
  }
}

/**
 * ============================================
 * COUNTER ANIMATION
 * Animate numbers from 0 to target value
 * ============================================
 */
function initCounters() {
  const counters = document.querySelectorAll('.counter-number[data-target]');
  
  if (counters.length === 0) return;

  // Options for IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  // Observer callback
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // Animation duration in ms
        const prefix = counter.getAttribute('data-prefix') || '';
        const suffix = counter.getAttribute('data-suffix') || '';
        
        animateCounter(counter, target, duration, prefix, suffix);
        
        // Stop observing
        observer.unobserve(counter);
      }
    });
  };

  // Create observer
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe each counter
  counters.forEach(counter => observer.observe(counter));
}

/**
 * Animate individual counter
 */
function animateCounter(element, target, duration, prefix, suffix) {
  let start = 0;
  const increment = target / (duration / 16); // 60fps
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    
    const current = Math.floor(start + (target - start) * easeOutQuart);
    
    // Format number with commas
    const formatted = current.toLocaleString();
    element.textContent = `${prefix}${formatted}${suffix}`;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
    }
  }

  requestAnimationFrame(update);
}

/**
 * ============================================
 * FAQ ACCORDION
 * Toggle FAQ answers with smooth animations
 * ============================================
 */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');
    
    if (!question || !answer) return;
    
    question.addEventListener('click', function() {
      // Check if this item is already open
      const isOpen = answer.classList.contains('open');
      
      // Close all other answers
      faqItems.forEach(otherItem => {
        const otherAnswer = otherItem.querySelector('.faq-answer');
        const otherIcon = otherItem.querySelector('.faq-icon');
        
        if (otherAnswer && otherAnswer !== answer) {
          otherAnswer.classList.remove('open');
        }
        if (otherIcon) {
          otherIcon.classList.remove('active');
        }
      });
      
      // Toggle current answer
      if (isOpen) {
        answer.classList.remove('open');
        if (icon) icon.classList.remove('active');
      } else {
        answer.classList.add('open');
        if (icon) icon.classList.add('active');
      }
    });
  });
}

/**
 * ============================================
 * TESTIMONIAL SLIDER
 * Smooth sliding testimonial carousel
 * ============================================
 */
function initTestimonials() {
  const slider = document.querySelector('.testimonial-slider');
  const container = document.querySelector('.testimonial-container');
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  
  if (!slider || slides.length === 0) return;

  let currentIndex = 0;
  let autoPlay = true;
  const autoPlayInterval = 5000;
  let slideInterval;

  // Get slide width
  function getSlideWidth() {
    return slides[0].offsetWidth + 32; // Include gap
  }

  // Go to specific slide
  function goToSlide(index) {
    // Clamp index
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    
    currentIndex = index;
    
    // Move container
    if (container) {
      container.style.transform = `translateX(-${currentIndex * getSlideWidth()}px)`;
    }
    
    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  // Next slide
  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  // Previous slide
  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  // Start auto-play
  function startAutoPlay() {
    if (autoPlay) {
      slideInterval = setInterval(nextSlide, autoPlayInterval);
    }
  }

  // Stop auto-play
  function stopAutoPlay() {
    clearInterval(slideInterval);
  }

  // Event listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      stopAutoPlay();
      prevSlide();
      startAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      stopAutoPlay();
      nextSlide();
      startAutoPlay();
    });
  }

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      stopAutoPlay();
      goToSlide(index);
      startAutoPlay();
    });
  });

  // Pause on hover
  slider.addEventListener('mouseenter', stopAutoPlay);
  slider.addEventListener('mouseleave', startAutoPlay);

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoPlay();
  }, { passive: true });

  slider.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoPlay();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (slider.getBoundingClientRect().top < window.innerHeight &&
        slider.getBoundingClientRect().bottom > 0) {
      if (e.key === 'ArrowLeft') {
        stopAutoPlay();
        prevSlide();
        startAutoPlay();
      } else if (e.key === 'ArrowRight') {
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
      }
    }
  });

  // Handle window resize
  window.addEventListener('resize', debounce(() => {
    goToSlide(currentIndex);
  }, 200));

  // Start auto-play
  startAutoPlay();
}

/**
 * ============================================
 * GALLERY FILTER
 * Filter portfolio items by category
 * ============================================
 */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  if (filterBtns.length === 0 || galleryItems.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Filter items
      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          item.classList.remove('hidden');
          item.classList.add('animate-scale-in');
          
          // Remove animation class after completion
          setTimeout(() => {
            item.classList.remove('animate-scale-in');
          }, 500);
        } else {
          item.classList.add('hidden');
          item.classList.remove('animate-scale-in');
        }
      });
    });
  });
}

/**
 * ============================================
 * LIGHTBOX
 * Fullscreen image viewer for gallery
 * ============================================
 */
function initLightbox() {
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const galleryImages = document.querySelectorAll('.gallery-image, .portfolio-image');
  const body = document.body;

  if (!lightbox || !lightboxImg) return;

  // Open lightbox
  galleryImages.forEach(img => {
    img.addEventListener('click', function() {
      const src = this.getAttribute('src') || this.querySelector('img')?.getAttribute('src');
      const alt = this.querySelector('img')?.alt || this.alt || '';
      
      if (src) {
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        
        if (lightboxCaption) {
          lightboxCaption.textContent = alt;
        }
        
        lightbox.classList.add('active');
        body.style.overflow = 'hidden';
      }
    });
  });

  // Close lightbox function
  const closeLightbox = () => {
    lightbox.classList.remove('active');
    body.style.overflow = '';
  };

  // Close on button click
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  // Close on backdrop click
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  // Close on swipe down (touch devices)
  let touchStartY = 0;
  lightbox.addEventListener('touchstart', function(e) {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  lightbox.addEventListener('touchend', function(e) {
    const touchEndY = e.changedTouches[0].clientY;
    if (touchEndY - touchStartY > 100) {
      closeLightbox();
    }
  }, { passive: true });
}

/**
 * ============================================
 * BACK TO TOP BUTTON
 * Show/hide scroll to top button
 * ============================================
 */
function initBackToTop() {
  const backToTop = document.querySelector('.back-to-top');
  
  if (!backToTop) return;

  // Show button after scrolling 500px
  window.addEventListener('scroll', debounce(() => {
    if (window.pageYOffset > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, 100));

  // Scroll to top on click
  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * ============================================
 * STICKY HEADER
 * Add shadow and background on scroll
 * ============================================
 */
function initStickyHeader() {
  const header = document.querySelector('.header');
  
  if (!header) return;

  window.addEventListener('scroll', debounce(() => {
    if (window.pageYOffset > 50) {
      header.classList.add('shadow-lg');
      header.classList.add('bg-white/95');
      header.classList.add('backdrop-blur-lg');
    } else {
      header.classList.remove('shadow-lg');
      header.classList.remove('bg-white/95');
      header.classList.remove('backdrop-blur-lg');
    }
  }, 50));
}

/**
 * ============================================
 * SMOOTH SCROLL
 * Smooth scroll for anchor links
 * ============================================
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * ============================================
 * HERO ANIMATION
 * Typing effect for hero headline
 * ============================================
 */
function initHeroAnimation() {
  const heroText = document.querySelector('.hero-typing-text');
  const cursor = document.querySelector('.typing-cursor');
  
  if (!heroText) return;

  const words = JSON.parse(heroText.getAttribute('data-words') || '["Design Vision", "Premium Interiors", "Luxury Spaces"]');
  const typeSpeed = 100;
  const deleteSpeed = 50;
  const pauseDuration = 2000;
  
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeTimeout;

  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      // Delete characters
      heroText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeTimeout = setTimeout(type, deleteSpeed);
    } else {
      // Type characters
      heroText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeTimeout = setTimeout(type, typeSpeed);
    }

    // Word complete or deleted
    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at end of word
      isDeleting = true;
      typeTimeout = setTimeout(type, pauseDuration);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeTimeout = setTimeout(type, typeSpeed);
    }
  }

  // Start typing animation
  setTimeout(type, 1000);

  // Stagger hero elements
  const heroElements = document.querySelectorAll('.hero-animate');
  heroElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.animationDelay = `${index * 0.2}s`;
    
    setTimeout(() => {
      el.style.opacity = '1';
    }, index * 200 + 500);
  });
}

/**
 * ============================================
 * WHATSAPP CTA
 * WhatsApp floating button behavior
 * ============================================
 */
function initWhatsApp() {
  const whatsappFloat = document.querySelector('.whatsapp-float');
  const whatsappLinks = document.querySelectorAll('.whatsapp-link');
  
  if (!whatsappFloat) return;

  // Pulse animation on page load
  setTimeout(() => {
    whatsappFloat.classList.add('pulse-gold');
  }, 3000);

  // Click tracking (optional - for analytics)
  whatsappLinks.forEach(link => {
    link.addEventListener('click', function() {
      const phone = this.getAttribute('data-phone') || '+1234567890';
      const message = this.getAttribute('data-message') || 'Hello, I\'m interested in your services.';
      
      // Open WhatsApp
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    });
  });
}

/**
 * ============================================
 * SCROLL PROGRESS BAR
 * Show reading progress at top of page
 * ============================================
 */
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  
  if (!progressBar) return;

  window.addEventListener('scroll', debounce(() => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
  }, 10));
}

/**
 * ============================================
 * UTILITY FUNCTIONS
 * Helper functions used throughout
 * ============================================
 */

/**
 * Debounce function for performance
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for scroll events
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean}
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Format currency for pricing display
 * @param {number} amount - Amount to format
 * @returns {string}
 */
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Add active class to current navigation link
 */
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Initialize active nav link on load
setActiveNavLink();
