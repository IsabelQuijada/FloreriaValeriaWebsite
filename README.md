# Florería Valeria Website

Sitio web elegante para florería con diseño inspirado en Melrose.mx, desarrollado con **HTML, CSS y JavaScript vanilla** - sin dependencias ni frameworks.

## ✨ Características

- **Diseño Elegante**: Inspirado en Melrose.mx con paleta de colores rosados y blancos
- **HTML/CSS Puro**: Sin frameworks, sin dependencias, hosting simple
- **Responsive Design**: Totalmente adaptable a dispositivos móviles y desktop  
- **Animaciones Suaves**: Transiciones y efectos visuales elegantes
- **JavaScript Vanilla**: Funcionalidad interactiva sin librerías externas

## 🚀 Instalación y Uso

### Opción 1: Servidor Local Simple
```bash
# Usando Python
python3 -m http.server 8000

# Usando PHP  
php -S localhost:8000

# Usando Node.js (si lo tienes instalado)
npx serve .
```

### Opción 2: Abrir Directamente
Simplemente abre el archivo `index.html` en tu navegador.

### Opción 3: Hosting Web
Sube los archivos a cualquier servidor web (GitHub Pages, Netlify, Vercel, etc.)

## 🎨 Paleta de Colores

- **Primary Pink**: `#f5d9e0`
- **Dark Pink**: `#e8b4c8` 
- **Accent Pink**: `#d5a6bd`
- **Soft White**: `#fdfcfc`
- **Cream**: `#f9f7f4`
- **Text Dark**: `#2c2c2c`
- **Text Gray**: `#6b6b6b`

## 📁 Estructura del Proyecto

```
FloreriaValeriaWebsite/
├── index.html          # Página principal con todo el contenido
├── styles.css          # Todos los estilos CSS unificados  
├── script.js           # Funcionalidad JavaScript
├── README.md           # Documentación
└── .gitignore         # Archivos ignorados por Git
```

## 🔧 Secciones del Sitio

### Header
- Navegación principal con scroll suave
- Información de contacto (teléfono y WhatsApp)
- Menú hamburguesa responsive
- Iconos de búsqueda y carrito

### Hero Section
- Banner principal con gradiente elegante
- Call-to-action prominente
- Animación de scroll indicator
- Botones de navegación

### Products Section  
- Grid responsive de productos destacados
- Efectos hover en imágenes
- Overlay con botón de vista rápida
- Información de precios y botones de compra

### Categories Section
- Cards de ocasiones especiales
- Efectos de hover con cambio de overlay
- Navegación por categorías temáticas

### Footer
- Call-to-action final con gradiente
- Enlaces informativos organizados  
- Newsletter con formulario funcional
- Botones de contacto directo (WhatsApp y teléfono)
- Enlaces a redes sociales

## ⚡ Funcionalidades JavaScript

- **Menú móvil**: Toggle y navegación responsive
- **Smooth scrolling**: Navegación suave entre secciones
- **Formulario newsletter**: Validación y confirmación
- **Botones interactivos**: Alerts y navegación
- **Animaciones al scroll**: Intersection Observer API
- **Funciones de carrito**: Base para e-commerce

## 🛠️ Tecnologías

- **HTML5**: Estructura semántica moderna
- **CSS3**: Variables, Grid, Flexbox, animaciones
- **JavaScript ES6+**: Vanilla sin dependencias
- **Responsive Design**: Mobile-first approach

## � Configuración de Contacto

Para personalizar los números de contacto:

1. **WhatsApp**: Busca `wa.me/5255555555` y reemplaza por tu número
2. **Teléfono**: Busca `tel:5555555555` y reemplaza por tu número
3. **Header**: En la sección `.header-top`
4. **Footer**: En la sección `.contact-buttons`

## 🎨 Personalización

### Cambiar Colores
Modifica las variables CSS en la parte superior de `styles.css`:
```css
:root {
  --primary-pink: #tuColor;
  --accent-pink: #tuColor;
  /* etc... */
}
```

### Cambiar Contenido
- **Textos**: Edita directamente en `index.html`
- **Imágenes**: Reemplaza las URLs de Unsplash 
- **Enlaces**: Actualiza los `href` en navegación y botones

### Añadir Funcionalidad
Modifica `script.js` para agregar:
- Integración con carrito de compras
- Conexión con API de productos
- Sistemas de pago
- Formularios de contacto

## 🌐 Deploy

### GitHub Pages
1. Push a tu repositorio de GitHub
2. Ve a Settings > Pages
3. Selecciona branch `main`
4. Tu sitio estará en `https://usuario.github.io/repo-name`

### Netlify
1. Arrastra la carpeta a netlify.com/drop
2. ¡Listo!

### Otros Hostings
Sube los archivos por FTP o panel de control.

## � Licencia

Template libre para uso personal o comercial. No se requiere atribución.
