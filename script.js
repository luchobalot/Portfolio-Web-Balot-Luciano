// ===== VARIABLES GLOBALES =====
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// ===== NAVEGACIÓN MÓVIL =====
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevenir scroll del body cuando el menú está abierto
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
}

// Event listener para el botón hamburguesa
hamburger.addEventListener('click', toggleMobileMenu);

// Cerrar menú móvil al hacer click en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// ===== NAVEGACIÓN SUAVE Y SCROLL SPY =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remover clase active de todos los enlaces
            navLinks.forEach(link => link.classList.remove('active'));
            // Agregar clase active al enlace actual
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

// ===== EFECTO NAVBAR AL HACER SCROLL =====
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.7)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)'; // Estado inicial
        navbar.style.boxShadow = 'none';
    }
}

// ===== ANIMACIONES AL HACER SCROLL =====
function animateOnScroll() {
    const elements = document.querySelectorAll('.section-title, .hero-content, .about-text, .tech-card, .project-card, .contact-info, .contact-social');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// ===== EFECTOS HOVER PARA TARJETAS DE TECNOLOGÍA =====
function initTechCardEffects() {
    const techCards = document.querySelectorAll('.tech-card');
    
    techCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== EFECTO PARALLAX SUTIL =====
function handleParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroHeight = hero.offsetHeight;
    
    if (scrolled < heroHeight) {
        // Parallax más sutil que no cause cortes
        const rate = scrolled * -0.2;
        hero.style.transform = `translateY(${rate}px)`;
        
        // Desvanecimiento gradual de todo el hero
        const fadePoint = heroHeight * 0.8;
        if (scrolled > fadePoint) {
            const fadeProgress = (scrolled - fadePoint) / (heroHeight - fadePoint);
            const opacity = Math.max(1 - fadeProgress, 0);
            hero.style.opacity = opacity;
        } else {
            hero.style.opacity = 1;
        }
    }
}

// ===== EFECTO TYPING EN EL TÍTULO =====
function typeWriterEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const originalText = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    heroTitle.style.opacity = '1';
    
    let i = 0;
    const speed = 50;
    
    function typeWriter() {
        if (i < originalText.length) {
            heroTitle.innerHTML += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    // Iniciar efecto después de un pequeño delay
    setTimeout(typeWriter, 500);
}

// ===== CONTADOR ANIMADO PARA ESTADÍSTICAS =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        // Iniciar animación cuando el elemento sea visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// ===== EFECTO GLITCH PARA EL LOGO =====
function initLogoGlitch() {
    const logo = document.querySelector('.nav-logo');
    
    logo.addEventListener('mouseenter', function() {
        this.style.animation = 'glitch 0.5s ease-in-out';
    });
    
    logo.addEventListener('animationend', function() {
        this.style.animation = '';
    });
}

// Agregar keyframes para el efecto glitch via JavaScript
const glitchKeyframes = `
@keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
}`;

const style = document.createElement('style');
style.textContent = glitchKeyframes;
document.head.appendChild(style);

// ===== SMOOTH SCROLL PERSONALIZADO =====
function initSmoothScroll() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== EFECTOS DE PARTÍCULAS SIMPLES =====
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 212, 255, 0.5);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            z-index: 1;
        `;
        hero.appendChild(particle);
    }
    
    // Efecto de desvanecimiento de partículas al hacer scroll
    window.addEventListener('scroll', function() {
        const scrollPercentage = Math.min(window.scrollY / window.innerHeight, 1);
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach(particle => {
            const opacity = Math.max(0.5 - (scrollPercentage * 0.8), 0);
            particle.style.opacity = opacity;
        });
    });
}

// Keyframes para las partículas
const particleKeyframes = `
@keyframes float {
    0%, 100% {
        transform: translateY(0px) rotate(0deg);
        opacity: 0.5;
    }
    50% {
        transform: translateY(-20px) rotate(180deg);
        opacity: 1;
    }
}`;

const particleStyle = document.createElement('style');
particleStyle.textContent = particleKeyframes;
document.head.appendChild(particleStyle);

// ===== LAZY LOADING PARA OPTIMIZACIÓN =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== EFECTO CURSOR PERSONALIZADO =====
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(0, 212, 255, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        display: none;
    `;
    document.body.appendChild(cursor);
    
    // Solo en dispositivos con mouse
    if (window.matchMedia('(pointer: fine)').matches) {
        cursor.style.display = 'block';
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });
        
        // Efecto hover en elementos interactivos
        const interactiveElements = document.querySelectorAll('a, button, .tech-card, .project-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursor.style.background = 'rgba(0, 212, 255, 0.6)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'rgba(0, 212, 255, 0.3)';
            });
        });
    }
}

// ===== PRELOADER =====
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    const loader = document.createElement('div');
    loader.style.cssText = `
        width: 50px;
        height: 50px;
        border: 3px solid rgba(0, 212, 255, 0.3);
        border-top: 3px solid var(--primary-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    preloader.appendChild(loader);
    document.body.appendChild(preloader);
    
    // Agregar keyframes para el spinner
    const spinKeyframes = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }`;
    
    const spinStyle = document.createElement('style');
    spinStyle.textContent = spinKeyframes;
    document.head.appendChild(spinStyle);
    
    // Remover preloader cuando la página esté cargada
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    });
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    initSmoothScroll();
    initTechCardEffects();
    initLogoGlitch();
    initLazyLoading();
    initCustomCursor();
    initPreloader();
    
    // Animaciones iniciales
    setTimeout(() => {
        animateCounters();
        createParticles();
    }, 1500);
    
    // Agregar clase visible al hero inmediatamente
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('visible');
        }
    }, 100);
});

// ===== EVENT LISTENERS =====
window.addEventListener('scroll', function() {
    // Throttle scroll events para mejor performance
    clearTimeout(window.scrollTimeout);
    window.scrollTimeout = setTimeout(() => {
        handleNavbarScroll();
        updateActiveNavLink();
        animateOnScroll();
        handleParallax();
    }, 10);
});

// Redimensionar ventana
window.addEventListener('resize', function() {
    // Cerrar menú móvil si se redimensiona a desktop
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ===== FUNCIONES UTILITARIAS =====

// Función para agregar efecto de reveal a elementos
function revealElements() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Función para obtener posición de scroll
function getScrollPosition() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

// Función para scroll hacia arriba
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== EASTER EGG =====
// Secuencia de teclas para activar efecto especial
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    // Crear efecto de confetti
    const colors = ['#00d4ff', '#ff6b6b', '#4ecdc4', '#ffd93d', '#6bcf7f'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            createConfetti(colors[Math.floor(Math.random() * colors.length)]);
        }, i * 10);
    }
    
    // Mostrar mensaje
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: var(--primary-color);
        padding: 2rem;
        border-radius: 15px;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 10001;
        text-align: center;
        border: 2px solid var(--primary-color);
    `;
    message.textContent = '🎉 ¡Código Konami activado! 🎉';
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

function createConfetti(color) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${color};
        left: ${Math.random() * 100}vw;
        top: -10px;
        z-index: 10000;
        pointer-events: none;
        border-radius: 50%;
    `;
    
    document.body.appendChild(confetti);
    
    const fallDuration = Math.random() * 3000 + 2000;
    const fallDistance = window.innerHeight + 20;
    
    confetti.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        { transform: `translateY(${fallDistance}px) rotate(360deg)`, opacity: 0 }
    ], {
        duration: fallDuration,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => confetti.remove();
}

// ===== PERFORMANCE OPTIMIZATIONS =====

// Throttle function para optimizar eventos de scroll
function throttle(func, wait) {
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

// Aplicar throttle a eventos de scroll
const throttledScroll = throttle(() => {
    handleNavbarScroll();
    updateActiveNavLink();
    animateOnScroll();
}, 16); // ~60fps

window.addEventListener('scroll', throttledScroll);

// ===== ACCESIBILIDAD =====

// Soporte para navegación por teclado
document.addEventListener('keydown', function(e) {
    // ESC para cerrar menú móvil
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
    
    // Enter en elementos focuseables
    if (e.key === 'Enter') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('tech-card') || 
            focusedElement.classList.contains('project-card')) {
            focusedElement.click();
        }
    }
});

// Agregar indicadores de foco visibles
const style2 = document.createElement('style');
style2.textContent = `
.tech-card:focus,
.project-card:focus,
.nav-link:focus,
.btn:focus,
.social-link:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}`;
document.head.appendChild(style2);

// ===== DETECCIÓN DE MODO DE PREFERENCIA =====
// Respetar preferencias del usuario sobre animaciones
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Desactivar animaciones complejas
    document.documentElement.style.setProperty('--transition-fast', '0.01s');
    document.documentElement.style.setProperty('--transition-medium', '0.01s');
    document.documentElement.style.setProperty('--transition-slow', '0.01s');
}

// ===== LOGS DE DESARROLLO =====
console.log('%c¡Hola Developer! 👋', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%cSi estás viendo esto, probablemente te guste curiosear el código. ¡Me gusta tu estilo! 🚀', 'color: #4ecdc4; font-size: 14px;');
console.log('%c¿Quieres colaborar? Envíame un mensaje 📧', 'color: #ff6b6b; font-size: 14px;');