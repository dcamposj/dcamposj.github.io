
window.onload = () => {
  lucide.createIcons();
  initApp();
};

const mockLinks = [
  {
    title_es: 'El Futuro de la IA y el Aprendizaje Profundo',
    title_en: 'The Future of AI and Deep Learning',
    url: 'https://page-x.com/ia',
    previewImage: 'https://placehold.co/1200x800/22c55e/ffffff/webp?text=AI+Future'
  },
  {
    title_es: 'Tendencias en Diseño Web Responsivo 2025',
    title_en: 'Responsive Web Design Trends 2025',
    url: 'https://page-x.com/diseno',
    previewImage: 'https://placehold.co/1200x800/3b82f6/ffffff/webp?text=Web+Design'
  },
  {
    title_es: 'Guía Completa de la Arquitectura de Software',
    title_en: 'Complete Guide to Software Architecture',
    url: 'https://page-x.com/arquitectura',
    previewImage: 'https://placehold.co/1200x800/f97316/ffffff/webp?text=Architecture+Guide'
  },
  {
    title_es: 'Recetas Veganas para Principiantes',
    title_en: 'Vegan Recipes for Beginners',
    url: 'https://page-x.com/recetas',
    previewImage: 'https://placehold.co/1200x800/ef4444/ffffff/webp?text=Vegan+Recipes'
  },
  {
    title_es: 'Historia de la Programación Funcional',
    title_en: 'History of Functional Programming',
    url: 'https://page-x.com/funcional',
    previewImage: 'https://placehold.co/1200x800/a855f7/ffffff/webp?text=Functional+History'
  }
];

// Diccionario de Traducciones de la Interfaz Fija
const translations = {
  es: {
    app_title: 'Galería de Diapositivas Parallax',
    header_title: 'Galería Parallax',
    header_subtitle: 'Explora las previsualizaciones. Mueve el ratón para el efecto Parallax.',
    link_text: 'Ir al Enlace',
    prev_text: 'Anterior',
    next_text: 'Siguiente',
    footer_text: 'Efecto de galería con imágenes simuladas y Parallax dinámico.',
    lang_button: 'English',
    counter_prefix: 'Diapositiva',
    counter_connector: 'de'
  },
  en: {
    app_title: 'Parallax Slideshow Gallery',
    header_title: 'Parallax Gallery',
    header_subtitle: 'Explore previews. Move your mouse for the Parallax effect.',
    link_text: 'Go to Link',
    prev_text: 'Previous',
    next_text: 'Next',
    footer_text: 'Gallery effect with simulated images and dynamic Parallax.',
    lang_button: 'Español',
    counter_prefix: 'Slide',
    counter_connector: 'of'
  }
};


// --- 4. Estado y Elementos del DOM ---
let currentSlideIndex = 0; // Índice de la diapositiva actual
let currentLang = 'es'; // Idioma actual (por defecto español)

const parallaxImage = document.getElementById('parallax-image');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const slideTitle = document.getElementById('slide-title');
const slideUrl = document.getElementById('slide-url');
const slideLink = document.getElementById('slide-link');
const slideCounter = document.getElementById('slide-counter');
const langToggleBtn = document.getElementById('lang-toggle');
const langTextSpan = document.getElementById('lang-text');


const MAX_OFFSET = 20; // Máximo desplazamiento para el efecto parallax

// --- 5. Lógica del Parallax ---

/**
 * Maneja el evento mousemove para aplicar el efecto parallax.
 * Se asegura que el efecto sea responsivo a las dimensiones de la ventana.
 */
function handleParallax(e) {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // Normaliza la posición del ratón de -1 a 1
  const diffX = (mouseX - centerX) / centerX;
  const diffY = (mouseY - centerY) / centerY;

  // Mueve la imagen en dirección opuesta al ratón (efecto Parallax)
  const offsetX = diffX * MAX_OFFSET * -1;
  const offsetY = diffY * MAX_OFFSET * -1;

  parallaxImage.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
}

// --- 6. Lógica de la Galería de Diapositivas ---

/**
 * Aplica las traducciones a los elementos fijos de la interfaz.
 */
function applyTranslations(lang) {
  const t = translations[lang];

  // Textos de la Interfaz Fija
  document.getElementById('app-title-tag').textContent = t.app_title;
  document.getElementById('header-title').textContent = t.header_title;
  document.getElementById('header-subtitle').textContent = t.header_subtitle;
  document.getElementById('link-text').textContent = t.link_text;
  document.getElementById('prev-text').textContent = t.prev_text;
  document.getElementById('next-text').textContent = t.next_text;
  document.getElementById('footer-text').textContent = t.footer_text;
  langTextSpan.textContent = t.lang_button;

  // Re-renderizar la diapositiva para actualizar el título variable
  displaySlide(currentSlideIndex);
}

/**
 * Cambia el idioma de la aplicación.
 */
function toggleLanguage() {
  currentLang = (currentLang === 'es' ? 'en' : 'es');
  applyTranslations(currentLang);
}

/**
 * Muestra una diapositiva específica.
 * @param {number} index El índice de la diapositiva a mostrar.
 */
function displaySlide(index) {
  currentSlideIndex = index;
  const slideData = mockLinks[index];
  const langKey = currentLang;
  const t = translations[langKey];

  // 1. Actualizar imagen Parallax
  parallaxImage.style.backgroundImage = `url('${slideData.previewImage}')`;

  // 2. Actualizar texto de la diapositiva (título traducido)
  slideTitle.textContent = slideData[`title_${langKey}`];
  slideUrl.textContent = slideData.url;
  slideLink.href = slideData.url;

  // 3. Actualizar contador traducido
  slideCounter.textContent = `${t.counter_prefix} ${currentSlideIndex + 1} ${t.counter_connector} ${mockLinks.length}`;

  // 4. Habilitar/deshabilitar botones de navegación
  prevBtn.disabled = (currentSlideIndex === 0);
  nextBtn.disabled = (currentSlideIndex === mockLinks.length - 1);
}

/**
 * Navega a la diapositiva anterior.
 */
function prevSlide() {
  if (currentSlideIndex > 0) {
    displaySlide(currentSlideIndex - 1);
  }
}

/**
 * Navega a la diapositiva siguiente.
 */
function nextSlide() {
  if (currentSlideIndex < mockLinks.length - 1) {
    displaySlide(currentSlideIndex + 1);
  }
}

function initApp() {
  // Aplicar el idioma por defecto (español)
  applyTranslations(currentLang);

  // Mostrar la primera diapositiva
  displaySlide(currentSlideIndex);

  // Añadir listeners a los botones
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  langToggleBtn.addEventListener('click', toggleLanguage);

  // Añadir el listener de movimiento del ratón para el efecto parallax
  document.addEventListener('mousemove', handleParallax);

  // Listener para el redimensionamiento de la ventana para asegurar la responsividad
  window.addEventListener('resize', () => {
    // Forzar el recálculo del Parallax si el ratón está quieto después de redimensionar
    // Esto asegura que la imagen no se salga de los límites después de un cambio de orientación o tamaño.
    handleParallax({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 });
  });
}
