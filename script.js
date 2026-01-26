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

    // Contact form handling with EmailJS
    const contactForm = document.getElementById('consultationForm');
    const formStatus = document.getElementById('formStatus');
    
    // Check if EmailJS is properly configured
    const isEmailJSConfigured = () => {
        return typeof emailjs !== 'undefined' && 
               emailjs.init && 
               window.emailjsPublicKey && 
               window.emailjsServiceId && 
               window.emailjsTemplateId &&
               window.emailjsClientTemplateId;
    };
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formDataObj = {
                name: formData.get('name'),
                email: formData.get('email'),
                company: formData.get('company'),
                service_type: formData.get('consultoria'),
                message: formData.get('message')
            };
            
            // Get submit button and status element
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            formStatus.style.display = 'none';
            
            // Check if EmailJS is configured
            if (!isEmailJSConfigured()) {
                // Fallback: Show form data and provide contact info
                
                // Create a mailto link as fallback
                const subject = `Consultation Request from ${formDataObj.name}`;
                const body = `Name: ${formDataObj.name}
Email: ${formDataObj.email}
Company: ${formDataObj.company}
Service Type: ${formDataObj.service_type}
Message: ${formDataObj.message}`;
                
                const mailtoLink = `mailto:derekp927@icloud.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                
                // Show fallback message
                formStatus.innerHTML = `
                    <div class="info-message">
                        <i class="fas fa-info-circle"></i>
                        <p>Email service not configured yet. Please copy your message and send it directly:</p>
                        <a href="${mailtoLink}" class="btn btn-secondary" style="margin-top: 10px;">
                            <i class="fas fa-envelope"></i> Send Email
                        </a>
                        <p style="margin-top: 10px; font-size: 0.9em;">
                            Or contact us at: <strong>derekp927@icloud.com</strong>
                        </p>
                    </div>
                `;
                formStatus.style.display = 'block';
                formStatus.className = 'form-status info';
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Hide message after delay
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 10000);
                
                return;
            }
            
            // Initialize EmailJS if not already done
            if (typeof emailjs !== 'undefined' && window.emailjsPublicKey) {
                emailjs.init(window.emailjsPublicKey);
            }
            
            // Prepare template parameters
            const templateParams = {
                from_name: formDataObj.name,
                from_email: formDataObj.email,
                company: formDataObj.company,
                service_type: formDataObj.service_type,
                message: formDataObj.message,
                to_email: 'derekp927@icloud.com',
                reply_to: formDataObj.email
            };
            
            // Send both emails using EmailJS
            const sendConsultationEmail = emailjs.send(window.emailjsServiceId, window.emailjsTemplateId, templateParams);
            const sendConfirmationEmail = emailjs.send(window.emailjsServiceId, window.emailjsClientTemplateId, templateParams);
            
            // Wait for both emails to complete
            Promise.all([sendConsultationEmail, sendConfirmationEmail])
                .then(function(responses) {
                    
                    // Show success message
                    formStatus.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i> Consultation sent successfully! Check your email for confirmation. We\'ll get back to you within 24 hours.</div>';
                    formStatus.style.display = 'block';
                    formStatus.className = 'form-status success';
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button after delay
                    setTimeout(() => {
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;
                        formStatus.style.display = 'none';
                    }, 5000);
                    
                }, function(error) {
                    
                    // Show detailed error message
                    formStatus.innerHTML = `
                        <div class="error-message">
                            <i class="fas fa-exclamation-circle"></i>
                            <p>Failed to send consultation. Error: ${error.text || error.message || 'Unknown error'}</p>
                            <p style="margin-top: 10px; font-size: 0.9em;">
                                Please try again or contact us directly at: <strong>derekp927@icloud.com</strong>
                            </p>
                        </div>
                    `;
                    formStatus.style.display = 'block';
                    formStatus.className = 'form-status error';
                    
                    // Reset button
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    
                    // Hide error message after delay
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 8000);
                });
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
    function animateCounter(element, target, originalText, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        // Extract the symbol from original text (+, %, etc.)
        const symbol = originalText.replace(/\d/g, '');
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + symbol;
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
                    animateCounter(element, number, text);
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
                // Scroll to contact form (works for all users, no mail client needed)
                const contactForm = document.querySelector('#contact .contact-form');
                if (contactForm) {
                    contactForm.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Focus on email input after scrolling
                    setTimeout(() => {
                        const emailInput = document.querySelector('#contact input[type="email"]');
                        if (emailInput) {
                            emailInput.focus();
                        }
                    }, 500);
                }
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

// Testimonials Hover Functionality - No JavaScript needed, handled by CSS

// Language Switcher Functionality
document.addEventListener('DOMContentLoaded', function() {
    const languageSwitcher = document.getElementById('languageSwitcher');
    const mobileLanguageSwitcher = document.getElementById('mobileLanguageSwitcher');
    const currentLangSpan = document.querySelector('.current-lang');
    let currentLanguage = 'en'; // Default to English
    
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
            'about-title': 'Eng. Rafael Irizarry Rodriguez<br>BSIE, MSEM, LSSBB, LMPC, ACC',
            'about-subtitle': 'Transformación Empresarial, Liderazgo y Excelencia Operacional',
            'about-lead': 'Rafael Irizarry es un consultor de transformación empresarial con más de dos décadas de experiencia ayudando a las organizaciones a rediseñar operaciones, liderazgo y crecimiento. Especializado en excelencia operacional, hospitalidad y gestión industrial, combina marcos de nivel corporativo con liderazgo centrado en las personas para convertir la estrategia en ejecución disciplinada en manufactura, salud, aeroespacial, dispositivos médicos e industrias de servicios.',
            'about-feature1-title': 'Marco Transformacional',
            'about-feature1-desc': 'Años de experiencia en transformación empresarial',
            'about-feature2-title': 'Estrategia Impulsada por la Ejecución',
            'about-feature2-desc': 'Traducimos la estrategia en una ejecución disciplinada con propiedad clara y resultados.',
            'about-feature3-title': 'Liderazgo Multi-Industria',
            'about-feature3-desc': 'Liderazgo comprobado en manufactura, salud, hospitalidad, aeroespacial y dispositivos médicos.',
            'about-feature4-title': 'Cambio Centrado en las Personas',
            'about-feature4-desc': 'Alineamos personas, liderazgo y cultura para sostener la transformación a largo plazo.',
            'about-stat1': '20+',
            'about-stat1-label': 'Años de Experiencia',
            'about-stat2': '50+',
            'about-stat2-label': 'Negocios Transformados',
            'about-stat3': '95%',
            'about-stat3-label': 'Satisfacción del Cliente',
            
            // Services Section
            'services-title': 'Servicios',
            'services-subtitle': 'Soluciones integrales para el crecimiento empresarial',
            'service1-title': 'Excelencia Operacional',
            'service1-desc': 'Implementación práctica de iniciativas de optimización de procesos y mejora continua para mejorar productividad, calidad y costos mediante una ejecución estructurada.',
            'service1-core-title': '<strong>Entregado a través de:</strong>',
            'service1-feature1': 'Compromisos de consultoría',
            'service1-feature2': 'Asesoría ejecutiva',
            'service1-feature3': 'Talleres facilitados',
            'service2-title': 'Transformación Empresarial',
            'service2-desc': 'Programas de transformación de principio a fin que traducen la estrategia en ejecución, alineando modelos operativos, liderazgo y gestión del cambio para habilitar un crecimiento sostenible.',
            'service2-core-title': '<strong>Entregado a través de:</strong>',
            'service2-feature1': 'Consultoría en estrategia y transformación',
            'service2-feature2': 'Asesoría de liderazgo ejecutivo',
            'service2-feature3': 'Talleres de alineación de liderazgo',
            'service3-title': 'Gestión Industrial',
            'service3-desc': 'Acompañamiento presencial y consultivo para entornos industriales y de manufactura, enfocado en sistemas de producción, planificación de capacidad y ejecución guiada por la calidad.',
            'service3-core-title': '<strong>Entregado a través de:</strong>',
            'service3-feature1': 'Soporte de consultoría en sitio',
            'service3-feature2': 'Coaching de liderazgo operacional',
            'service3-feature3': 'Talleres de desarrollo de capacidades',
            
            // Elevate Section
            'elevate-title': 'Primeros 3 Pasos para ELEVAR',
            'elevate-subtitle': 'Los pasos fundamentales para elevar tu negocio al siguiente nivel',
            'elevate-step1-title': 'Clarifica Tu Valor',
            'elevate-step1-desc': 'Definimos tu oferta central, diferenciación única y la propuesta de valor estratégica que impulsa a los clientes a elegirte sobre la competencia.',
            'elevate-step2-title': 'Valida Tu Mercado',
            'elevate-step2-desc': 'Analizamos la demanda, mapeamos el panorama competitivo e identificamos las rutas más rentables para un crecimiento sostenible y tracción.',
            'elevate-step3-title': 'Optimiza Tu Entrega',
            'elevate-step3-desc': 'Construimos un sistema operativo escalable—refinando procesos, roles y métricas—para maximizar eficiencia, calidad y rentabilidad.',
            
            // Content Pillars Section
            'pillars-title': 'Áreas de Especialización',
            'pillars-subtitle': 'Conocimiento profundo en múltiples disciplinas',
            'pillar1-title': 'Liderazgo y Desarrollo Ejecutivo',
            'pillar1-item1': 'Efectividad en el Liderazgo',
            'pillar1-item2': 'Coaching Ejecutivo e Influencia',
            'pillar1-item3': 'Alineación de Equipos y Cultura',
            'pillar2-title': 'Estrategia de Negocios y Crecimiento',
            'pillar2-item1': 'Planificación Estratégica y Posicionamiento',
            'pillar2-item2': 'Insights de Mercado y Clientes',
            'pillar2-item3': 'Modelos de Crecimiento Escalable',
            'pillar3-title': 'Excelencia Operacional y Transformación',
            'pillar3-item1': 'Optimización de Procesos (Lean / Kaizen)',
            'pillar3-item2': 'Sistemas de Gestión del Rendimiento',
            'pillar3-item3': 'Gobernanza de Ejecución y Trabajo Estándar',
            
            // Testimonials Section
            'testimonials-title': 'Testimonios',
            'testimonials-subtitle': 'Resultados reales de líderes que han transformado sus negocios',
            'testimonial1-text': 'Trabajar con Derek fue un placer absoluto. El sitio web que creó para nuestro negocio superó todas las expectativas. Su atención al detalle y compromiso con la entrega de trabajo de calidad es inigualable.',
            'testimonial1-author': 'NOMBRE AQUÍ',
            'testimonial2-text': 'La profesionalidad y experiencia técnica demostrada a lo largo del proyecto fue impresionante. Derek transformó nuestra visión en un sitio web impresionante y funcional que representa perfectamente nuestra marca.',
            'testimonial2-author': 'NOMBRE AQUÍ',
            'testimonial3-text': '¡Trabajo excepcional! Derek entregó un sitio web responsivo y moderno que ha mejorado significativamente nuestra presencia en línea. Altamente recomendado para cualquiera que busque servicios de desarrollo web de alta calidad.',
            'testimonial3-author': 'NOMBRE AQUÍ',
            
            // FAQ Section
            'faq-title': 'Preguntas Frecuentes',
            'faq-subtitle': 'Respuestas a las consultas más comunes',
            'faq1-question': '¿Qué servicios de consultoría ofreces?',
            'faq1-answer': 'Me especializo en Transformación Empresarial, Excelencia Operacional y Gestión Industrial. Mis servicios se enfocan en ayudar a las organizaciones a diseñar modelos de negocio escalables, optimizar procesos, alinear estrategia con ejecución y construir equipos de alto rendimiento en múltiples industrias. Trabajo con organizaciones que buscan mejorar la eficiencia, impulsar el crecimiento sostenible y ejecutar cambios con resultados medibles.',
            'faq2-question': '¿Cómo funciona el proceso de consultoría?',
            'faq2-answer': 'Mi enfoque de consultoría es estructurado, práctico y orientado a resultados. Típicamente incluye: Evaluación y diagnóstico del estado actual; Diseño de estrategia y soluciones alineadas a objetivos empresariales; Apoyo en implementación con ejecución práctica; Medición y seguimiento para asegurar resultados sostenibles. Cada compromiso se adapta a las necesidades, cultura y nivel de madurez de la organización.',
            'faq3-question': '¿Qué tamaño de empresas trabajas?',
            'faq3-answer': 'Trabajo con pequeñas y medianas empresas, organizaciones en crecimiento y empresas establecidas. Mi experiencia abarca startups, empresas familiares, universidades, organizaciones sin fines de lucro y organizaciones multinacionales en industrias como manufactura, salud, servicios, educación, energía y entornos impulsados por operaciones.',
            'faq4-question': '¿Cuánto tiempo toma ver resultados?',
            'faq4-answer': 'Los resultados dependen del alcance y la complejidad del compromiso. Sin embargo, las mejoras tempranas a menudo son visibles dentro de los primeros 30 a 90 días, especialmente en iniciativas de optimización de procesos y alineación operacional. La transformación a largo plazo se enfoca en construir sistemas y capacidades sostenibles con el tiempo.',
            'faq5-question': '¿Ofreces consultoría remota o presencial?',
            'faq5-answer': 'Sí. Ofrezco consultoría remota y presencial, dependiendo del alcance del proyecto y la preferencia del cliente. Este enfoque híbrido permite flexibilidad mientras mantiene una colaboración sólida y disciplina de ejecución.',
            'faq6-question': '¿Cómo puedo contactarte para una consulta?',
            'faq6-answer': 'Puedes contactarme directamente a través de la sección de Contacto de este sitio web o programar una consulta usando el formulario proporcionado. Estaré encantado de discutir tus desafíos y explorar cómo podemos trabajar juntos.',
            
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
            'contact-service-transformation': 'Transformación Empresarial',
            'contact-service-industrial': 'Gestión Industrial',
            'contact-service-general': 'Consulta General',
            'contact-message-placeholder': 'Mensaje',
            'contact-submit': 'Enviar Consulta',
            
            // Footer Section
            'footer-description': '',
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
            'about-title': 'Eng. Rafael Irizarry Rodriguez<br>BSIE, MSEM, LSSBB, LMPC, ACC',
            'about-subtitle': 'Business Transformation, Leadership & Operational Excellence',
            'about-lead': 'Rafael Irizarry is a business transformation consultant with over two decades of experience helping organizations redesign operations, leadership, and growth. Specialized in operational excellence, hospitality, and industrial management, he combines corporate-grade frameworks with human-centered leadership to turn strategy into disciplined execution across manufacturing, healthcare, aerospace, medical devices, and service industries.',
            'about-feature1-title': 'Transformational Framework',
            'about-feature1-desc': 'Years of experience in business transformation',
            'about-feature2-title': 'Execution-Driven Strategy',
            'about-feature2-desc': 'We translate strategy into disciplined execution with clear ownership and results.',
            'about-feature3-title': 'Cross-Industry Leadership',
            'about-feature3-desc': 'Proven leadership across manufacturing, healthcare, hospitality, aerospace, and medical devices.',
            'about-feature4-title': 'Human-Centered Change',
            'about-feature4-desc': 'We align people, leadership, and culture to sustain long-term transformation.',
            'about-stat1': '20+',
            'about-stat1-label': 'Years of Experience',
            'about-stat2': '50+',
            'about-stat2-label': 'Companies Transformed',
            'about-stat3': '95%',
            'about-stat3-label': 'Client Satisfaction',
            
            // Services Section
            'services-title': 'Services',
            'services-subtitle': 'Comprehensive solutions for business growth',
            'service1-title': 'Operational Excellence',
            'service1-desc': 'Hands-on implementation of process optimization and continuous improvement initiatives to improve productivity, quality, and cost performance through structured execution.',
            'service1-core-title': '<strong>Delivered through:</strong>',
            'service1-feature1': 'Consulting engagements',
            'service1-feature2': 'Executive advisory',
            'service1-feature3': 'Facilitated workshops',
            'service2-title': 'Business Transformation',
            'service2-desc': 'End-to-end transformation programs that translate strategy into execution, aligning operating models, leadership, and change management to enable sustainable growth.',
            'service2-core-title': '<strong>Delivered through:</strong>',
            'service2-feature1': 'Strategy & transformation consulting',
            'service2-feature2': 'Executive leadership advisory',
            'service2-feature3': 'Leadership alignment workshops',
            'service3-title': 'Industrial Management',
            'service3-desc': 'On-site and advisory support for industrial and manufacturing environments, focused on production systems, capacity planning, and quality-driven execution.',
            'service3-core-title': '<strong>Delivered through:</strong>',
            'service3-feature1': 'On-site consulting support',
            'service3-feature2': 'Operational leadership coaching',
            'service3-feature3': 'Capability-building workshops',
            
            // Elevate Section
            'elevate-title': 'First 3 Steps to ELEVATE',
            'elevate-subtitle': 'The fundamental steps to elevate your business to the next level',
            'elevate-step1-title': 'Clarify Your Value',
            'elevate-step1-desc': 'We define your core offer, unique differentiation, and the strategic value proposition that compels clients to choose you over the competition.',
            'elevate-step2-title': 'Validate Your Market',
            'elevate-step2-desc': 'We analyze demand, map the competitive landscape, and identify the most profitable pathways for sustainable growth and traction.',
            'elevate-step3-title': 'Optimize Your Delivery',
            'elevate-step3-desc': 'We build a scalable operating system—refining processes, roles, and metrics—to maximize efficiency, quality, and profitability.',
            
            // Content Pillars Section
            'pillars-title': 'Areas of Specialization',
            'pillars-subtitle': 'Deep knowledge in multiple disciplines',
            'pillar1-title': 'Leadership & Executive Development',
            'pillar1-item1': 'Leadership Effectiveness',
            'pillar1-item2': 'Executive Coaching & Influence',
            'pillar1-item3': 'Team Alignment & Culture',
            'pillar2-title': 'Business Strategy & Growth',
            'pillar2-item1': 'Strategic Planning & Positioning',
            'pillar2-item2': 'Market & Customer Insights',
            'pillar2-item3': 'Scalable Growth Models',
            'pillar3-title': 'Operational Excellence & Transformation',
            'pillar3-item1': 'Process Optimization (Lean / Kaizen)',
            'pillar3-item2': 'Performance Management Systems',
            'pillar3-item3': 'Execution Governance & Standard Work',
            
            // Testimonials Section
            'testimonials-title': 'Testimonials',
            'testimonials-subtitle': 'Real results from leaders who\'ve transformed their businesses',
            'testimonial1-text': 'Working with Derek was an absolute pleasure. The website he created for our business exceeded all expectations. His attention to detail and commitment to delivering quality work is unmatched.',
            'testimonial1-author': 'NAME HERE',
            'testimonial2-text': 'The professionalism and technical expertise demonstrated throughout the project was impressive. Derek transformed our vision into a stunning, functional website that perfectly represents our brand.',
            'testimonial2-author': 'NAME HERE',
            'testimonial3-text': 'Outstanding work! Derek delivered a responsive, modern website that has significantly improved our online presence. Highly recommend for anyone looking for top-quality web development services.',
            'testimonial3-author': 'NAME HERE',
            
            // FAQ Section
            'faq-title': 'Frequently Asked Questions',
            'faq-subtitle': 'Answers to the most common inquiries',
            'faq1-question': 'What consulting services do you offer?',
            'faq1-answer': 'I specialize in Business Transformation, Operational Excellence, and Industrial Management. My services focus on helping organizations design scalable business models, optimize processes, align strategy with execution, and build high-performing teams across multiple industries. I work with organizations looking to improve efficiency, drive sustainable growth, and execute change with measurable results.',
            'faq2-question': 'How does the consulting process work?',
            'faq2-answer': 'My consulting approach is structured, practical, and results-driven. It typically includes: Assessment & diagnosis of the current state; Strategy and solution design aligned to business objectives; Implementation support with hands-on execution; Measurement and follow-up to ensure sustainable results. Each engagement is tailored to the organization\'s needs, culture, and level of maturity.',
            'faq3-question': 'What size companies do you work with?',
            'faq3-answer': 'I work with small and medium-sized businesses, growing organizations, and established enterprises. My experience spans startups, family-owned businesses, universities, nonprofits, and multinational organizations across industries such as manufacturing, healthcare, services, education, energy, and operations-driven environments.',
            'faq4-question': 'How long does it take to see results?',
            'faq4-answer': 'Results depend on the scope and complexity of the engagement. However, early improvements are often visible within the first 30 to 90 days, especially in process optimization and operational alignment initiatives. Long-term transformation focuses on building sustainable systems and capabilities over time.',
            'faq5-question': 'Do you offer remote or in-person consulting?',
            'faq5-answer': 'Yes. I offer both remote and in-person consulting, depending on the project scope and client preference. This hybrid approach allows flexibility while maintaining strong collaboration and execution discipline.',
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
            'contact-service-transformation': 'Business Transformation',
            'contact-service-industrial': 'Industrial Management',
            'contact-service-general': 'General Consultation',
            'contact-message-placeholder': 'Message',
            'contact-submit': 'Send Consultation',
            
            // Footer Section
            'footer-description': '',
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
        
        // Update both language switchers
        const allCurrentLangSpans = document.querySelectorAll('.current-lang');
        allCurrentLangSpans.forEach(span => {
            span.textContent = lang.toUpperCase();
        });
        
        // Update navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            const dataAttr = link.getAttribute(`data-${lang}`);
            if (dataAttr) {
                link.textContent = dataAttr;
            }
        });
        
        // Update page content
        Object.keys(languageContent[lang]).forEach(key => {
            const elements = document.querySelectorAll(`[data-lang="${key}"]`);
            elements.forEach(element => {
                if (element.tagName === 'INPUT') {
                    if (element.type === 'submit' || element.type === 'button') {
                        element.value = languageContent[lang][key];
                    } else {
                        element.placeholder = languageContent[lang][key];
                    }
                } else if (element.tagName === 'TEXTAREA') {
                    element.placeholder = languageContent[lang][key];
                } else if (element.tagName === 'OPTION') {
                    element.textContent = languageContent[lang][key];
                } else {
                    element.innerHTML = languageContent[lang][key];
                }
            });
        });
        
        // Store language preference
        localStorage.setItem('preferredLanguage', lang);
    }
    
    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    updateLanguage(savedLanguage);
    
    // Toggle language on button click
    if (languageSwitcher) {
        languageSwitcher.addEventListener('click', function() {
            const newLang = currentLanguage === 'es' ? 'en' : 'es';
            updateLanguage(newLang);
        });
    }
    
    // Toggle language on mobile button click
    if (mobileLanguageSwitcher) {
        mobileLanguageSwitcher.addEventListener('click', function() {
            const newLang = currentLanguage === 'es' ? 'en' : 'es';
            updateLanguage(newLang);
        });
    }
});
