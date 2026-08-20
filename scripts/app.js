const urls = [
  {name: "treemap", url: "https://codepen.io/diego_caji/full/bGPREzy", image: "./resources/treemapdiagram.png"},
  {name: "choropleth", url: "https://codepen.io/diego_caji/full/MWRLyVa", image: "./resources/choropleth.png"},
  {name: "heatmap", url: "https://codepen.io/diego_caji/full/OJGjXMj", image: "./resources/heatmap.png"},
  {name: "scatterplot", url: "https://codepen.io/diego_caji/full/yLrBPbg", image: "./resources/scatterplotgraph.png"},
  {name: "barchart", url: "https://codepen.io/diego_caji/full/eYXaGmg", image: "./resources/barchart.png"},
  {name: "clock255", url: "https://codepen.io/diego_caji/full/XWGEGPJ", image: "./resources/clock255.png"},
  {name: "calculator", url: "https://codepen.io/diego_caji/full/BabBRPd", image: "./resources/calculadora.png"},
  {name: "drumkit", url: "https://codepen.io/diego_caji/full/eYxwLBy", image: "./resources/drumkit.png"},
  {name: "markup", url: "https://codepen.io/diego_caji/full/mdvgBVX", image: "./resources/markuptranslator.png"},
  /*{name: "imgview", url: "https://codepen.io/diego_caji/full/ZYOojVK", image: "./resources/imgview.png"}*/
];

const projectsGrid = document.getElementById('projects-grid');

// Create project card HTML
function createProjectCard(project) {
    const card = document.createElement('a');
    card.href = project.url;
    card.target = '_blank';
    card.className = 'project-card loading';
    
    card.innerHTML = `
        <div class="project-image-container">
            <img 
                src="${project.image}" 
                alt="${project.name}" 
                class="project-image"
                onload="this.closest('.project-card').classList.remove('loading')"
                onerror="this.closest('.project-card').classList.add('error')"
            >
            <div class="project-overlay">
                <span class="view-button">
                    <i data-lucide="external-link" class="w-4 h-4"></i>
                    View Project
                </span>
            </div>
            <div class="project-title">
                <h3>${project.name}</h3>
            </div>
        </div>
    `;
    
    return card;
}

// Render all projects to the grid
function renderProjects() {
    projectsGrid.innerHTML = '';
    
    urls.forEach((project, index) => {
        const card = createProjectCard(project);
        card.style.animationDelay = `${index * 0.1}s`;
        projectsGrid.appendChild(card);
    });
    
    // Initialize Lucide icons for the newly created elements
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons({ attrs: { width: 16, height: 16 } });
    }
}

// Email button functionality
const emailButton = document.getElementById('email-button');
if (emailButton) {
    emailButton.addEventListener('click', () => {
        window.location.href = 'mailto:diego@example.com';
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    
    // Initialize Lucide icons for the email button
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons({ attrs: { width: 20, height: 20 } });
    }
});