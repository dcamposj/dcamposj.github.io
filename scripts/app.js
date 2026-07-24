const urls = [
  {name: "treemap", url: "https://codepen.io/diego_caji/full/bGPREzy", image: "./resources/treemapdiagram.png"},
  {name: "choropleth", url: "https://codepen.io/diego_caji/full/MWRLyVa", image: "./resources/choropleth.png"},
  {name: "heatmap", url: "https://codepen.io/diego_caji/full/OJGjXMj", image: "./resources/heatmap.png"},
  {name: "scatterplot", url: "https://codepen.io/diego_caji/full/yLrBPbg", image: "./resources/scatterplotgraph.png"},
  {name: "barchart", url: "https://codepen.io/diego_caji/full/eYXaGmg", image: "./resources/barchart.png"},
  {name: "clock255", url: "https://codepen.io/diego_caji/full/XWGEGPJ", image: "./resources/clock255.png"},
  {name: "calculator", url: "https://codepen.io/diego_caji/full/BabBRPd", image: "./resources/calculadora.png"},
  {name: "drumkit", url: "https://codepen.io/diego_caji/full/eYxwLBy", image: "./resources/drumkit.png"},
  {name: "markup", url: "https://codepen.io/diego_caji/full/mdvgBVX", image: "./resources/markuptranslator.png"}
];

let currentIndex = 0;
let autoPlayInterval;
const autoPlayDelay = 5000; // 5 seconds

const title = document.getElementById('project-title');
const image = document.getElementById('project-image');
const link = document.getElementById('project-link');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const indicatorsContainer = document.getElementById('project-indicators');

// Create project indicators
function createIndicators() {
    indicatorsContainer.innerHTML = '';
    urls.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'project-indicator';
        indicator.addEventListener('click', () => {
            goToProject(index);
        });
        indicatorsContainer.appendChild(indicator);
    });
    updateIndicators();
}

// Update indicators to show active project
function updateIndicators() {
    const indicators = indicatorsContainer.querySelectorAll('.project-indicator');
    indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Trigger animation on title and image
function triggerAnimations() {
    title.style.animation = 'none';
    image.style.animation = 'none';
    
    // Force reflow
    void title.offsetWidth;
    void image.offsetWidth;
    
    title.style.animation = 'titleChange 0.4s ease-out';
    image.style.animation = 'imageFade 0.5s ease-out';
}

// Go to specific project
function goToProject(index) {
    currentIndex = index;
    updateGallery(currentIndex);
    resetAutoPlay();
}

// Función para actualizar la interfaz
function updateGallery(index) {
    const project = urls[index];
    title.textContent = project.name.toUpperCase();
    image.src = project.image;
    image.alt = `Preview de ${project.name}`;
    link.href = project.url;
    updateIndicators();
    triggerAnimations();
}

// Auto-play functionality
function startAutoPlay() {
    stopAutoPlay(); // Clear any existing interval first
    autoPlayInterval = setInterval(() => {
        currentIndex++;
        if (currentIndex >= urls.length) {
            currentIndex = 0;
        }
        updateGallery(currentIndex);
    }, autoPlayDelay);
}

function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
}

// Eventos de los botones
nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= urls.length) {
        currentIndex = 0; // Vuelve al inicio (Loop)
    }
    updateGallery(currentIndex);
    resetAutoPlay();
});

prevBtn.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = urls.length - 1; // Vuelve al final
    }
    updateGallery(currentIndex);
    resetAutoPlay();
});

// Pause auto-play on hover over the gallery card
document.querySelector('.gallery-card').addEventListener('mouseenter', stopAutoPlay);
document.querySelector('.gallery-card').addEventListener('mouseleave', startAutoPlay);

// Inicializar la galería al cargar la página
createIndicators();
updateGallery(currentIndex);
startAutoPlay();

// Render lucide icons (replace elements with inline SVGs)
if (window.lucide && typeof window.lucide.createIcons === 'function') {
  window.lucide.createIcons({ attrs: { width: 20, height: 20 } });
}