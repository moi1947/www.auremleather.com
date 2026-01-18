document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const nav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('nav a');
    const html = document.documentElement;
    
    // Función para abrir/cerrar el menú
    function toggleMenu() {
        const isOpen = nav.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isOpen);
        
        // Bloquear el scroll cuando el menú está abierto
        if (isOpen) {
            html.style.overflow = 'hidden';
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            html.style.overflow = '';
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
    
    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 767) { // Solo en móvil
                toggleMenu();
            }
        });
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            toggleMenu();
        }
    });
    
    // Cerrar menú con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Manejar el scroll del header solo en móvil
    if (window.innerWidth <= 767) {
        let lastScroll = 0;
        const header = document.querySelector('header');
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            // En la parte superior de la página
            if (currentScroll <= 10) {
                header.classList.remove('hide-header');
                return;
            }
            
            // Desplazamiento hacia abajo
            if (currentScroll > lastScroll && !nav.classList.contains('active')) {
                header.classList.add('hide-header');
            } 
            // Desplazamiento hacia arriba
            else if (currentScroll < lastScroll) {
                header.classList.remove('hide-header');
            }
            
            lastScroll = currentScroll;
        });
    }
    
    // Manejar el redimensionamiento de la ventana
    function handleResize() {
        if (window.innerWidth > 767) {
            // Restaurar estilos en pantallas grandes
            nav.style = '';
            html.style.overflow = '';
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
    
    window.addEventListener('resize', handleResize);
});
