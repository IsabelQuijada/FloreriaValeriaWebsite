/**
 * ProductManager - Maneja la renderización de múltiples productos
 * 
 * Esta clase se encarga de crear y gestionar colecciones de ProductCard,
 * proporcionando funcionalidades como filtrado, búsqueda y gestión de eventos.
 */

class ProductManager {
    /**
     * @param {Object} config - Configuración del manager
     * @param {string} config.containerId - ID del contenedor donde renderizar
     * @param {Array} config.products - Array de productos
     * @param {string} config.theme - Tema visual por defecto
     * @param {Object} config.globalActions - Acciones globales para todos los productos
     * @param {Object} config.options - Opciones adicionales
     */
    constructor(config) {
        this.containerId = config.containerId;
        this.container = document.getElementById(this.containerId);
        this.products = config.products || [];
        this.productCards = new Map(); // Mapa de ID -> ProductCard
        this.theme = config.theme || 'default';
        this.globalActions = config.globalActions || {};
        this.options = {
            enableLazyLoading: true,
            animationDelay: 100,
            gridColumns: 'auto',
            ...config.options
        };
        
        this.currentFilter = null;
        this.currentSearch = '';
        
        this.init();
    }
    
    /**
     * Inicializa el manager
     */
    init() {
        if (!this.container) {
            console.error(`Container with ID "${this.containerId}" not found`);
            return;
        }
        
        this.setupContainer();
        this.render();
        this.setupGlobalEvents();
    }
    
    /**
     * Configura el contenedor principal
     */
    setupContainer() {
        // Agregar clases CSS al contenedor
        this.container.classList.add('product-grid');
        this.container.classList.add(`product-grid--${this.theme}`);
        
        // Configurar grid columns si se especifica
        if (this.options.gridColumns !== 'auto') {
            this.container.style.gridTemplateColumns = this.options.gridColumns;
        }
        
        // Agregar atributos de accesibilidad
        this.container.setAttribute('role', 'grid');
        this.container.setAttribute('aria-label', 'Productos disponibles');
    }
    
    /**
     * Renderiza todos los productos
     */
    render() {
        this.clear();
        
        const filteredProducts = this.getFilteredProducts();
        
        if (filteredProducts.length === 0) {
            this.showEmptyState();
            return;
        }
        
        filteredProducts.forEach((product, index) => {
            const productCard = this.createProductCard(product, index);
            this.productCards.set(product.id, productCard);
            this.container.appendChild(productCard.render());
        });
        
        this.hideEmptyState();
    }
    
    /**
     * Crea una instancia de ProductCard con configuración específica
     * @param {Object} product - Datos del producto
     * @param {number} index - Índice del producto
     * @returns {ProductCard} Instancia de ProductCard
     */
    createProductCard(product, index = 0) {
        const cardConfig = {
            ...product,
            theme: product.theme || this.theme,
            actions: {
                ...this.globalActions,
                ...product.actions,
                // Envolver las acciones para incluir contexto del manager
                onQuickView: (config, element) => {
                    if (this.globalActions.onQuickView) {
                        this.globalActions.onQuickView(config, element, this);
                    }
                    if (product.actions?.onQuickView) {
                        product.actions.onQuickView(config, element, this);
                    }
                },
                onAddToCart: (config, element) => {
                    if (this.globalActions.onAddToCart) {
                        this.globalActions.onAddToCart(config, element, this);
                    }
                    if (product.actions?.onAddToCart) {
                        product.actions.onAddToCart(config, element, this);
                    }
                },
                onContact: (config, element) => {
                    if (this.globalActions.onContact) {
                        this.globalActions.onContact(config, element, this);
                    }
                    if (product.actions?.onContact) {
                        product.actions.onContact(config, element, this);
                    }
                }
            }
        };
        
        return new ProductCard(cardConfig);
    }
    
    /**
     * Obtiene productos filtrados según criterios actuales
     * @returns {Array} Array de productos filtrados
     */
    getFilteredProducts() {
        let filtered = [...this.products];
        
        // Filtrar por categoría
        if (this.currentFilter && this.currentFilter !== 'all') {
            filtered = filtered.filter(product => 
                product.category === this.currentFilter
            );
        }
        
        // Filtrar por búsqueda
        if (this.currentSearch) {
            const search = this.currentSearch.toLowerCase();
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(search) ||
                product.description.toLowerCase().includes(search) ||
                (product.category && product.category.toLowerCase().includes(search))
            );
        }
        
        return filtered;
    }
    
    /**
     * Limpia el contenedor
     */
    clear() {
        this.container.innerHTML = '';
        this.productCards.clear();
    }
    
    /**
     * Muestra estado vacío
     */
    showEmptyState() {
        const emptyState = document.createElement('div');
        emptyState.className = 'product-grid-empty';
        emptyState.innerHTML = `
            <div class="empty-icon">🌸</div>
            <h3>No se encontraron productos</h3>
            <p>Intenta con otros criterios de búsqueda</p>
        `;
        this.container.appendChild(emptyState);
    }
    
    /**
     * Oculta estado vacío
     */
    hideEmptyState() {
        const emptyState = this.container.querySelector('.product-grid-empty');
        if (emptyState) {
            emptyState.remove();
        }
    }
    
    /**
     * Agrega un nuevo producto
     * @param {Object} product - Datos del producto
     */
    addProduct(product) {
        // Asignar ID si no tiene
        if (!product.id) {
            product.id = 'product_' + Math.random().toString(36).substr(2, 9);
        }
        
        this.products.push(product);
        
        // Si el producto pasa los filtros actuales, renderizarlo
        const filtered = this.getFilteredProducts();
        if (filtered.some(p => p.id === product.id)) {
            const productCard = this.createProductCard(product);
            this.productCards.set(product.id, productCard);
            this.container.appendChild(productCard.render());
            this.hideEmptyState();
        }
    }
    
    /**
     * Elimina un producto por ID
     * @param {string} productId - ID del producto a eliminar
     */
    removeProduct(productId) {
        this.products = this.products.filter(p => p.id !== productId);
        
        const productCard = this.productCards.get(productId);
        if (productCard) {
            productCard.remove();
            this.productCards.delete(productId);
        }
        
        // Mostrar estado vacío si no quedan productos
        if (this.getFilteredProducts().length === 0) {
            this.showEmptyState();
        }
    }
    
    /**
     * Actualiza un producto existente
     * @param {string} productId - ID del producto
     * @param {Object} newData - Nuevos datos del producto
     */
    updateProduct(productId, newData) {
        const productIndex = this.products.findIndex(p => p.id === productId);
        if (productIndex !== -1) {
            this.products[productIndex] = { ...this.products[productIndex], ...newData };
            
            const productCard = this.productCards.get(productId);
            if (productCard) {
                productCard.update(newData);
            }
        }
    }
    
    /**
     * Filtra productos por categoría
     * @param {string} category - Categoría a filtrar ('all' para todas)
     */
    filterByCategory(category) {
        this.currentFilter = category;
        this.render();
    }
    
    /**
     * Busca productos por texto
     * @param {string} searchTerm - Término de búsqueda
     */
    search(searchTerm) {
        this.currentSearch = searchTerm;
        this.render();
    }
    
    /**
     * Obtiene un producto por ID
     * @param {string} productId - ID del producto
     * @returns {Object|null} Datos del producto o null
     */
    getProduct(productId) {
        return this.products.find(p => p.id === productId) || null;
    }
    
    /**
     * Obtiene una instancia de ProductCard por ID
     * @param {string} productId - ID del producto
     * @returns {ProductCard|null} Instancia de ProductCard o null
     */
    getProductCard(productId) {
        return this.productCards.get(productId) || null;
    }
    
    /**
     * Obtiene todas las categorías únicas
     * @returns {Array} Array de categorías
     */
    getCategories() {
        const categories = new Set();
        this.products.forEach(product => {
            if (product.category) {
                categories.add(product.category);
            }
        });
        return Array.from(categories);
    }
    
    /**
     * Configura eventos globales
     */
    setupGlobalEvents() {
        // Evento personalizado cuando se actualiza la lista de productos
        this.container.addEventListener('productUpdate', (event) => {
            const { type, productId, data } = event.detail;
            
            switch (type) {
                case 'add':
                    this.addProduct(data);
                    break;
                case 'remove':
                    this.removeProduct(productId);
                    break;
                case 'update':
                    this.updateProduct(productId, data);
                    break;
            }
        });
    }
    
    /**
     * Destruye el manager y limpia recursos
     */
    destroy() {
        this.clear();
        this.container.removeEventListener('productUpdate', this.handleProductUpdate);
        this.container.classList.remove('product-grid', `product-grid--${this.theme}`);
    }
    
    /**
     * Obtiene estadísticas del manager
     * @returns {Object} Objeto con estadísticas
     */
    getStats() {
        return {
            totalProducts: this.products.length,
            filteredProducts: this.getFilteredProducts().length,
            categories: this.getCategories().length,
            currentFilter: this.currentFilter,
            currentSearch: this.currentSearch
        };
    }
}

// Funciones de utilidad para crear managers comunes

/**
 * Crea un ProductManager configurado para productos de florería
 * @param {string} containerId - ID del contenedor
 * @param {Array} products - Array de productos
 * @returns {ProductManager} Instancia configurada
 */
ProductManager.createFlowerShop = function(containerId, products) {
    return new ProductManager({
        containerId: containerId,
        products: products,
        theme: 'default',
        globalActions: {
            onQuickView: (config, element, manager) => {
                // Implementación por defecto para vista rápida
                console.log('Vista rápida:', config.name);
            },
            onAddToCart: (config, element, manager) => {
                // Implementación por defecto para agregar al carrito
                const message = `Hola, me interesa el producto "${config.name}" - $${config.price}`;
                const whatsappUrl = `https://wa.me/523335558928?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            }
        }
    });
};

/**
 * Crea un ProductManager configurado para productos funerarios
 * @param {string} containerId - ID del contenedor
 * @param {Array} products - Array de productos
 * @returns {ProductManager} Instancia configurada
 */
ProductManager.createFuneralGallery = function(containerId, products) {
    return new ProductManager({
        containerId: containerId,
        products: products,
        theme: 'funeral',
        globalActions: {
            onQuickView: (config, element, manager) => {
                // Buscar la instancia de FuneralGallery y abrir el modal
                if (window.funeralGallery && window.funeralGallery.openModal) {
                    window.funeralGallery.openModal(config);
                }
            },
            onContact: (config, element, manager) => {
                const message = `Hola, necesito información sobre "${config.name}" (${config.category})`;
                const whatsappUrl = `https://wa.me/523335558928?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            }
        }
    });
};

// Exportar para uso modular
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductManager;
} else {
    window.ProductManager = ProductManager;
}