# Sistema de Componentes ProductCard - Documentación

## Introducción

Este sistema proporciona componentes reutilizables para crear tarjetas de producto dinámicamente en tu sitio web. Incluye dos clases principales:

- **ProductCard**: Componente individual para una tarjeta de producto
- **ProductManager**: Gestor que maneja múltiples ProductCards y proporciona funcionalidades como filtrado y búsqueda

## Instalación y Configuración

### 1. Incluir archivos CSS y JavaScript

```html
<!-- En el <head> de tu HTML -->
<link rel="stylesheet" href="./components/ProductCard.css">

<!-- Antes del cierre de </body> -->
<script src="./components/ProductCard.js"></script>
<script src="./components/ProductManager.js"></script>
```

### 2. HTML básico requerido

```html
<!-- Contenedor para las tarjetas -->
<div class="products-grid" id="my-products-container">
    <!-- Las tarjetas se generarán dinámicamente aquí -->
</div>
```

## Uso de ProductCard

### Crear una tarjeta individual

```javascript
// Configuración del producto
const productConfig = {
    id: 'producto-1',
    name: 'Ramo de Rosas',
    description: 'Hermoso ramo de rosas rojas',
    image: 'https://example.com/imagen.jpg',
    price: '899',
    category: 'ramos',
    theme: 'default', // 'default' o 'funeral'
    actions: {
        onQuickView: (config, element) => {
            console.log('Vista rápida:', config.name);
        },
        onAddToCart: (config, element) => {
            console.log('Agregando al carrito:', config.name);
        }
    }
};

// Crear y renderizar la tarjeta
const productCard = new ProductCard(productConfig);
const cardElement = productCard.render();

// Agregar al DOM
document.getElementById('mi-contenedor').appendChild(cardElement);
```

### Propiedades de configuración

| Propiedad | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `id` | String | No | ID único del producto (se genera automáticamente si no se proporciona) |
| `name` | String | Sí | Nombre del producto |
| `description` | String | No | Descripción del producto |
| `image` | String | No | URL de la imagen (usa placeholder si no se proporciona) |
| `price` | String | No | Precio del producto |
| `category` | String | No | Categoría del producto |
| `theme` | String | No | Tema visual: 'default' o 'funeral' |
| `altText` | String | No | Texto alternativo para la imagen |
| `actions` | Object | No | Callbacks para eventos |
| `customStyles` | Object | No | Estilos CSS personalizados |

### Callbacks de acciones

```javascript
const actions = {
    // Vista rápida del producto
    onQuickView: (config, element, manager) => {
        // config: configuración del producto
        // element: elemento DOM de la tarjeta
        // manager: instancia de ProductManager (si aplica)
        console.log('Vista rápida para:', config.name);
    },
    
    // Agregar al carrito/comprar
    onAddToCart: (config, element, manager) => {
        const message = `Hola, me interesa ${config.name}`;
        window.open(`https://wa.me/123456789?text=${encodeURIComponent(message)}`);
    },
    
    // Contacto personalizado
    onContact: (config, element, manager) => {
        alert(`Contactando sobre ${config.name}`);
    },
    
    // Click general en la tarjeta
    onClick: (config, element, manager) => {
        console.log('Tarjeta clickeada:', config.name);
    }
};
```

## Uso de ProductManager

### Configuración básica

```javascript
// Array de productos
const productos = [
    {
        id: 'producto-1',
        name: 'Ramo de Rosas',
        description: 'Hermoso ramo de rosas rojas',
        image: 'https://example.com/rosas.jpg',
        price: '899',
        category: 'ramos'
    },
    {
        id: 'producto-2',
        name: 'Arreglo Primaveral',
        description: 'Flores mixtas de temporada',
        image: 'https://example.com/primavera.jpg',
        price: '1299',
        category: 'arreglos'
    }
    // ... más productos
];

// Crear ProductManager
const productManager = new ProductManager({
    containerId: 'products-grid', // ID del contenedor
    products: productos,
    theme: 'default',
    globalActions: {
        onAddToCart: (config, element, manager) => {
            // Acción global para todos los productos
            console.log('Comprando:', config.name);
        }
    }
});
```

### Métodos útiles de ProductManager

```javascript
// Filtrar por categoría
productManager.filterByCategory('ramos');

// Buscar productos
productManager.search('rosa');

// Agregar nuevo producto
productManager.addProduct({
    id: 'nuevo-producto',
    name: 'Nuevo Ramo',
    description: 'Descripción del nuevo ramo',
    price: '999'
});

// Eliminar producto
productManager.removeProduct('producto-1');

// Actualizar producto existente
productManager.updateProduct('producto-2', {
    price: '1199',
    description: 'Nueva descripción'
});

// Obtener estadísticas
console.log(productManager.getStats());
// { totalProducts: 5, filteredProducts: 3, categories: 2, ... }
```

### Métodos de conveniencia

```javascript
// Para florería general
const flowerManager = ProductManager.createFlowerShop('container-id', productos);

// Para galería funeraria
const funeralManager = ProductManager.createFuneralGallery('container-id', productos);
```

## Ejemplos Prácticos

### 1. Galería de Productos con Filtros

```html
<!-- HTML -->
<div class="filter-buttons">
    <button onclick="filterProducts('all')">Todos</button>
    <button onclick="filterProducts('ramos')">Ramos</button>
    <button onclick="filterProducts('arreglos')">Arreglos</button>
</div>

<div id="products-container"></div>
```

```javascript
// JavaScript
let productManager;

// Inicializar productos
document.addEventListener('DOMContentLoaded', () => {
    productManager = new ProductManager({
        containerId: 'products-container',
        products: misProductos,
        globalActions: {
            onAddToCart: (config) => {
                // Ir a WhatsApp
                const message = `Hola, quiero comprar: ${config.name} - $${config.price}`;
                const url = `https://wa.me/tu-numero?text=${encodeURIComponent(message)}`;
                window.open(url, '_blank');
            }
        }
    });
});

// Función de filtrado
function filterProducts(category) {
    productManager.filterByCategory(category);
}
```

### 2. Búsqueda en Tiempo Real

```html
<input type="text" id="search-input" placeholder="Buscar productos...">
<div id="search-results"></div>
```

```javascript
const searchInput = document.getElementById('search-input');
const searchManager = new ProductManager({
    containerId: 'search-results',
    products: todosLosProductos
});

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value;
    searchManager.search(searchTerm);
});
```

### 3. Modal de Vista Rápida

```javascript
function createQuickViewModal(config) {
    // Crear modal personalizado
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <img src="${config.image}" alt="${config.name}">
            <h2>${config.name}</h2>
            <p>${config.description}</p>
            <div class="price">$${config.price}</div>
            <button onclick="comprarProducto('${config.id}')">Comprar</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    // Cerrar modal
    modal.querySelector('.close').onclick = () => {
        document.body.removeChild(modal);
    };
}

// Usar en ProductManager
const manager = new ProductManager({
    containerId: 'products',
    products: productos,
    globalActions: {
        onQuickView: (config) => {
            createQuickViewModal(config);
        }
    }
});
```

## Personalización de Estilos

### Temas disponibles

```javascript
// Tema por defecto (florería general)
{ theme: 'default' }

// Tema funerario (colores más sobrios)
{ theme: 'funeral' }
```

### Estilos personalizados por producto

```javascript
const producto = {
    name: 'Producto Especial',
    customStyles: {
        backgroundColor: '#f0f8ff',
        border: '2px solid #4169e1',
        borderRadius: '16px'
    }
};
```

### CSS personalizado

```css
/* Sobrescribir estilos del tema */
.product-card--mi-tema {
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
}

.product-card--mi-tema .product-name {
    color: white;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}
```

## Eventos y Hooks

### Eventos personalizados

```javascript
// Escuchar eventos del ProductManager
container.addEventListener('productUpdate', (event) => {
    const { type, productId, data } = event.detail;
    console.log(`Producto ${type}:`, productId, data);
});

// Disparar evento personalizado
const event = new CustomEvent('productUpdate', {
    detail: {
        type: 'add',
        productId: 'nuevo-id',
        data: nuevoProducto
    }
});
container.dispatchEvent(event);
```

## Integración con Frameworks

### Vanilla JavaScript
```javascript
// Ya está listo para usar directamente
```

### Con sistemas de módulos
```javascript
import { ProductCard, ProductManager } from './components/ProductCard.js';
```

## Mejores Prácticas

1. **IDs únicos**: Siempre usa IDs únicos para cada producto
2. **Imágenes optimizadas**: Usa imágenes con tamaños apropiados (recomendado: 600x400px)
3. **Lazy loading**: El componente incluye lazy loading automático para las imágenes
4. **Accesibilidad**: Incluye textos alternativos descriptivos para las imágenes
5. **Performance**: Para listas grandes, considera implementar paginación
6. **Responsive**: Los componentes son responsive por defecto
7. **SEO**: Para mejor SEO, considera renderizar el contenido inicial en el servidor

## Troubleshooting

### Problema: Las tarjetas no se muestran
```javascript
// Verificar que el contenedor existe
const container = document.getElementById('mi-contenedor');
if (!container) {
    console.error('Contenedor no encontrado');
}

// Verificar que los scripts están cargados
if (typeof ProductCard === 'undefined') {
    console.error('ProductCard no está cargado');
}
```

### Problema: Estilos no se aplican
```html
<!-- Verificar que el CSS está incluido -->
<link rel="stylesheet" href="./components/ProductCard.css">
```

### Problema: Imágenes no cargan
```javascript
// Verificar URLs de imágenes
const producto = {
    image: 'https://ejemplo.com/imagen.jpg', // URL completa
    // o ruta relativa
    image: './assets/productos/imagen.jpg'
};
```

## Soporte y Contribuciones

Este sistema de componentes está diseñado para ser extensible y fácil de mantener. Puedes:

1. Extender las clases base para funcionalidades específicas
2. Agregar nuevos temas creando archivos CSS adicionales
3. Implementar nuevos tipos de acciones en los callbacks
4. Crear componentes derivados para casos de uso específicos

¿Preguntas o necesitas ayuda? Revisa los ejemplos incluidos en el proyecto o consulta el código fuente documentado.