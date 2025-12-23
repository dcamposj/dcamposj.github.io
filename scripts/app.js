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

const title = document.getElementById('project-title');
const image = document.getElementById('project-image');
const link = document.getElementById('project-link');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');

// Función para actualizar la interfaz
function updateGallery(index) {
    const project = urls[index];
    title.textContent = project.name.toUpperCase();
    image.src = project.image;
    image.alt = `Preview de ${project.name}`;
    link.href = project.url;
}

// Eventos de los botones
nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= urls.length) {
        currentIndex = 0; // Vuelve al inicio (Loop)
    }
    updateGallery(currentIndex);
});

prevBtn.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = urls.length - 1; // Vuelve al final
    }
    updateGallery(currentIndex);
});

// Inicializar la galería al cargar la página
updateGallery(currentIndex);

// Render lucide icons (replace elements with inline SVGs)
if (window.lucide && typeof window.lucide.createIcons === 'function') {
  window.lucide.createIcons({ attrs: { width: 20, height: 20 } });
}