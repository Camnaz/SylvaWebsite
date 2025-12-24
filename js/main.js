// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js');

  // Initialize motion system
  initMotionSystem();
  
  // Initialize floating orbs
  initFloatingOrbs();
  
  // Initialize form handling if form exists
  const waitlistForm = document.getElementById('waitlist-form');
  if (waitlistForm) {
    initWaitlistForm(waitlistForm);
  }
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize scroll effects (dark mode, highlights)
  initScrollEffects();
  
  // Initialize section highlighting
  initSectionHighlighting();
  
  // Handle documentation links
  handleDocumentationLinks();
  
  // Trigger elegant page load animation
  initPageLoad();
});

/**
 * Initialize elegant page load animation
 */
function initPageLoad() {
  // Wait for all critical resources to load
  if (document.readyState === 'complete') {
    triggerLoadAnimation();
  } else {
    window.addEventListener('load', triggerLoadAnimation);
  }
}

function triggerLoadAnimation() {
  // Small delay to ensure everything is painted
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.classList.add('loaded');
    });
  });
}

/**
 * Initialize motion system and event listeners
 */
function initMotionSystem() {
  // Add reduced motion class if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('reduced-motion');
  }
  
  // Initialize mobile menu toggle
  initMobileMenu();
  
  // Initialize smooth scrolling for anchor links
  initSmoothScrolling();
  
  // Initialize hero fade effect
  initHeroFade();
}

/**
 * Smooth hero fade out as user scrolls - extended duration for natural feel
 */
function initHeroFade() {
  const hero = document.querySelector('.hero');
  const header = document.querySelector('.header');
  if (!hero || !header) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth <= 768;
  
  // Disable hero fade on mobile to prevent stuttering
  if (prefersReducedMotion || isMobile) return;

  let ticking = false;

  function updateHeroFade() {
    const scrollY = window.scrollY;
    const headerHeight = header.offsetHeight;
    
    const fadeStart = 50;
    const fadeEnd = headerHeight * 0.8;
    const fadeProgress = Math.max(0, Math.min(1, (scrollY - fadeStart) / (fadeEnd - fadeStart)));
    
    // Extra smooth easing - quintic ease out
    const easedFade = 1 - Math.pow(1 - fadeProgress, 3);
    
    // Apply gradual fade and subtle upward movement
    const translateAmount = 40;
    const scaleAmount = 0.02;
    hero.style.opacity = 1 - easedFade;
    hero.style.transform = `translateY(${-easedFade * translateAmount}px) scale(${1 - easedFade * scaleAmount})`;
    
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateHeroFade);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick, { passive: true });
}

/**
 * Initialize mobile menu functionality with Apple-like interactions
 */
function initMobileMenu() {
  // Elements
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const navOverlay = document.querySelector('[data-nav-overlay]');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-link, .nav-cta');
  const html = document.documentElement;
  
  // Check if required elements exist
  if (!menuToggle || !navOverlay || !navLinks) return;
  
  // State
  let isMenuOpen = false;
  let scrollbarWidth = 0;
  
  // Calculate scrollbar width
  function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }
  
  // Toggle menu state
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    
    // Toggle ARIA attributes
    menuToggle.setAttribute('aria-expanded', isMenuOpen);
    menuToggle.classList.toggle('active', isMenuOpen);
    navOverlay.classList.toggle('active', isMenuOpen);
    navLinks.classList.toggle('active', isMenuOpen);
    
    // Handle body scroll and padding
    if (isMenuOpen) {
      // Store scroll position and calculate scrollbar width
      scrollbarWidth = getScrollbarWidth();
      document.body.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
      
      // Lock body scroll
      html.classList.add('menu-open');
      
      // Set focus to first menu item when opening
      setTimeout(() => {
        const firstNavItem = navItems[0];
        if (firstNavItem) firstNavItem.focus();
      }, 50);
    } else {
      // Restore body scroll
      html.classList.remove('menu-open');
      
      // Return focus to menu toggle
      setTimeout(() => {
        menuToggle.focus();
      }, 50);
    }
  }
  
  // Close menu function
  function closeMenu() {
    if (isMenuOpen) {
      toggleMenu();
    }
  }
  
  // Event Listeners
  menuToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleMenu();
  });
  
  // Close menu when clicking overlay
  navOverlay.addEventListener('click', (e) => {
    if (e.target === navOverlay) {
      closeMenu();
    }
  });
  
  // Close menu when clicking nav items
  navItems.forEach(item => {
    item.addEventListener('click', closeMenu);
  });
  
  // Handle keyboard navigation
  navLinks.addEventListener('keydown', (e) => {
    if (!isMenuOpen) return;
    
    const isTabPressed = e.key === 'Tab';
    const isEscapePressed = e.key === 'Escape';
    
    if (isEscapePressed) {
      e.preventDefault();
      closeMenu();
      return;
    }
    
    if (!isTabPressed) return;
    
    const focusableElements = Array.from(navLinks.querySelectorAll('a[href], button:not([disabled])'));
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (isMenuOpen && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      closeMenu();
    }
  });
  
  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    // Clear the timeout if it's already set
    clearTimeout(resizeTimer);
    
    // Set a new timeout
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 768 && isMenuOpen) {
        closeMenu();
      }
      
      // Update scrollbar width if menu is open
      if (isMenuOpen) {
        const newScrollbarWidth = getScrollbarWidth();
        if (newScrollbarWidth !== scrollbarWidth) {
          document.body.style.setProperty('--scrollbar-width', `${newScrollbarWidth}px`);
          scrollbarWidth = newScrollbarWidth;
        }
      }
    }, 100);
  });
  
  // Handle page load with hash
  window.addEventListener('load', () => {
    if (window.location.hash) {
      closeMenu();
    }
  });
}

/**
 * Initialize smooth scrolling for anchor links with enhanced button feedback
 */
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Add a class to identify the Get Updates button
    if (anchor.textContent.trim().toLowerCase().includes('get updates')) {
      anchor.classList.add('nav-updates-btn');
      
      // Add click animation
      anchor.addEventListener('click', function(e) {
        this.classList.add('clicked');
        setTimeout(() => this.classList.remove('clicked'), 300);
      });
    }
    
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Add active class for visual feedback
        this.classList.add('active');
        setTimeout(() => this.classList.remove('active'), 1000);
        
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        // Smooth scroll with callback for additional effects
        if (prefersReducedMotion) {
          window.scrollTo({
            top: offsetPosition,
            behavior: 'auto'
          });
        } else {
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Add a subtle pulse effect to the target section
          targetElement.style.transition = 'box-shadow 0.5s ease';
          targetElement.style.boxShadow = '0 0 0 2px var(--color-primary-light)';
          
          setTimeout(() => {
            targetElement.style.boxShadow = 'none';
            setTimeout(() => {
              targetElement.style.transition = '';
            }, 500);
          }, 1000);
        }
      }
    });
  });
}

/**
 * Initialize waitlist form handling with Formspree integration
 */
function initWaitlistForm(form) {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    
    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    try {
      // Send to Formspree
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        // Show success state
        submitButton.innerHTML = '<i class="fas fa-check"></i> Thank You!';
        submitButton.classList.add('success');
        
        // Reset form
        this.reset();
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = 'Thank you for joining the waitlist! We\'ll be in touch soon.';
        this.appendChild(successMessage);
        
        // Remove success message after delay
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
        
        // Reset button after delay
        setTimeout(() => {
          submitButton.disabled = false;
          submitButton.innerHTML = originalButtonText;
          submitButton.classList.remove('success');
        }, 3000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Show error state
      submitButton.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error';
      submitButton.classList.add('error');
      
      // Show error message
      const errorMessage = document.createElement('div');
      errorMessage.className = 'form-error';
      errorMessage.innerHTML = 'Oops! Something went wrong. Please try again or email us directly.';
      this.appendChild(errorMessage);
      
      // Remove error message and reset button after delay
      setTimeout(() => {
        errorMessage.remove();
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
        submitButton.classList.remove('error');
      }, 5000);
    }
  });
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all elements with data-animate attribute and specific component classes
  const animatedElements = [
    ...document.querySelectorAll('[data-animate]'),
    ...document.querySelectorAll('.feature-card, .difference-item, .economy-feature, .pillar')
  ];
  
  animatedElements.forEach(element => {
    element.classList.add('reveal');
    if (prefersReducedMotion) {
      element.classList.add('animate-in');
    } else {
      observer.observe(element);
    }
  });
  
  // Navbar scroll effect with smooth mobile transitions
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    let scrollTimeout;
    let lastScrollY = 0;
    const isMobile = () => window.innerWidth <= 768;
    
    function updateNavbar() {
      const currentScroll = window.pageYOffset;
      const scrollThreshold = isMobile() ? 20 : 8;
      
      // Add smooth transition on mobile
      if (isMobile() && Math.abs(currentScroll - lastScrollY) > 5) {
        navbar.style.transition = 'padding 0.6s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.5s ease, border-color 0.5s ease';
      }
      
      navbar.classList.toggle('scrolled', currentScroll > scrollThreshold);
      lastScrollY = currentScroll;
    }
    
    window.addEventListener('scroll', () => {
      if (scrollTimeout) {
        cancelAnimationFrame(scrollTimeout);
      }
      scrollTimeout = requestAnimationFrame(updateNavbar);
    }, { passive: true });
  }
}

/**
 * Handle documentation links for both development and production environments
 */
function handleDocumentationLinks() {
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  const docsLinks = document.querySelectorAll('a[href*="docs"]');
  docsLinks.forEach(link => {
    if (isLocalhost) {
      // In development, directly set href to VitePress server
      link.href = 'http://localhost:5173';
    } else {
      // In production, point to docs subdomain
      link.href = 'https://docs.sylva.oleacomputer.com';
    }
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
}

/**
 * Initialize section highlighting in navigation
 */
function initSectionHighlighting() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (sections.length === 0 || navLinks.length === 0) return;
  
  function highlightNavigation() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (window.scrollY >= sectionTop - 200) {
        current = sectionId;
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  
  // Initial highlight check
  highlightNavigation();
  
  // Add scroll event listener
  window.addEventListener('scroll', highlightNavigation);
}

/**
 * Initialize floating orbs background effect (constrained to What is Sylva section)
 */
function initFloatingOrbs() {
  const orbContainer = document.getElementById('floating-orbs');
  if (!orbContainer) return;

  // Create orbs
  for (let i = 0; i < 8; i++) {
    const orb = document.createElement('div');
    orb.className = 'floating-orb';
    orbContainer.appendChild(orb);
  }

  // Add parallax scroll effect for orbs
  initOrbParallax();
}

/**
 * Initialize orb scroll effect - orbs scroll within What is Sylva section
 * Clipped at section boundaries - appear from bottom, exit through top
 */
function initOrbParallax() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth <= 768;
  
  // Disable orb parallax on mobile to improve performance
  if (prefersReducedMotion || isMobile) return;

  const whatIsSection = document.getElementById('what-is');
  const orbs = document.querySelectorAll('.floating-orb');
  if (!whatIsSection || orbs.length === 0) return;

  let ticking = false;

  function updateOrbPositions() {
    const rect = whatIsSection.getBoundingClientRect();
    const sectionHeight = whatIsSection.offsetHeight;
    const windowHeight = window.innerHeight;
    const isMobile = window.innerWidth <= 768;
    
    // Calculate how much of section has scrolled past
    const scrollIntoSection = -rect.top;
    const scrollProgress = scrollIntoSection / sectionHeight;

    orbs.forEach((orb, index) => {
      // Mobile-friendly orb movement - less aggressive
      const startY = sectionHeight * 0.7 + (index * (isMobile ? 60 : 80));
      const speed = isMobile ? 0.6 + (index * 0.1) : 0.8 + (index * 0.15);
      
      // Move upward as user scrolls down - will clip at top
      const orbY = startY - (scrollIntoSection * speed);
      
      // Horizontal position - less wobble on mobile
      const baseX = ((index % 4) - 1.5) * (isMobile ? 150 : 200) + (index * (isMobile ? 20 : 30));
      const wobble = Math.sin(scrollProgress * Math.PI * 2 + index) * (isMobile ? 12 : 20);
      const orbX = baseX + wobble;
      
      // Full opacity while in section
      let opacity = isMobile ? 0.75 : 0.85;
      
      // Fade in as orbs enter from bottom
      if (orbY > sectionHeight * 0.8) {
        opacity = Math.max(0, 1 - (orbY - sectionHeight * 0.8) / (sectionHeight * 0.3));
        opacity *= isMobile ? 0.75 : 0.85;
      }
      // Fade out slightly as they approach top (before clipping)
      if (orbY < sectionHeight * 0.1) {
        opacity = Math.max(0, orbY / (sectionHeight * 0.1));
        opacity *= isMobile ? 0.75 : 0.85;
      }

      orb.style.transform = `translate(${orbX}px, ${orbY}px)`;
      orb.style.opacity = opacity;
    });

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateOrbPositions);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick, { passive: true });
  updateOrbPositions();
}

/**
 * Initialize scroll-based effects for other sections
 */
function initScrollEffects() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  initDarkModeTransitions();
  initHighlightEffects();
  initLifecyclePanel();
}

/**
 * Agent Lifecycle rotating panel system
 */
function initLifecyclePanel() {
  const display = document.getElementById('lifecycle-display');
  const icon = document.getElementById('lifecycle-icon');
  const title = document.getElementById('lifecycle-title');
  const description = document.getElementById('lifecycle-description');
  const indicators = document.querySelectorAll('.lifecycle-indicator');
  
  if (!display || !icon || !title || !description || indicators.length === 0) return;

  const phases = [
    {
      name: 'seed',
      icon: 'fas fa-seedling',
      title: 'Seed',
      description: '30 days, observation only, owner approval required'
    },
    {
      name: 'operational',
      icon: 'fas fa-play-circle',
      title: 'Operational',
      description: '90+ days, accuracy ≥75%, full primitive access'
    },
    {
      name: 'vetted',
      icon: 'fas fa-check-circle',
      title: 'Vetted',
      description: '180+ days, accuracy ≥85%, voting and mentorship'
    },
    {
      name: 'prestige',
      icon: 'fas fa-crown',
      title: 'Prestige',
      description: '365+ days, cross-domain influence, 4x rewards'
    }
  ];

  let currentPhase = 0;
  let autoRotateInterval;

  function updateDisplay(phaseIndex, animate = true) {
    const phase = phases[phaseIndex];
    
    // Add fade out class if animating
    if (animate) {
      display.style.opacity = '0.5';
      display.style.transform = 'scale(0.98)';
    }
    
    setTimeout(() => {
      // Update content
      display.setAttribute('data-phase', phase.name);
      icon.innerHTML = `<i class="${phase.icon}"></i>`;
      title.textContent = phase.title;
      description.textContent = phase.description;
      
      // Update indicators
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === phaseIndex);
      });
      
      // Fade back in
      if (animate) {
        setTimeout(() => {
          display.style.opacity = '1';
          display.style.transform = 'scale(1)';
        }, 50);
      }
    }, animate ? 400 : 0);
  }

  function nextPhase() {
    currentPhase = (currentPhase + 1) % phases.length;
    updateDisplay(currentPhase);
  }

  function goToPhase(phaseIndex) {
    if (phaseIndex !== currentPhase) {
      currentPhase = phaseIndex;
      updateDisplay(currentPhase);
      resetAutoRotate();
    }
  }

  function startAutoRotate() {
    autoRotateInterval = setInterval(nextPhase, 4000);
  }

  function stopAutoRotate() {
    if (autoRotateInterval) {
      clearInterval(autoRotateInterval);
    }
  }

  function resetAutoRotate() {
    stopAutoRotate();
    startAutoRotate();
  }

  // Set up indicator click handlers
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => goToPhase(index));
  });

  // Pause auto-rotate on hover
  display.addEventListener('mouseenter', stopAutoRotate);
  display.addEventListener('mouseleave', startAutoRotate);

  // Initialize
  updateDisplay(0, false);
  startAutoRotate();
}

/**
 * Dark mode transitions using CSS classes for better performance and contrast
 * Smooth progressive fade inspired by Apple/Stripe
 */
function initDarkModeTransitions() {
  const sections = document.querySelectorAll('.section');
  const isMobile = window.innerWidth <= 768;
  let ticking = false;

  // Target specific sections for dark mode
  const darkModeSections = ['vision'];

  function updateSectionThemes() {
    const windowHeight = window.innerHeight;

    sections.forEach((section) => {
      const sectionId = section.id;
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      
      if (darkModeSections.includes(sectionId)) {
        // Simplified calculations for better mobile performance
        const enterStart = windowHeight * 0.8;
        const enterEnd = windowHeight * 0.45;
        const exitStart = -sectionHeight * 0.65;
        const exitEnd = -sectionHeight * 0.9;
        
        // Entering: slower fade in as section enters from bottom
        const enterProgress = 1 - Math.max(0, Math.min(1, (sectionTop - enterEnd) / (enterStart - enterEnd)));
        
        // Exiting: much slower fade out as section exits from top
        const exitProgress = sectionTop < 0 ? Math.max(0, Math.min(1, (sectionTop - exitEnd) / (exitStart - exitEnd))) : 1;
        
        // Combined progress with smoother easing for slower transitions
        const rawProgress = Math.min(enterProgress, exitProgress);
        // Slower easing curve - quartic for more gradual transitions
        const easedProgress = rawProgress * rawProgress * rawProgress * (rawProgress * (rawProgress * 6 - 15) + 10);
        
        if (easedProgress > 0.02) {
          section.classList.add('dark-mode');
          // Apply progressive opacity to the dark background
          section.style.setProperty('--dark-opacity', easedProgress);
        } else {
          section.classList.remove('dark-mode');
          section.style.removeProperty('--dark-opacity');
        }
      }
    });

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateSectionThemes);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick, { passive: true });
  updateSectionThemes();
}

/**
 * Highlight effects for words, boxes, and elements
 * Smooth staggered reveals inspired by Apple/Stripe
 */
function initHighlightEffects() {
  // Group elements by their parent section for staggered reveals
  const sections = document.querySelectorAll('.section');
  const isMobile = window.innerWidth <= 768;
  
  sections.forEach(section => {
    const cards = section.querySelectorAll('.feature-card, .difference-item, .economy-feature, .pillar');
    const highlights = section.querySelectorAll('.highlight');
    
    // Set initial state for cards - use will-change for better performance
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'none';
      card.style.willChange = 'opacity, transform';
    });
    
    // Observer for staggered card reveals
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const cards = Array.from(card.parentElement.querySelectorAll('.feature-card, .difference-item, .economy-feature, .pillar'));
          const index = cards.indexOf(card);
          
          // Reduce stagger delay on mobile for smoother experience
          const delay = isMobile ? index * 0.05 : index * 0.1;
          
          setTimeout(() => {
            card.style.transition = 'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            
            // Remove will-change after animation completes
            setTimeout(() => {
              card.style.willChange = 'auto';
            }, 700);
          }, delay * 1000);
          
          cardObserver.unobserve(card);
        }
      });
    }, {
      threshold: isMobile ? 0.05 : 0.15,
      rootMargin: isMobile ? '0px 0px -40px 0px' : '0px 0px -80px 0px'
    });
    
    cards.forEach(card => cardObserver.observe(card));
    
    // Subtle highlight word effect
    highlights.forEach(highlight => {
      highlight.style.transition = 'color 0.4s ease, background-size 0.6s ease';
    });
  });
}

// Initialize AOS (Animate On Scroll) if the library is included
if (false && typeof AOS !== 'undefined') {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });
}
