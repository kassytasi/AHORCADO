<template>
  <div class="categories-neon-container">
    <!-- Efectos de fondo -->
    <div class="neon-grid-bg"></div>
    <div class="neon-scanning"></div>
    <div class="corner-lights">
      <div class="corner neon-pink"></div>
      <div class="corner neon-blue"></div>
      <div class="corner neon-green"></div>
      <div class="corner neon-orange"></div>
    </div>

    <!-- Header NEÓN -->
    <header class="categories-header">
      <div class="header-content">
        <h1 class="main-title neon-pink neon-flicker">
          ⚡ CATEGORIAS ⚡
        </h1>
        <p class="subtitle neon-blue neon-pulse">
          Selecciona tu campo de combate 
        </p>
      </div>
    </header>

    <!-- Grid de categorías NEÓN -->
    <div class="neon-categories-grid">
      <div
        v-for="category in categorias"
        :key="category.id"
        class="neon-category-card"
        :style="{ '--neon-color': category.color }"
        @click="selectCategory(category.id)"
      >
        <div class="card-inner">
          <!-- Icono con efecto neón -->
          <div class="category-icon">
            <div class="icon-glow"></div>
            <div class="icon-content">{{ category.icon }}</div>
          </div>
          
          <!-- Contenido de la categoría -->
          <div class="category-content">
            <h3 class="category-name">{{ category.name }}</h3>
            <p class="category-desc">{{ category.description }}</p>
            
            <div class="category-stats">
              <div class="stat" v-for="stat in category.stats" :key="stat.label">
                <span class="stat-icon">{{ stat.icon }}</span>
                <span class="stat-text">{{ stat.value }} {{ stat.label }}</span>
              </div>
            </div>
          </div>
          
          <!-- Botón de acción -->
          <div class="category-action">
            <span class="action-text neon-pulse">ACTIVAR</span>
            <span class="action-icon">⚡</span>
          </div>
        </div>
        
        <!-- Efectos de borde neón -->
        <div class="card-border"></div>
        <div class="card-glow"></div>
      </div>
    </div>

    <!-- Navegación -->
    <div class="navigation-section">
      <button class="btn-neon btn-neon-purple btn-neon-large" @click="volverInicio">
        <span class="btn-icon">🏠</span>
        <span class="btn-text">VOLVER AL NEXO</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.categories-neon-container {
  min-height: 100vh;
  background: 
    radial-gradient(circle at 20% 30%, rgba(255, 0, 255, 0.15) 0%, transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(0, 255, 255, 0.15) 0%, transparent 40%),
    linear-gradient(45deg, #000000 0%, #050510 30%, #0A0A1A 70%, #000000 100%);
  position: relative;
  overflow-x: hidden;
  padding: 40px 20px;
}

/* Efectos de fondo */
.neon-grid-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(255, 0, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 0, 255, 0.1) 1px, transparent 1px);
  background-size: 60px 60px;
  z-index: 0;
  animation: scanning 30s linear infinite;
}

.neon-scanning {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, 
    transparent, 
    var(--neon-green), 
    var(--neon-blue), 
    var(--neon-pink), 
    transparent);
  animation: scanning 4s linear infinite;
  z-index: 1;
  box-shadow: 0 0 30px var(--neon-green);
}

.corner-lights .corner {
  position: fixed;
  width: 400px;
  height: 400px;
  filter: blur(100px);
  opacity: 0.2;
  z-index: 0;
}

.corner-lights .corner:nth-child(1) { top: 0; left: 0; }
.corner-lights .corner:nth-child(2) { top: 0; right: 0; }
.corner-lights .corner:nth-child(3) { bottom: 0; left: 0; }
.corner-lights .corner:nth-child(4) { bottom: 0; right: 0; }

/* Header */
.categories-header {
  position: relative;
  z-index: 10;
  text-align: center;
  margin-bottom: 60px;
  padding: 40px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  border-radius: var(--border-radius-xl);
  border: 3px solid var(--neon-purple);
  box-shadow: 
    0 0 40px var(--neon-purple-glow),
    inset 0 0 20px rgba(157, 0, 255, 0.2);
}

.main-title {
  font-size: 3.5rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 20px;
  text-shadow: 
    0 0 10px var(--neon-pink-glow),
    0 0 20px var(--neon-pink),
    0 0 30px var(--neon-pink);
}

.subtitle {
  font-size: 1.5rem;
  letter-spacing: 2px;
}

/* Grid de categorías */
.neon-categories-grid {
  position: relative;
  z-index: 10;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 768px) {
  .neon-categories-grid {
    grid-template-columns: 1fr;
  }
}

.neon-category-card {
  position: relative;
  background: rgba(10, 10, 26, 0.7);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius-xl);
  padding: 30px;
  cursor: pointer;
  transition: all var(--transition-normal);
  overflow: hidden;
  border: 3px solid transparent;
}

.neon-category-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, 
    var(--neon-color, var(--neon-pink)), 
    var(--neon-color, var(--neon-blue)));
  transform: scaleX(0);
  transition: transform var(--transition-normal);
}

.neon-category-card:hover::before {
  transform: scaleX(1);
}

.neon-category-card:hover {
  transform: translateY(-10px) scale(1.02);
  border-color: var(--neon-color, var(--neon-pink));
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.8),
    0 0 40px var(--neon-color, rgba(255, 0, 255, 0.3));
}

.card-inner {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

/* Icono de categoría */
.category-icon {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto;
}

.icon-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--neon-color, var(--neon-pink));
  border-radius: 25px;
  filter: blur(20px);
  opacity: 0.5;
  transition: all var(--transition-normal);
}

.neon-category-card:hover .icon-glow {
  opacity: 0.8;
  filter: blur(30px);
}

.icon-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.5rem;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 25px;
  border: 3px solid var(--neon-color, var(--neon-pink));
  transition: all var(--transition-normal);
}

.neon-category-card:hover .icon-content {
  transform: scale(1.1) rotate(10deg);
  border-color: white;
  box-shadow: 
    0 0 30px var(--neon-color, var(--neon-pink-glow)),
    inset 0 0 20px rgba(255, 255, 255, 0.2);
}

/* Contenido de categoría */
.category-content {
  text-align: center;
}

.category-name {
  font-size: 2rem;
  font-weight: 900;
  color: var(--neon-color, var(--neon-pink));
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all var(--transition-normal);
}

.neon-category-card:hover .category-name {
  text-shadow: 
    0 0 10px var(--neon-color, var(--neon-pink-glow)),
    0 0 20px var(--neon-color, var(--neon-pink));
}

.category-desc {
  color: var(--text-muted);
  font-size: 1.1rem;
  line-height: 1.5;
  margin-bottom: 25px;
  min-height: 3em;
}

.category-stats {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.stat {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: var(--border-radius);
  border: 2px solid var(--neon-color, rgba(255, 0, 255, 0.3));
  transition: all var(--transition-normal);
}

.neon-category-card:hover .stat {
  border-color: var(--neon-color, var(--neon-pink));
  background: rgba(255, 255, 255, 0.1);
}

.stat-icon {
  font-size: 1.2rem;
}

.stat-text {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-neon);
}

/* Acción de categoría */
.category-action {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 18px;
  background: linear-gradient(135deg, 
    var(--neon-color, var(--neon-pink)), 
    transparent);
  border-radius: var(--border-radius-lg);
  color: white;
  font-weight: 900;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 10px;
  border: 2px solid var(--neon-color, var(--neon-pink));
  transition: all var(--transition-normal);
}

.neon-category-card:hover .category-action {
  transform: translateY(-5px);
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.8),
    0 0 30px var(--neon-color, var(--neon-pink-glow));
}

.action-icon {
  font-size: 1.4rem;
  animation: neon-pulse 1.5s infinite;
}

/* Efectos de borde y glow */
.card-border {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius-xl);
  border: 3px solid transparent;
  background: linear-gradient(135deg, 
    var(--neon-color, var(--neon-pink)), 
    transparent) border-box;
  -webkit-mask: 
    linear-gradient(#fff 0 0) padding-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity var(--transition-normal);
  pointer-events: none;
}

.neon-category-card:hover .card-border {
  opacity: 1;
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, 
    var(--neon-color, rgba(255, 0, 255, 0.2)) 0%,
    transparent 70%);
  opacity: 0;
  transition: opacity var(--transition-normal);
  pointer-events: none;
}

.neon-category-card:hover .card-glow {
  opacity: 0.6;
}

/* Navegación */
.navigation-section {
  position: relative;
  z-index: 10;
  text-align: center;
  padding-top: 40px;
  border-top: 3px solid var(--neon-purple);
}

/* Responsive */
@media (max-width: 768px) {
  .categories-header {
    padding: 30px 20px;
  }
  
  .main-title {
    font-size: 2.5rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
  }
  
  .neon-category-card {
    padding: 25px;
  }
  
  .category-icon {
    width: 80px;
    height: 80px;
  }
  
  .icon-content {
    font-size: 2.5rem;
  }
  
  .category-name {
    font-size: 1.6rem;
  }
}

@media (max-width: 480px) {
  .categories-neon-container {
    padding: 20px 16px;
  }
  
  .main-title {
    font-size: 2rem;
  }
  
  .category-stats {
    flex-direction: column;
    align-items: center;
  }
  
  .stat {
    width: 100%;
    justify-content: center;
  }
}
</style>

<script setup>
import { useRouter } from "vue-router"

const router = useRouter()

const categorias = [
  {
    id: "frutas",
    name: "FRUTAS EXPLOSIVAS",
    icon: "🍉",
    description: "Dulces y ácidas, perfectas para empezar",
    color: "#FF00FF",
    
  },
  {
    id: "animales",
    name: "FAUNA NEÓN",
    icon: "🦁",
    description: "Criaturas salvajes y domésticas",
    color: "#00FFFF",
   
  },
  {
    id: "paises",
    name: "NACIONES LUMINOSAS",
    icon: "🌍",
    description: "Países de todo el planeta",
    color: "#00FF00",
    
  },
  {
    id: "deportes",
    name: "DEPORTES EXTREMOS",
    icon: "⚽",
    description: "Actividades deportivas y competiciones",
    color: "#FF5500",
  
  },
  {
    id: "peliculas",
    name: "CINE DE LUZ",
    icon: "🎬",
    description: "Películas famosas y clásicas",
    color: "#9D00FF",
  
  },
  {
    id: "ciencia",
    name: "CIENCIA FUTURISTA",
    icon: "🔬",
    description: "Términos científicos y tecnológicos",
    color: "#FFFF00",
    
  }
]

function selectCategory(categoryId) {
  router.push(`/levels?category=${categoryId}`)
}

function volverInicio() {
  router.push('/')
}
</script>




