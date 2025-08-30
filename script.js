// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations
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

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.section, .project-card, .review-card');
    animateElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
    
    // Initialize skill bars observer
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }
    
    // Initialize typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.style.opacity = '0'; // Start invisible
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
    
    // Initialize stats observer
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        statsObserver.observe(aboutSection);
    }
    
    // Initialize image loading
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
    });
});

// Typing effect function
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Animate skill bars on scroll
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach((bar, index) => {
                // Get the target width from the inline style
                const targetWidth = bar.getAttribute('data-width') || bar.style.width;
                if (targetWidth && !bar.classList.contains('loaded')) {
                    bar.style.width = '0%';
                    // Stagger the animation with a delay for each bar
                    setTimeout(() => {
                        bar.style.width = targetWidth;
                        bar.classList.add('loaded');
                    }, 200 + (index * 150)); // 200ms initial delay + 150ms per bar
                }
            });
            // Unobserve after animation to prevent reloading
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Add CSS for active navigation state
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    const scrolled = window.pageYOffset;
    
    // Navbar background change
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
    
    // Floating elements parallax effect
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach(card => {
        const speed = card.getAttribute('data-speed') || 1;
        const yPos = -(scrolled * speed * 0.5);
        card.style.transform = `translateY(${yPos}px)`;
    });
    
    // Hero parallax effect
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
    
    // Active navigation state
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}, 16)); // ~60fps

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add focus management for accessibility
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('focus', () => {
        link.parentElement.style.outline = '2px solid var(--primary-color)';
        link.parentElement.style.outlineOffset = '2px';
    });
    
    link.addEventListener('blur', () => {
        link.parentElement.style.outline = 'none';
    });
});

// Reviews Slideshow Functionality
function initReviewsSlideshow() {
    const slideshow = document.querySelector('.reviews-slideshow');
    if (!slideshow) return;
    
    const track = slideshow.querySelector('.reviews-track');
    const cards = track.querySelectorAll('.review-card');
    const prevBtn = slideshow.querySelector('.slideshow-prev');
    const nextBtn = slideshow.querySelector('.slideshow-next');
    
    if (cards.length <= 1) return; // No need for slideshow if 1 or fewer cards
    
    let currentIndex = 0;
    const totalSlides = cards.length;
    let slideshowInterval;
    
               function updateSlideshow() {
               const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight);
               const translateX = -currentIndex * cardWidth;
               track.style.transform = `translateX(${translateX}px)`;
               
               // Show/hide navigation arrows based on current position
               if (prevBtn) {
                   prevBtn.style.display = currentIndex === 0 ? 'none' : 'flex';
               }
               if (nextBtn) {
                   nextBtn.style.display = currentIndex === totalSlides - 1 ? 'none' : 'flex';
               }
           }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlideshow();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlideshow();
    }
    
    function startAutoAdvance() {
        slideshowInterval = setInterval(nextSlide, 4000);
    }
    
    function stopAutoAdvance() {
        if (slideshowInterval) {
            clearInterval(slideshowInterval);
        }
    }
    
    // Navigation button event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoAdvance();
            nextSlide();
            startAutoAdvance();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoAdvance();
            prevSlide();
            startAutoAdvance();
        });
    }
    
    // Pause slideshow on hover
    slideshow.addEventListener('mouseenter', () => {
        stopAutoAdvance();
    });
    
    // Resume slideshow when mouse leaves
    slideshow.addEventListener('mouseleave', () => {
        startAutoAdvance();
    });
    
    // Update on window resize
    window.addEventListener('resize', () => {
        currentIndex = 0;
        updateSlideshow();
    });
    
    // Initial setup
    updateSlideshow();
    startAutoAdvance();
}

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initReviewsSlideshow();
    initProjectModals();
});

// Project Popup Functionality
function initProjectModals() {
    // Add click event listeners to project cards
    const projectCards = document.querySelectorAll('.project-card[data-project]');
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            const popup = document.getElementById(`popup-${projectId}`);
            if (popup) {
                popup.classList.add('active');
            }
        });
    });

    // Close popup when clicking outside or on close button
    const popups = document.querySelectorAll('.project-popup');
    popups.forEach(popup => {
        popup.addEventListener('click', (e) => {
            if (e.target === popup || e.target.closest('.project-popup-close')) {
                popup.classList.remove('active');
            }
        });
    });

    // Close popup with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activePopup = document.querySelector('.project-popup.active');
            if (activePopup) {
                activePopup.classList.remove('active');
            }
        }
    });
}

console.log('Portfolio website loaded successfully! 🚀');
