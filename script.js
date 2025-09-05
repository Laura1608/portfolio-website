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

// Counter animation for stats
function animateCounter(element, target, duration = 1000) {
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initReviewsSlideshow();
    
    // Initialize stats observer
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        statsObserver.observe(aboutSection);
    }
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
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
