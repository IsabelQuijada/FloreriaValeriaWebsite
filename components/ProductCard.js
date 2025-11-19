/**
 * ProductCard - Componente reutilizable para tarjetas de producto
 * 
 * Este componente permite crear tarjetas de producto dinámicamente
 * con datos configurables y comportamientos personalizables.
 */

class ProductCard {
    /**
     * @param {Object} config - Configuración del producto
     * @param {string} config.id - ID único del producto
     * @param {string} config.name - Nombre del producto
     * @param {string} config.description - Descripción del producto
     * @param {string} config.image - URL de la imagen
     * @param {string} config.price - Precio del producto (opcional)
     * @param {string} config.category - Categoría del producto (opcional)
     * @param {string} config.theme - Tema visual: 'default', 'funeral' (opcional)
     * @param {Object} config.actions - Configuración de acciones
     * @param {Function} config.actions.onQuickView - Callback para vista rápida
     * @param {Function} config.actions.onAddToCart - Callback para agregar al carrito
     * @param {Function} config.actions.onContact - Callback para contacto
     * @param {Object} config.customStyles - Estilos CSS personalizados (opcional)
     */
    constructor(config) {
        this.config = {
            id: config.id || Math.random().toString(36).substr(2, 9),
            name: config.name || 'Producto sin nombre',
            description: config.description || '',
            image: config.image || 'https://via.placeholder.com/300x300?text=Sin+Imagen',
            price: config.price || null,
            category: config.category || null,
            theme: config.theme || 'default',
            actions: config.actions || {},
            customStyles: config.customStyles || {},
            altText: config.altText || config.name
        };
        
        this.element = null;
        this.isLoaded = false;
    }
    
    /**
     * Renderiza la tarjeta de producto
     * @returns {HTMLElement} Elemento DOM de la tarjeta
     */
    render() {
        const card = document.createElement('div');
        card.className = this.getCardClasses();
        card.setAttribute('data-product-id', this.config.id);
        card.setAttribute('data-product-theme', this.config.theme);
        
        // Aplicar estilos personalizados
        this.applyCustomStyles(card);
        
        card.innerHTML = this.getCardHTML();
        
        // Configurar event listeners
        this.setupEventListeners(card);
        
        // Configurar animación de carga
        this.setupLoadAnimation(card);
        
        this.element = card;
        return card;
    }
    
    /**
     * Obtiene las clases CSS para la tarjeta
     * @returns {string} String con las clases CSS
     */
    getCardClasses() {
        const baseClass = 'product-card';
        const themeClass = `product-card--${this.config.theme}`;
        const categoryClass = this.config.category ? `product-card--${this.config.category}` : '';
        
        return [baseClass, themeClass, categoryClass].filter(Boolean).join(' ');
    }
    
    /**
     * Genera el HTML interno de la tarjeta
     * @returns {string} HTML de la tarjeta
     */
    getCardHTML() {
        const categoryBadge = this.config.category 
            ? `<div class="product-category">${this.config.category}</div>` 
            : '';
            
        const priceElement = this.config.price 
            ? `<span class="product-price">$${this.config.price}</span>` 
            : '';
            
        const quickViewButton = this.config.actions.onQuickView 
            ? '<button class="quick-view-btn" type="button">Vista Rápida</button>' 
            : '';
            
        const actionButton = this.getActionButton();
        
        return `
            <div class="product-image-wrapper">
                <img src="${this.config.image}" 
                     alt="${this.config.altText}" 
                     class="product-image"
                     loading="lazy">
                <div class="product-overlay">
                    ${quickViewButton}
                </div>
                ${categoryBadge}
            </div>
            <div class="product-info">
                <h3 class="product-name">${this.config.name}</h3>
                <p class="product-description">${this.config.description}</p>
                <div class="product-footer">
                    ${priceElement}
                    ${actionButton}
                </div>
            </div>
        `;
    }
    
    /**
     * Genera el botón de acción principal
     * @returns {string} HTML del botón
     */
    getActionButton() {
        // Si es funeraria, mostrar el CTA personalizado
        if (this.config.theme === 'funeral' && this.config.actions.onContact) {
            return '<button class="contact-btn" type="button">Contactanos</button>';
        }
        if (this.config.actions.onAddToCart) {
            return '<button class="add-to-cart-btn" type="button">COMPRAR</button>';
        }
        if (this.config.actions.onContact) {
            return '<button class="contact-btn" type="button">CONSULTAR</button>';
        }
        return '';
    }
    
    /**
     * Configura los event listeners de la tarjeta
     * @param {HTMLElement} card - Elemento de la tarjeta
     */
    setupEventListeners(card) {
        // Vista rápida
        const quickViewBtn = card.querySelector('.quick-view-btn');
        if (quickViewBtn && this.config.actions.onQuickView) {
            quickViewBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.config.actions.onQuickView(this.config, this.element);
            });
        }
        
        // Agregar al carrito
        const addToCartBtn = card.querySelector('.add-to-cart-btn');
        if (addToCartBtn && this.config.actions.onAddToCart) {
            addToCartBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.config.actions.onAddToCart(this.config, this.element);
            });
        }
        
        // Contactar
        const contactBtn = card.querySelector('.contact-btn');
        if (contactBtn && this.config.actions.onContact) {
            contactBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.config.actions.onContact(this.config, this.element);
            });
        }
        
        // Click en toda la tarjeta (opcional)
        if (this.config.actions.onClick) {
            card.addEventListener('click', () => {
                this.config.actions.onClick(this.config, this.element);
            });
        }
        
        // Hover effects
        card.addEventListener('mouseenter', () => {
            card.classList.add('product-card--hover');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('product-card--hover');
        });
    }
    
    /**
     * Aplica estilos personalizados a la tarjeta
     * @param {HTMLElement} card - Elemento de la tarjeta
     */
    applyCustomStyles(card) {
        if (this.config.customStyles && Object.keys(this.config.customStyles).length > 0) {
            Object.assign(card.style, this.config.customStyles);
        }
    }
    
    /**
     * Configura la animación de entrada
     * @param {HTMLElement} card - Elemento de la tarjeta
     */
    setupLoadAnimation(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        // Usar IntersectionObserver para animar cuando entre en viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isLoaded) {
                    this.animateIn();
                    this.isLoaded = true;
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        observer.observe(card);
    }
    
    /**
     * Anima la entrada de la tarjeta
     */
    animateIn() {
        if (!this.element) return;
        
        this.element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        this.element.style.opacity = '1';
        this.element.style.transform = 'translateY(0)';
    }
    
    /**
     * Actualiza los datos del producto
     * @param {Object} newConfig - Nueva configuración
     */
    update(newConfig) {
        this.config = { ...this.config, ...newConfig };
        
        if (this.element) {
            // Actualizar contenido específico sin re-renderizar completamente
            const nameElement = this.element.querySelector('.product-name');
            const descElement = this.element.querySelector('.product-description');
            const imageElement = this.element.querySelector('.product-image');
            const priceElement = this.element.querySelector('.product-price');
            
            if (nameElement && newConfig.name) {
                nameElement.textContent = newConfig.name;
            }
            
            if (descElement && newConfig.description) {
                descElement.textContent = newConfig.description;
            }
            
            if (imageElement && newConfig.image) {
                imageElement.src = newConfig.image;
                imageElement.alt = newConfig.altText || newConfig.name || this.config.altText;
            }
            
            if (priceElement && newConfig.price) {
                priceElement.textContent = `$${newConfig.price}`;
            }
        }
    }
    
    /**
     * Remueve la tarjeta del DOM con animación
     */
    remove() {
        if (!this.element) return;
        
        this.element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        this.element.style.opacity = '0';
        this.element.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            if (this.element && this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
        }, 300);
    }
    
    /**
     * Obtiene el elemento DOM de la tarjeta
     * @returns {HTMLElement|null} Elemento de la tarjeta
     */
    getElement() {
        return this.element;
    }
    
    /**
     * Obtiene los datos de configuración del producto
     * @returns {Object} Configuración del producto
     */
    getConfig() {
        return { ...this.config };
    }
}

// Exportar para uso modular
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductCard;
} else {
    window.ProductCard = ProductCard;
}