// ===== DATOS DE PRODUCTOS =====

// Productos destacados para la página principal
const featuredProducts = [
    {
        id: 'ramo-rosa-elegante',
        name: 'Ramo Rosa Elegante',
        description: 'Para cualquier ocasión',
        image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&q=80',
        price: '929',
        category: 'ramos',
        altText: 'Elegante ramo de rosas rosadas'
    },
    {
        id: 'bouquet-lisianthus',
        name: 'Bouquet de Lisianthus',
        description: 'Delicadeza y elegancia',
        image: 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?w=600&q=80',
        price: '990',
        category: 'ramos',
        altText: 'Bouquet delicado de lisianthus'
    },
    {
        id: 'green-garden',
        name: 'Green Garden',
        description: 'Arreglo natural',
        image: 'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=600&q=80',
        price: '1,590',
        category: 'arreglos',
        altText: 'Arreglo floral con plantas verdes'
    },
    {
        id: 'amazing',
        name: 'Amazing',
        description: 'Para cualquier ocasión',
        image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80',
        price: '1,329',
        category: 'ramos',
        altText: 'Ramo amazing de flores mixtas'
    },
    {
        id: 'algodon-azucar',
        name: 'Algodón de Azúcar',
        description: 'Para tu mejor amiga',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80',
        price: '1,390',
        category: 'amistad',
        altText: 'Arreglo suave como algodón de azúcar'
    },
    {
        id: 'marion',
        name: 'Marion',
        description: 'Flores para toda ocasión',
        image: 'https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?w=600&q=80',
        price: '1,590',
        category: 'ramos',
        altText: 'Ramo Marion de flores variadas'
    },
    {
        id: 'baby-girl',
        name: 'Baby Girl',
        description: 'Recién nacidos',
        image: 'https://images.unsplash.com/photo-1502472584811-0a2f2feb8968?w=600&q=80',
        price: '1,429',
        category: 'nacimiento',
        altText: 'Arreglo tierno para bebé niña'
    },
    {
        id: 'big-hopes',
        name: 'Big Hopes',
        description: 'Arreglo especial',
        image: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=600&q=80',
        price: '1,690',
        category: 'especiales',
        altText: 'Arreglo especial Big Hopes'
    }
];

// ===== GESTIÓN DE PRODUCTOS =====

let productManager = null;

// Funcionalidad del menú móvil
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar productos destacados
    initializeFeaturedProducts();

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

    // Funcionalidad de botones de productos - ELIMINADO (ahora se maneja en ProductManager)
    // const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    // const quickViewBtns = document.querySelectorAll('.quick-view-btn');

    // Funcionalidad de categorías
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(button => {
        button.addEventListener('click', function(e) {
            const categoryName = this.parentElement.querySelector('.category-name').textContent.trim();
            if (categoryName === 'Para Recordar y Despedir') {
                window.location.href = './galeria-funeraria.html';
            } else {
                // Aquí puedes agregar redirecciones para otras categorías si tienes otras galerías
            }
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

// ===== INICIALIZACIÓN DE PRODUCTOS =====

/**
 * Inicializa el sistema de productos destacados
 */
function initializeFeaturedProducts() {
    // Verificar que exista el contenedor
    const container = document.getElementById('products-grid');
    if (!container) {
        console.warn('Contenedor de productos no encontrado');
        return;
    }

    // Crear ProductManager para productos destacados
    productManager = ProductManager.createFlowerShop('products-grid', featuredProducts);
    
    console.log('Productos destacados inicializados:', productManager.getStats());
}

/**
 * Maneja la vista rápida de productos
 * @param {Object} config - Configuración del producto
 * @param {HTMLElement} element - Elemento DOM de la tarjeta
 * @param {ProductManager} manager - Instancia del ProductManager
 */
function handleQuickView(config, element, manager) {
    // Crear modal simple para vista rápida
    const modal = createProductModal(config);
    document.body.appendChild(modal);
    
    // Mostrar modal
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

/**
 * Maneja la compra de productos
 * @param {Object} config - Configuración del producto
 * @param {HTMLElement} element - Elemento DOM de la tarjeta
 * @param {ProductManager} manager - Instancia del ProductManager
 */
function handleAddToCart(config, element, manager) {
    const message = `Hola, me interesa el producto "${config.name}" - $${config.price}. ¿Podrían darme más información?`;
    const whatsappUrl = `https://wa.me/523335558928?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

/**
 * Crea un modal para mostrar detalles del producto
 * @param {Object} config - Configuración del producto
 * @returns {HTMLElement} Elemento del modal
 */
function createProductModal(config) {
    const modal = document.createElement('div');
    modal.className = 'product-modal-overlay';
    modal.innerHTML = `
        <div class="product-modal">
            <button class="product-modal-close">&times;</button>
            <div class="product-modal-content">
                <div class="product-modal-image">
                    <img src="${config.image}" alt="${config.altText}" />
                </div>
                <div class="product-modal-info">
                    <h2>${config.name}</h2>
                    <p class="product-modal-category">${config.category}</p>
                    <p class="product-modal-description">${config.description}</p>
                    <div class="product-modal-price">$${config.price}</div>
                    <div class="product-modal-actions">
                        <button class="btn btn-primary" onclick="handleAddToCart(${JSON.stringify(config).replace(/"/g, '&quot;')}, null, null)">
                            COMPRAR
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Agregar estilos básicos
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = modal.querySelector('.product-modal');
    modalContent.style.cssText = `
        background: white;
        border-radius: 12px;
        padding: 24px;
        max-width: 600px;
        width: 90%;
        max-height: 80%;
        overflow-y: auto;
        position: relative;
    `;
    
    const modalImage = modal.querySelector('.product-modal-image img');
    modalImage.style.cssText = `
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 8px;
        margin-bottom: 16px;
    `;
    
    // Cerrar modal
    const closeBtn = modal.querySelector('.product-modal-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: 12px;
        right: 12px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: #f0f0f0;
    `;
    
    closeBtn.addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });
    
    // Cerrar al hacer clic fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeBtn.click();
        }
    });
    
    return modal;
}

// ===== FUNCIONES DE UTILIDAD PARA PRODUCTOS =====

/**
 * Agrega un nuevo producto a la lista de destacados
 * @param {Object} product - Datos del producto
 */
function addFeaturedProduct(product) {
    if (productManager) {
        productManager.addProduct(product);
    }
}

/**
 * Filtra productos por categoría
 * @param {string} category - Categoría a filtrar
 */
function filterProductsByCategory(category) {
    if (productManager) {
        productManager.filterByCategory(category);
    }
}

/**
 * Busca productos por texto
 * @param {string} searchTerm - Término de búsqueda
 */
function searchProducts(searchTerm) {
    if (productManager) {
        productManager.search(searchTerm);
    }
}