<template>
  <div class="levels-container">
    <!-- Header con información de categoría -->
    <header class="page-header">
      <button class="back-btn" @click="volverCategorias">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Volver
      </button>
      <div class="header-info">
        <div class="category-badge">
          <span class="category-icon">{{ currentCategory.icon }}</span>
          <span class="category-name">{{ currentCategory.name }}</span>
        </div>
      </div>
      <div class="header-actions">
        <button class="action-btn" @click="mostrarRecomendacion" title="Recomendación">
          💡
        </button>
      </div>
    </header>

    <!-- Información del nivel -->
    <div class="level-info">
      <h1>🎮 Escoge tu Desafío</h1>
      <p class="subtitle">Selecciona un nivel de dificultad para {{ currentCategory.name.toLowerCase() }}</p>
      
      <div class="difficulty-info">
        <div class="info-card">
          <div class="info-icon">📊</div>
          <div class="info-content">
            <h4>Estadísticas</h4>
            <p>{{ currentCategory.words }} palabras disponibles</p>
          </div>
        </div>
        <div class="info-card">
          <div class="info-icon">🎯</div>
          <div class="info-content">
            <h4>Tu Progreso</h4>
            <p>{{ nivelCompletado }}/3 niveles dominados</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Niveles de dificultad -->
    <div class="levels-grid">
      <div
        v-for="level in niveles"
        :key="level.id"
        class="level-card"
        :class="[`level-${level.id}`, { 'recommended': level.recommended }]"
        @click="selectLevel(level.id)"
        @mouseenter="hoveredLevel = level.id"
        @mouseleave="hoveredLevel = null"
      >
        <div class="level-header">
          <div class="level-icon">{{ level.icon }}</div>
          <div class="level-badge" v-if="level.recommended">Recomendado</div>
        </div>
        
        <div class="level-content">
          <h3>{{ level.name }}</h3>
          <p class="level-description">{{ level.description }}</p>
          
          <div class="level-stats">
            <div class="stat">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <span>{{ level.time }} min aprox.</span>
            </div>
            <div class="stat">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M4 12H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M12 4V20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <span>{{ level.letters }}-{{ level.letters + 2 }} letras</span>
            </div>
          </div>
          
          <div class="level-requirements">
            <div class="requirement">
              <span class="req-icon">💖</span>
              <span class="req-text">{{ level.lives }} vidas</span>
            </div>
            <div class="requirement">
              <span class="req-icon">🎯</span>
              <span class="req-text">{{ level.accuracy }}% acierto</span>
            </div>
          </div>
        </div>
        
        <div class="level-footer">
          <button class="level-select-btn">
            <span>Seleccionar</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M12 5L19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        
        <div class="level-glow"></div>
      </div>
    </div>

    <!-- Información de dificultad -->
    <div class="difficulty-help">
      <div class="help-card">
        <h4>📈 ¿Cómo elegir?</h4>
        <p>Selecciona según tu experiencia:</p>
        <ul class="help-list">
          <li><strong>Fácil:</strong> Ideal para principiantes o jugadores casuales</li>
          <li><strong>Medio:</strong> Para quienes buscan un buen desafío</li>
          <li><strong>Difícil:</strong> Solo para expertos en el juego</li>
        </ul>
      </div>
    </div>

    <!-- Modal de recomendación -->
    <transition name="modal">
      <div v-if="mostrarModal" class="modal-overlay" @click.self="mostrarModal = false">
        <div class="modal-content">
          <div class="modal-header">
            <h2>💡 Recomendación de Nivel</h2>
            <button class="modal-close" @click="mostrarModal = false">×</button>
          </div>
          <div class="modal-body">
            <div class="recommendation-content">
              <div class="recommendation-icon">✨</div>
              <h3>Nivel Recomendado: {{ nivelRecomendado.name }}</h3>
              <p class="recommendation-reason">
                Basado en tu historial de juego y la categoría seleccionada, 
                este nivel te ofrecerá el equilibrio perfecto entre desafío y diversión.
              </p>
              <div class="recommendation-stats">
                <div class="stat">
                  <span class="stat-value">{{ nivelRecomendado.accuracy }}%</span>
                  <span class="stat-label">Tasa de éxito estimada</span>
                </div>
                <div class="stat">
                  <span class="stat-value">{{ nivelRecomendado.time }}</span>
                  <span class="stat-label">minutos promedio</span>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="mostrarModal = false">
              Ver todos los niveles
            </button>
            <button class="btn btn-primary" @click="selectRecomendado">
              Jugar {{ nivelRecomendado.name }}
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Transición -->
    <transition name="page-transition">
      <div v-if="transitioning" class="transition-overlay"></div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()

const hoveredLevel = ref(null)
const mostrarModal = ref(false)
const transitioning = ref(false)
const nivelCompletado = ref(1) // Ejemplo

// Datos de categorías mejorados
const categorias = {
  frutas: { name: "Frutas", icon: "🥭", words: 25, color: "#FF9F43" },
  animales: { name: "Animales", icon: "🐶", words: 30, color: "#1DD1A1" },
  paises: { name: "Países", icon: "🌍", words: 35, color: "#54A0FF" },
  deportes: { name: "Deportes", icon: "⚽", words: 28, color: "#FECA57" },
  peliculas: { name: "Películas", icon: "🎬", words: 22, color: "#FF6B6B" },
  ciencia: { name: "Ciencia", icon: "🔬", words: 20, color: "#5F27CD" }
}

// Niveles mejorados
const niveles = ref([
  {
    id: "facil",
    name: "Fácil",
    icon: "😊",
    description: "Perfecto para empezar",
    time: 2,
    letters: 4,
    lives: 10,
    accuracy: 85,
    recommended: true,
    color: "#1DD1A1"
  },
  {
    id: "medio",
    name: "Medio",
    icon: "😎",
    description: "Un buen desafío",
    time: 4,
    letters: 6,
    lives: 7,
    accuracy: 65,
    recommended: false,
    color: "#FECA57"
  },
  {
    id: "dificil",
    name: "Difícil",
    icon: "🔥",
    description: "Para expertos",
    time: 6,
    letters: 8,
    lives: 5,
    accuracy: 45,
    recommended: false,
    color: "#FF6B6B"
  }
])

// Computed
const currentCategory = computed(() => {
  const cat = route.query.category || "frutas"
  return categorias[cat] || { name: "Categoría", icon: "🎯", words: 20, color: "#9D4DFF" }
})

const nivelRecomendado = computed(() => {
  return niveles.value.find(n => n.recommended) || niveles.value[0]
})

// Métodos
function selectLevel(level) {
  transitioning.value = true
  
  // Guardar estadísticas
  const levelStats = JSON.parse(localStorage.getItem("ahorcado_level_stats") || "{}")
  const key = `${route.query.category}_${level}`
  levelStats[key] = (levelStats[key] || 0) + 1
  localStorage.setItem("ahorcado_level_stats", JSON.stringify(levelStats))
  
  // Animación antes de navegar
  setTimeout(() => {
    router.push(`/game?category=${route.query.category}&level=${level}`)
  }, 400)
}

function volverCategorias() {
  router.push('/categories')
}

function mostrarRecomendacion() {
  mostrarModal.value = true
}

function selectRecomendado() {
  selectLevel(nivelRecomendado.value.id)
  mostrarModal.value = false
}

// Efectos
onMounted(() => {
  // Determinar nivel recomendado basado en historial
  const playerLevel = localStorage.getItem("ahorcado_player_level") || "facil"
  
  niveles.value.forEach(level => {
    level.recommended = level.id === playerLevel
  })
})
</script>

<style scoped>
.levels-container {
  min-height: 100vh;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Header */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  padding: 0 16px;
  flex-wrap: wrap;
  gap: 16px;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
  }
  
  .back-btn,
  .header-info,
  .header-actions {
    width: 100%;
  }
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--text-light);
  padding: 12px 20px;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all var(--transition-normal);
  font-size: 14px;
  font-weight: 500;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(-3px);
}

.category-badge {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.1);
  padding: 12px 24px;
  border-radius: var(--border-radius-lg);
  border: 2px solid currentColor;
  animation: pulse 2s infinite;
}

.category-icon {
  font-size: 2rem;
}

.category-name {
  font-size: 1.3rem;
  font-weight: 600;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--border-radius);
  color: var(--text-light);
  cursor: pointer;
  transition: all var(--transition-normal);
  font-size: 1.2rem;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px) rotate(5deg);
}

/* Level info */
.level-info {
  text-align: center;
  margin-bottom: 48px;
  padding: 0 16px;
}

.level-info h1 {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 16px;
}

@media (max-width: 768px) {
  .level-info h1 {
    font-size: 2.2rem;
  }
}

.subtitle {
  color: var(--text-muted);
  font-size: 1.1rem;
  margin-bottom: 32px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.difficulty-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  max-width: 500px;
  margin: 0 auto;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius);
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all var(--transition-normal);
}

.info-card:hover {
  transform: translateY(-3px);
  border-color: var(--primary-color);
  box-shadow: var(--shadow-primary);
}

.info-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius);
  flex-shrink: 0;
}

.info-content h4 {
  color: var(--text-light);
  margin-bottom: 4px;
  font-size: 1.1rem;
}

.info-content p {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin: 0;
}

/* Levels grid */
.levels-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  margin-bottom: 48px;
  padding: 0 16px;
}

@media (max-width: 768px) {
  .levels-grid {
    grid-template-columns: 1fr;
  }
}

.level-card {
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius-lg);
  padding: 30px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  transition: all var(--transition-normal);
  overflow: hidden;
  cursor: pointer;
}

.level-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.05) 50%, transparent 70%);
  transform: translateX(-100%);
  transition: transform 0.6s;
}

.level-card:hover::before {
  transform: translateX(100%);
}

.level-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.level-card.recommended {
  border-color: var(--accent-color);
}

.level-facil:hover {
  border-color: #1DD1A1;
  box-shadow: 0 0 30px rgba(29, 209, 161, 0.4);
}

.level-medio:hover {
  border-color: #FECA57;
  box-shadow: 0 0 30px rgba(254, 202, 87, 0.4);
}

.level-dificil:hover {
  border-color: #FF6B6B;
  box-shadow: 0 0 30px rgba(255, 107, 107, 0.4);
}

.level-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.level-icon {
  font-size: 3.5rem;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  transition: all var(--transition-normal);
}

.level-card:hover .level-icon {
  transform: scale(1.1) rotate(10deg);
}

.level-badge {
  background: var(--accent-color);
  color: #050010;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  animation: glow 2s ease-in-out infinite;
}

.level-content h3 {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-light);
  margin-bottom: 12px;
  transition: color var(--transition-normal);
}

.level-card:hover .level-content h3 {
  color: var(--primary-color);
}

.level-description {
  color: var(--text-muted);
  margin-bottom: 20px;
  line-height: 1.5;
}

.level-stats {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.stat svg {
  opacity: 0.7;
}

.level-requirements {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.requirement {
  display: flex;
  align-items: center;
  gap: 8px;
}

.req-icon {
  font-size: 1.2rem;
}

.req-text {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.level-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 20px;
}

.level-select-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  border: none;
  border-radius: var(--border-radius);
  color: var(--text-light);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.level-select-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 105, 180, 0.4);
}

.level-select-btn svg {
  transition: transform var(--transition-normal);
}

.level-select-btn:hover svg {
  transform: translateX(5px);
}

.level-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(255, 105, 180, 0.1), transparent);
  opacity: 0;
  transition: opacity var(--transition-normal);
  pointer-events: none;
}

.level-card:hover .level-glow {
  opacity: 1;
}

/* Difficulty help */
.difficulty-help {
  padding: 0 16px;
}

.help-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius-lg);
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.help-card h4 {
  color: var(--primary-color);
  font-size: 1.3rem;
  margin-bottom: 12px;
}

.help-card p {
  color: var(--text-muted);
  margin-bottom: 16px;
}

.help-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.help-list li {
  color: var(--text-muted);
  margin-bottom: 8px;
  padding-left: 24px;
  position: relative;
}

.help-list li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: var(--accent-color);
  font-weight: bold;
}

/* Modal */
.recommendation-content {
  text-align: center;
}

.recommendation-icon {
  font-size: 3rem;
  margin-bottom: 16px;
}

.recommendation-content h3 {
  color: var(--primary-color);
  margin-bottom: 12px;
}

.recommendation-reason {
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 24px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.recommendation-stats {
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.recommendation-stats .stat {
  flex-direction: column;
  gap: 4px;
}

.recommendation-stats .stat-value {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--accent-color);
}

.recommendation-stats .stat-label {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.modal-footer {
  display: flex;
  gap: 12px;
  justify-content: center;
}

@media (max-width: 768px) {
  .modal-footer {
    flex-direction: column;
  }
  
  .modal-footer .btn {
    width: 100%;
  }
}

/* Transición de página */
.page-transition-enter-active,
.page-transition-leave-active {
  transition: opacity 0.4s ease;
}

.page-transition-enter-from,
.page-transition-leave-to {
  opacity: 0;
}

.transition-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
  z-index: 9999;
  opacity: 0.3;
}
</style>





