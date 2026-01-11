// Navegación suave para los enlaces del menú
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        // Handle 'Inicio' link (scroll to top)
        if (targetId === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }
        
        // Handle other anchor links
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Ajustar el desplazamiento para tener en cuenta el header fijo
            const headerOffset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Cerrar el menú móvil si está abierto
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    });
});

// Manejo del formulario de contacto
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aquí puedes agregar la lógica para enviar el formulario
        // Por ejemplo, usando Fetch API o enviando a un servicio de correo
        
        // Mostrar mensaje de éxito
        alert('¡Gracias por su mensaje! Nos pondremos en contacto con usted pronto.');
        
        // Limpiar el formulario
        this.reset();
    });
}

// Efecto de scroll para el header
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Hacia abajo
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Hacia arriba
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Menú móvil eliminado según solicitud del usuario

// Añadir clase al hacer scroll para animaciones
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Inicializar animaciones al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Agregar clase de animación a los elementos que deben animarse
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
    });
    
    // Forzar una verificación inicial para elementos visibles al cargar
    animateOnScroll();
});

// Función para manejar el cambio de tamaño de la ventana
function handleResize() {
    const nav = document.querySelector('nav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuBtnIcon = document.querySelector('.mobile-menu-btn i');
    
    // Si la pantalla es mayor a 768px, asegurarse de que el menú móvil esté cerrado
    if (window.innerWidth > 768) {
        nav.classList.remove('active');
        if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
        if (mobileMenuBtnIcon) {
            mobileMenuBtnIcon.classList.remove('fa-times');
            mobileMenuBtnIcon.classList.add('fa-bars');
        }
    }
}

// Escuchar cambios en el tamaño de la ventana
window.addEventListener('resize', handleResize);
