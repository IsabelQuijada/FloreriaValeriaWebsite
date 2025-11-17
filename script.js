// Funcionalidad del menú móvil
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace (móvil)
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });

    // Smooth scrolling para enlaces internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Funcionalidad de botones
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent.includes('VER PRODUCTOS')) {
                document.querySelector('#productos').scrollIntoView({
                    behavior: 'smooth'
                });
            } else if (this.textContent.includes('CONTACTAR')) {
                window.open('https://wa.me/5255555555', '_blank');
            }
        });
    });

    // Funcionalidad de botones de productos
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    addToCartBtns.forEach(button => {
        button.addEventListener('click', function() {
            // Aquí puedes agregar la funcionalidad del carrito
            alert('Producto agregado al carrito');
        });
    });

    // Funcionalidad de vista rápida
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    quickViewBtns.forEach(button => {
        button.addEventListener('click', function() {
            // Aquí puedes agregar la funcionalidad de vista rápida
            alert('Vista rápida del producto');
        });
    });

    // Funcionalidad de categorías
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(button => {
        button.addEventListener('click', function() {
            // Aquí puedes redirigir a la página de la categoría
            const categoryName = this.parentElement.querySelector('.category-name').textContent;
            alert(`Navegando a categoría: ${categoryName}`);
        });
    });

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('.newsletter-input').value;
            if (email) {
                alert('¡Gracias por suscribirte a nuestro newsletter!');
                this.querySelector('.newsletter-input').value = '';
            }
        });
    }

    // Animaciones al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    const animateElements = document.querySelectorAll('.product-card, .category-card, .section-header');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Funcionalidad para cambio de tema (opcional)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Cargar tema guardado
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});