// Rafael Irizarry Website - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .principle-card, .pillar, .feature, .stat');
    animatedElements.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });

    // Leadership principles hover effect
    const principleCards = document.querySelectorAll('.principle-card');
    principleCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 102, 204, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });

    // Service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderTopColor = '#FFD700';
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderTopColor = '#0066CC';
            this.style.transform = 'translateY(0)';
        });
    });

    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.textContent = 'Enviado!';
                submitButton.style.background = '#28a745';
                
                // Reset form
                this.reset();
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.background = '';
                }, 3000);
            }, 2000);
        });
    }

    // Typing effect for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Hero title typing effect
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleText = heroTitle.textContent;
        typeWriter(heroTitle, titleText, 150);
    }

    // Counter animation for stats
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + '+';
        }, 16);
    }

    // Animate counters when they come into view
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                
                if (number) {
                    animateCounter(element, number);
                    statsObserver.unobserve(element);
                }
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Social media link handlers
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('i').className;
            
            let url = '#';
            if (platform.includes('linkedin')) {
                url = 'https://linkedin.com/in/rafaelirizarrypr';
            } else if (platform.includes('instagram')) {
                url = 'https://instagram.com/rafaelirizarrypr';
            } else if (platform.includes('twitter')) {
                url = 'https://twitter.com/rafaelirizarrypr';
            }
            
            window.open(url, '_blank');
        });
    });

    // Contact method click handlers
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach(method => {
        method.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const platform = icon.className;
            
            if (platform.includes('linkedin')) {
                window.open('https://linkedin.com/in/rafaelirizarrypr', '_blank');
            } else if (platform.includes('instagram')) {
                window.open('https://instagram.com/rafaelirizarrypr', '_blank');
            } else if (platform.includes('envelope')) {
                // Scroll to contact form
                document.querySelector('#contact .contact-form').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add loading animation to page
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Service icons animation
    const serviceIcons = document.querySelectorAll('.service-icons i');
    serviceIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.2}s`;
        icon.classList.add('pulse');
    });

    // Add CSS for pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        .pulse {
            animation: pulse 2s infinite;
        }
        
        .loaded {
            opacity: 1;
            transform: translateY(0);
        }
        
        .loading {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease;
        }
        
        .hamburger.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active .bar:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active .bar:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
    `;
    document.head.appendChild(style);
});

// Utility functions
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);
