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

    // Typing effect for hero title - DISABLED
    // function typeWriter(element, text, speed = 100) {
    //     let i = 0;
    //     element.textContent = '';
    //     
    //     function type() {
    //         if (i < text.length) {
    //             element.textContent += text.charAt(i);
    //             i++;
    //             setTimeout(type, speed);
    //         }
    //     }
    //     
    //     type();
    // }

    // Hero title typing effect - DISABLED
    // const heroTitle = document.querySelector('.hero-title');
    // if (heroTitle) {
    //     const titleText = heroTitle.textContent;
    //     typeWriter(heroTitle, titleText, 150);
    // }

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
                window.open('https://www.linkedin.com/in/irizarryrafael/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app', '_blank');
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

// Hover Progress Bar for Elevate Steps
document.addEventListener('DOMContentLoaded', function() {
    const hoverProgressFill = document.querySelector('.hover-progress-fill');
    const stepCards = document.querySelectorAll('.step-card');
    
    if (hoverProgressFill && stepCards.length > 0) {
        stepCards.forEach((card, index) => {
            card.addEventListener('mouseenter', function() {
                const progressPercentage = ((index + 1) / stepCards.length) * 100;
                hoverProgressFill.style.width = progressPercentage + '%';
            });
            
            card.addEventListener('mouseleave', function() {
                hoverProgressFill.style.width = '0%';
            });
        });
    }
});

// Services Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const header = card.querySelector('.service-header');
        
        header.addEventListener('click', function() {
            // Close all other service cards
            serviceCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('active');
                }
            });
            
            // Toggle current card
            card.classList.toggle('active');
        });
    });
});

// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// Language Switcher Functionality
document.addEventListener('DOMContentLoaded', function() {
    const languageSwitcher = document.getElementById('languageSwitcher');
    const currentLangSpan = document.querySelector('.current-lang');
    let currentLanguage = 'es'; // Default to Spanish
    
    // Language content mapping
    const languageContent = {
        es: {
            // Navigation
            'nav-home': 'Inicio',
            'nav-about': 'Sobre Mí',
            'nav-services': 'Servicios',
            'nav-leadership': 'ELEVATE',
            'nav-faq': 'FAQ',
            'nav-contact': 'Contacto',
            
            // Hero Section
            'hero-title': 'RAFAEL IRIZARRY',
            'hero-subtitle': 'Consultor de Negocios',
            'hero-description': 'Hombre de negocios, persona de influencia, recurso profesional de administración de empresas.<br><strong>Auténtico, moderno, elegante y energético.</strong>',
            'hero-cta': 'Te ayudo a hacer crecer tu negocio.',
            'btn-consult': 'Consultar Ahora',
            'btn-services': 'Ver Servicios',
            
            // About Section
            'about-title': 'Sobre Rafael Irizarry',
            'about-subtitle': 'Experiencia, Liderazgo y Excelencia Operacional',
            'about-lead': 'Como consultor especializado en excelencia operacional, hospitalidad y gestión industrial, Rafael Irizarry ha desarrollado una metodología única que transforma negocios y cultiva entornos de crecimiento sostenible.',
            'about-feature1-title': 'Experiencia Comprobada',
            'about-feature1-desc': 'Años de experiencia en transformación empresarial',
            'about-feature2-title': 'Enfoque Personalizado',
            'about-feature2-desc': 'Estrategias adaptadas a cada cliente',
            'about-feature3-title': 'Resultados Medibles',
            'about-feature3-desc': 'Crecimiento comprobado y sostenible',
            'about-stat1': '15+',
            'about-stat1-label': 'Años de Experiencia',
            'about-stat2': '50+',
            'about-stat2-label': 'Empresas Transformadas',
            'about-stat3': '95%',
            'about-stat3-label': 'Satisfacción del Cliente',
            
            // Services Section
            'services-title': 'Servicios',
            'services-subtitle': 'Soluciones integrales para el crecimiento empresarial',
            'service1-title': 'Excelencia Operacional',
            'service1-desc': 'Optimización de procesos, mejora continua y eficiencia operacional para maximizar la productividad y reducir costos.',
            'service1-feature1': 'Análisis de procesos',
            'service1-feature2': 'Implementación de mejoras',
            'service1-feature3': 'Medición de resultados',
            'service2-title': 'Hospitalidad',
            'service2-desc': 'Desarrollo de estrategias de servicio al cliente y experiencias que generen lealtad y crecimiento sostenible.',
            'service2-feature1': 'Estrategias de servicio',
            'service2-feature2': 'Experiencias del cliente',
            'service2-feature3': 'Programas de lealtad',
            'service3-title': 'Gestión Industrial',
            'service3-desc': 'Optimización de operaciones industriales, gestión de recursos y mejora de procesos de producción.',
            'service3-feature1': 'Optimización de procesos',
            'service3-feature2': 'Gestión de recursos',
            'service3-feature3': 'Control de calidad',
            
            // Elevate Section
            'elevate-title': 'Primeros 3 Pasos para ELEVAR',
            'elevate-subtitle': 'Los pasos fundamentales para elevar tu negocio al siguiente nivel',
            'elevate-step1-title': 'Conoce tu Producto',
            'elevate-step1-desc': 'Comprende profundamente tu producto o servicio, sus fortalezas, debilidades y valor único que ofrece al mercado.',
            'elevate-step2-title': 'Conoce tu Mercado',
            'elevate-step2-desc': 'Analiza tu mercado objetivo, identifica necesidades, competencia y oportunidades de crecimiento.',
            'elevate-step3-title': 'Conoce tu Proceso',
            'elevate-step3-desc': 'Optimiza tus procesos operativos para maximizar eficiencia, calidad y rentabilidad en cada etapa.',
            
            // Content Pillars Section
            'pillars-title': 'Áreas de Especialización',
            'pillars-subtitle': 'Conocimiento profundo en múltiples disciplinas',
            'pillar1-title': 'Liderazgo',
            'pillar1-item1': 'Temas de liderazgo',
            'pillar1-item2': 'Empresarismo',
            'pillar2-title': 'Grupo de Consultoría',
            'pillar2-item1': 'Consultorías especializadas',
            'pillar2-item2': 'Estrategias para empresas',
            'pillar3-title': 'Estilo De Vida',
            'pillar3-item1': 'Filantropía',
            'pillar3-item2': 'Motivación',
            'pillar3-item3': 'Frases inspiradoras',
            
            // FAQ Section
            'faq-title': 'Preguntas Frecuentes',
            'faq-subtitle': 'Respuestas a las consultas más comunes',
            'faq1-question': '¿Qué servicios de consultoría ofreces?',
            'faq1-answer': 'Ofrezco consultoría especializada en tres áreas principales: Excelencia Operacional (optimización de procesos y mejora continua), Hospitalidad (desarrollo de estrategias de servicio al cliente), y Gestión Industrial (manufactura, logística y operaciones industriales).',
            'faq2-question': '¿Cómo funciona el proceso de consultoría?',
            'faq2-answer': 'El proceso comienza con una consulta inicial gratuita donde analizamos las necesidades específicas de tu empresa. Luego desarrollamos un plan personalizado, implementamos las mejoras y realizamos un seguimiento continuo para asegurar resultados sostenibles.',
            'faq3-question': '¿Qué tamaño de empresas trabajas?',
            'faq3-answer': 'Trabajo con empresas de todos los tamaños, desde startups hasta corporaciones establecidas. Mi metodología se adapta a las necesidades específicas de cada organización, independientemente de su tamaño o industria.',
            'faq4-question': '¿Cuánto tiempo toma ver resultados?',
            'faq4-answer': 'Los resultados iniciales suelen ser visibles en las primeras 4-6 semanas, con mejoras significativas en 3-6 meses. El tiempo exacto depende del alcance del proyecto y la complejidad de los cambios implementados.',
            'faq5-question': '¿Ofreces consultoría remota o presencial?',
            'faq5-answer': 'Ofrezco ambos formatos según las necesidades del proyecto. La consultoría remota es ideal para análisis y planificación, mientras que la presencial es más efectiva para implementación y entrenamiento de equipos.',
            'faq6-question': '¿Cómo puedo contactarte para una consulta?',
            'faq6-answer': 'Puedes contactarme a través del formulario en esta página, por LinkedIn, o Instagram (@rafaelirizarrypr). También puedes enviarme un email directamente. Respondo a todas las consultas dentro de 24 horas.',
            
            // Contact Section
            'contact-title': 'Consulta con un Experto',
            'contact-subtitle': 'Transforma tu negocio hoy mismo',
            'contact-info-title': 'Conecta con Rafael',
            'contact-info-desc': 'Listo para llevar tu empresa al siguiente nivel? Contáctame para una consulta personalizada.',
            'contact-name-placeholder': 'Nombre',
            'contact-email-placeholder': 'Email',
            'contact-company-placeholder': 'Empresa',
            'contact-service-label': 'Tipo de Consultoría',
            'contact-service-placeholder': 'Tipo de Consultoría',
            'contact-service-operational': 'Excelencia Operacional',
            'contact-service-hospitality': 'Hospitalidad',
            'contact-service-industrial': 'Gestión Industrial',
            'contact-service-general': 'Consulta General',
            'contact-message-placeholder': 'Mensaje',
            'contact-submit': 'Enviar Consulta',
            
            // Footer Section
            'footer-description': 'Consultor de Negocios especializado en Excelencia Operacional, Hospitalidad y Gestión Industrial.',
            'footer-links-title': 'Enlaces Rápidos',
            'footer-link-about': 'Sobre Mí',
            'footer-link-services': 'Servicios',
            'footer-link-leadership': 'ELEVATE',
            'footer-link-contact': 'Contacto',
            'footer-contact-title': 'Contacto',
            'footer-instagram': 'Instagram',
            'footer-linkedin': 'LinkedIn',
            'footer-copyright': '© 2025 Rafael Irizarry. Todos los derechos reservados.',
            'footer-credit': 'Pagina hecha por Derek P. Garcia Ferrer'
        },
        en: {
            // Navigation
            'nav-home': 'Home',
            'nav-about': 'About',
            'nav-services': 'Services',
            'nav-leadership': 'ELEVATE',
            'nav-faq': 'FAQ',
            'nav-contact': 'Contact',
            
            // Hero Section
            'hero-title': 'RAFAEL IRIZARRY',
            'hero-subtitle': 'Business Consultant',
            'hero-description': 'Businessman, person of influence, professional resource in business administration.<br><strong>Authentic, modern, elegant and energetic.</strong>',
            'hero-cta': 'I help you outgrow your business.',
            'btn-consult': 'Consult Now',
            'btn-services': 'View Services',
            
            // About Section
            'about-title': 'About Rafael Irizarry',
            'about-subtitle': 'Experience, Leadership and Operational Excellence',
            'about-lead': 'As a consultant specialized in operational excellence, hospitality and industrial management, Rafael Irizarry has developed a unique methodology that transforms businesses and cultivates sustainable growth environments.',
            'about-feature1-title': 'Proven Experience',
            'about-feature1-desc': 'Years of experience in business transformation',
            'about-feature2-title': 'Personalized Approach',
            'about-feature2-desc': 'Strategies tailored to each client',
            'about-feature3-title': 'Measurable Results',
            'about-feature3-desc': 'Proven and sustainable growth',
            'about-stat1': '15+',
            'about-stat1-label': 'Years of Experience',
            'about-stat2': '50+',
            'about-stat2-label': 'Companies Transformed',
            'about-stat3': '95%',
            'about-stat3-label': 'Client Satisfaction',
            
            // Services Section
            'services-title': 'Services',
            'services-subtitle': 'Comprehensive solutions for business growth',
            'service1-title': 'Operational Excellence',
            'service1-desc': 'Process optimization, continuous improvement and operational efficiency to maximize productivity and reduce costs.',
            'service1-feature1': 'Process analysis',
            'service1-feature2': 'Improvement implementation',
            'service1-feature3': 'Results measurement',
            'service2-title': 'Hospitality',
            'service2-desc': 'Development of customer service strategies and experiences that generate loyalty and sustainable growth.',
            'service2-feature1': 'Service strategies',
            'service2-feature2': 'Customer experiences',
            'service2-feature3': 'Loyalty programs',
            'service3-title': 'Industrial Management',
            'service3-desc': 'Optimization of industrial operations, resource management and production process improvement.',
            'service3-feature1': 'Process optimization',
            'service3-feature2': 'Resource management',
            'service3-feature3': 'Quality control',
            
            // Elevate Section
            'elevate-title': 'First 3 Steps to ELEVATE',
            'elevate-subtitle': 'The fundamental steps to elevate your business to the next level',
            'elevate-step1-title': 'Know Your Product',
            'elevate-step1-desc': 'Understand deeply your product or service, its strengths, weaknesses and unique value it offers to the market.',
            'elevate-step2-title': 'Know Your Market',
            'elevate-step2-desc': 'Analyze your target market, identify needs, competition and growth opportunities.',
            'elevate-step3-title': 'Know Your Process',
            'elevate-step3-desc': 'Optimize your operational processes to maximize efficiency, quality and profitability at every stage.',
            
            // Content Pillars Section
            'pillars-title': 'Areas of Specialization',
            'pillars-subtitle': 'Deep knowledge in multiple disciplines',
            'pillar1-title': 'Leadership',
            'pillar1-item1': 'Leadership topics',
            'pillar1-item2': 'Entrepreneurship',
            'pillar2-title': 'Consulting Group',
            'pillar2-item1': 'Specialized consulting',
            'pillar2-item2': 'Business strategies',
            'pillar3-title': 'Lifestyle',
            'pillar3-item1': 'Philanthropy',
            'pillar3-item2': 'Motivation',
            'pillar3-item3': 'Inspirational quotes',
            
            // FAQ Section
            'faq-title': 'Frequently Asked Questions',
            'faq-subtitle': 'Answers to the most common inquiries',
            'faq1-question': 'What consulting services do you offer?',
            'faq1-answer': 'I offer specialized consulting in three main areas: Operational Excellence (process optimization and continuous improvement), Hospitality (customer service strategy development), and Industrial Management (manufacturing, logistics and industrial operations).',
            'faq2-question': 'How does the consulting process work?',
            'faq2-answer': 'The process begins with a free initial consultation where we analyze the specific needs of your company. Then we develop a personalized plan, implement improvements and conduct continuous follow-up to ensure sustainable results.',
            'faq3-question': 'What size companies do you work with?',
            'faq3-answer': 'I work with companies of all sizes, from startups to established corporations. My methodology adapts to the specific needs of each organization, regardless of size or industry.',
            'faq4-question': 'How long does it take to see results?',
            'faq4-answer': 'Initial results are usually visible in the first 4-6 weeks, with significant improvements in 3-6 months. The exact time depends on the scope of the project and the complexity of the changes implemented.',
            'faq5-question': 'Do you offer remote or in-person consulting?',
            'faq5-answer': 'I offer both formats according to project needs. Remote consulting is ideal for analysis and planning, while in-person is more effective for implementation and team training.',
            'faq6-question': 'How can I contact you for a consultation?',
            'faq6-answer': 'You can contact me through the form on this page, LinkedIn, or Instagram (@rafaelirizarrypr). You can also send me an email directly. I respond to all inquiries within 24 hours.',
            
            // Contact Section
            'contact-title': 'Consult with an Expert',
            'contact-subtitle': 'Transform your business today',
            'contact-info-title': 'Connect with Rafael',
            'contact-info-desc': 'Ready to take your company to the next level? Contact me for a personalized consultation.',
            'contact-name-placeholder': 'Name',
            'contact-email-placeholder': 'Email',
            'contact-company-placeholder': 'Company',
            'contact-service-label': 'Type of Consulting',
            'contact-service-placeholder': 'Type of Consulting',
            'contact-service-operational': 'Operational Excellence',
            'contact-service-hospitality': 'Hospitality',
            'contact-service-industrial': 'Industrial Management',
            'contact-service-general': 'General Consultation',
            'contact-message-placeholder': 'Message',
            'contact-submit': 'Send Consultation',
            
            // Footer Section
            'footer-description': 'Business Consultant specialized in Operational Excellence, Hospitality and Industrial Management.',
            'footer-links-title': 'Quick Links',
            'footer-link-about': 'About',
            'footer-link-services': 'Services',
            'footer-link-leadership': 'ELEVATE',
            'footer-link-contact': 'Contact',
            'footer-contact-title': 'Contact',
            'footer-instagram': 'Instagram',
            'footer-linkedin': 'LinkedIn',
            'footer-copyright': '© 2025 Rafael Irizarry. All rights reserved.',
            'footer-credit': 'Page made by Derek P. Garcia Ferrer'
        }
    };
    
    function updateLanguage(lang) {
        currentLanguage = lang;
        currentLangSpan.textContent = lang.toUpperCase();
        
        // Update navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            const dataAttr = link.getAttribute(`data-${lang}`);
            if (dataAttr) {
                link.textContent = dataAttr;
            }
        });
        
        // Update page content
        Object.keys(languageContent[lang]).forEach(key => {
            const element = document.querySelector(`[data-lang="${key}"]`);
            if (element) {
                if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = languageContent[lang][key];
                } else {
                    element.innerHTML = languageContent[lang][key];
                }
            }
        });
        
        // Store language preference
        localStorage.setItem('preferredLanguage', lang);
    }
    
    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'es';
    updateLanguage(savedLanguage);
    
    // Toggle language on button click
    languageSwitcher.addEventListener('click', function() {
        const newLang = currentLanguage === 'es' ? 'en' : 'es';
        updateLanguage(newLang);
    });
});
