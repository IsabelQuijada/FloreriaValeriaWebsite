// ===== GALERÍA FUNERARIA CON COMPONENTES REUTILIZABLES =====

// Función para generar productos de una categoría con nombres secuenciales
function generarProductosCategoria({ categoria, nombreBase, descripcion, rutaBase, cantidad, prefijoId = '', extension = 'png' }) {
    const productos = [];
    for (let i = 1; i <= cantidad; i++) {
        productos.push({
            id: `${prefijoId}${i}`,
            name: nombreBase + (cantidad > 1 ? ` ${i}` : ''),
            category: categoria,
            description: descripcion,
            image: `${rutaBase}${i}.${extension}`,
            theme: 'funeral'
        });
    }
    return productos;
}

// Utilidad para contar imágenes en una carpeta (solo para entorno Node o build, no en navegador)
// Aquí, como workaround en el navegador, puedes definir los nombres de archivo manualmente:
const crucesArchivos = [
    'Cruz1.png','Cruz2.png','Cruz3.png','Cruz4.png','Cruz5.png','Cruz6.png','Cruz7.png','Cruz8.png'
];
const cruces = crucesArchivos.map((file, idx) => ({
    id: `cruz-${idx+1}`,
    name: 'Cruz de Crisantemos, Lilis y Rosas ' + (idx+1),
    category: 'cruces',
    description: 'Cruz tradicional con Crisantemos, Lilis, Rosas y Perritos representando amor y respeto hacia el ser querido.',
    image: `./Assets/Funerarias/Cruces/${file}`,
    theme: 'funeral'
}));

const cubreCajaArchivos = [
    'CubreCaja1.png','CubreCaja2.png','CubreCaja3.png','CubreCaja4.png','CubreCaja5.png','CubreCaja7.png'
];
const cubreCaja = cubreCajaArchivos.map((file, idx) => ({
    id: `cubre-caja${idx+1}`,
    name: 'Cobertura Premium ' + (idx+1),
    category: 'cubre-caja',
    description: 'Cobertura de lujo con rosas, liliums y follaje selecto para un último adiós memorable.',
    image: `./Assets/Funerarias/CubreCaja/${file}`,
    theme: 'funeral'
}));

const coronasArchivos = [
    'Corona1.png','Corona2.png','Corona3.png','Corona4.png','Corona5.png','Corona6.png','Corona7.png','Corona8.png','Corona9.png','Corona10.png','Corona11.png','Corona12.png','Corona13.png','Corona14.png','Corona15.png','Corona16.png','Corona17.png','Corona18.png','Corona19.png','Corona20.png','Corona21.png','Corona22.png','Corona23.png','Corona24.png','Corona25.png','Corona26.png','Corona27.png','Corona28.png','Corona29.png','Corona30.png','Corona31.png','Corona32.png'
];
const coronas = coronasArchivos.map((file, idx) => ({
    id: `corona-${idx+1}`,
    name: 'Corona Funeraria ' + (idx+1),
    category: 'coronas',
    description: 'Corona funeraria elaborada con flores frescas y diseño elegante para homenajes y despedidas.',
    image: `./Assets/Funerarias/Coronas/${file}`,
    theme: 'funeral'
}));

// PieDeCaja-Altar está vacío, así que no se generan productos locales
const pieCajaAltar = [];

// Productos únicos con imágenes externas (si los quieres mantener)
const productosEspeciales = [
    {
        id: 'arreglo-altar-rosas',
        name: "Arreglo Altar de Rosas",
        category: "pie-caja-altar",
        description: "Hermoso arreglo para altar con rosas en tonos suaves, perfecto para la ceremonia.",
        price: "2,100",
        image: "https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?w=600&q=80",
        theme: "funeral"
    },
    {
        id: 'composicion-pie-caja',
        name: "Composición Pie de Caja",
        category: "pie-caja-altar",
        description: "Arreglo floral para pie de caja con flores de temporada en tonos pasteles.",
        price: "1,850",
        image: "https://images.unsplash.com/photo-1502472584811-0a2f2feb8968?w=600&q=80",
        theme: "funeral"
    },
    {
        id: 'centro-altar-premium',
        name: "Centro de Altar Premium",
        category: "pie-caja-altar",
        description: "Elegante centro de altar con orquídeas y rosas, para ceremonias especiales.",
        price: "3,450",
        image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=600&q=80",
        theme: "funeral"
    },
    {
        id: 'arreglo-tradicional',
        name: "Arreglo Tradicional",
        category: "pie-caja-altar",
        description: "Arreglo clásico con flores blancas para acompañar momentos de oración.",
        price: "1,690",
        image: "https://images.unsplash.com/photo-1464220696358-d588c9c26ce9?w=600&q=80",
        theme: "funeral"
    }
];

// Unir todos los productos funerarios
const funeralProducts = [
    ...cruces,
    ...cubreCaja,
    ...coronas,
    ...pieCajaAltar,
    ...productosEspeciales
];

// Mapeo de categorías para mostrar nombres amigables
const categoryNames = {
    'cruces': 'Cruces',
    'cubre-caja': 'Cubre Caja',
    'coronas': 'Coronas',
    'pie-caja-altar': 'Pie de Caja - Altar'
};

class FuneralGallery {
    constructor() {
        this.productManager = null;
        this.currentFilter = 'all';
        this.modal = document.getElementById('product-modal');
        this.currentProductIndex = 0;
        this.currentProducts = [];

        // Hacer la instancia accesible globalmente para el ProductManager
        window.funeralGallery = this;

        this.init();
    }

    init() {
        this.setupProductManager();
        this.setupFilterButtons();
        this.setupModal();
        this.setupScrollToTop();
    }

    setupProductManager() {
        // Mostrar loading state
        this.showLoading();
        
        // Crear ProductManager usando el método específico para galerías funerarias
        this.productManager = ProductManager.createFuneralGallery('gallery-grid', funeralProducts);
        
        // Ocultar loading state después de cargar los productos
        setTimeout(() => {
            this.hideLoading();
        }, 500); // Pequeño delay para que se vea la carga
        
        console.log('Galería funeraria inicializada:', this.productManager.getStats());
    }

    setupFilterButtons() {
        const filterButtons = document.querySelectorAll('.filter-btn');

        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Remover clase active de todos los botones
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Agregar clase active al botón clickeado
                e.target.classList.add('active');

                // Obtener categoría y filtrar
                const category = e.target.dataset.category;
                this.filterProducts(category);
            });
        });
    }

    filterProducts(category) {
        this.currentFilter = category;

        // Usar el ProductManager para filtrar
        this.productManager.filterByCategory(category);

        // Scroll suave hacia la galería
        document.getElementById('galeria').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    setupModal() {
        const modalClose = document.getElementById('modal-close');
        const modalOverlay = this.modal;
        const modalPrev = document.getElementById('modal-prev');
        const modalNext = document.getElementById('modal-next');

        // Cerrar modal con botón
        modalClose.addEventListener('click', () => {
            this.closeModal();
        });

        // Cerrar modal clickeando fuera
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                this.closeModal();
            }
        });

        // Cerrar modal con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
            // Navegación con flechas del teclado
            if (this.modal.classList.contains('active')) {
                if (e.key === 'ArrowLeft') {
                    this.showPreviousProduct();
                } else if (e.key === 'ArrowRight') {
                    this.showNextProduct();
                }
            }
        });

        // Navegación con botones
        modalPrev.addEventListener('click', () => {
            this.showPreviousProduct();
        });

        modalNext.addEventListener('click', () => {
            this.showNextProduct();
        });
    }

    openModal(config) {
        // Actualizar lista de productos actuales según el filtro
        this.updateCurrentProducts();

        // Encontrar el índice del producto actual
        this.currentProductIndex = this.currentProducts.findIndex(p => p.id === config.id);

        // Mostrar el producto
        this.showCurrentProduct();

        // Actualizar botones de navegación
        this.updateNavigationButtons();

        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    updateCurrentProducts() {
        if (this.currentFilter === 'all') {
            this.currentProducts = funeralProducts;
        } else {
            this.currentProducts = funeralProducts.filter(product => product.category === this.currentFilter);
        }
    }

    showCurrentProduct() {
        const config = this.currentProducts[this.currentProductIndex];
        if (!config) return;

        const modalImg = document.getElementById('modal-img');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const modalContact = document.getElementById('modal-contact');

        modalImg.src = config.image;
        modalImg.alt = config.name;
        modalTitle.textContent = config.name;
        modalDescription.textContent = config.description;

        modalContact.onclick = () => this.contactProduct(config);
    }

    updateNavigationButtons() {
        const modalPrev = document.getElementById('modal-prev');
        const modalNext = document.getElementById('modal-next');

        modalPrev.disabled = this.currentProductIndex <= 0;
        modalNext.disabled = this.currentProductIndex >= this.currentProducts.length - 1;
    }

    showPreviousProduct() {
        if (this.currentProductIndex > 0) {
            this.currentProductIndex--;
            this.showCurrentProduct();
            this.updateNavigationButtons();
        }
    }

    showNextProduct() {
        if (this.currentProductIndex < this.currentProducts.length - 1) {
            this.currentProductIndex++;
            this.showCurrentProduct();
            this.updateNavigationButtons();
        }
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    contactProduct(config) {
        const message = `Hola, me interesa consultar disponibilidad y precio del arreglo funerario "${config.name}". ¿Podrían darme más información?`;
        const whatsappUrl = `https://wa.me/523335558928?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }
    
    showLoading() {
        const loadingState = document.getElementById('loading-state');
        const galleryGrid = document.getElementById('gallery-grid');
        const emptyState = document.getElementById('empty-state');
        
        if (loadingState) loadingState.style.display = 'block';
        if (galleryGrid) galleryGrid.style.display = 'none';
        if (emptyState) emptyState.style.display = 'none';
    }
    
    hideLoading() {
        const loadingState = document.getElementById('loading-state');
        const galleryGrid = document.getElementById('gallery-grid');
        
        if (loadingState) loadingState.style.display = 'none';
        if (galleryGrid) galleryGrid.style.display = 'grid';
    }

    setupScrollToTop() {
        // Detectar scroll para mostrar/ocultar botón
        let scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '↑';
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #4A4A4A;
            color: white;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 99;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        `;

        document.body.appendChild(scrollToTopBtn);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new FuneralGallery();
});

// Función para manejar cambios de categoría desde enlaces externos
function showCategory(category) {
    const filterBtn = document.querySelector(`[data-category="${category}"]`);
    if (filterBtn) {
        filterBtn.click();
    }
}

// Exportar función para uso desde otros archivos
window.FuneralGallery = { showCategory };
