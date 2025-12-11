<template>
  <div class="levels-futurista-container">
    <!-- Fondo con efecto matrix -->
    <div class="matrix-bg">
      <div class="code-rain" v-for="i in 20" :key="i" :style="codeRainStyle(i)"></div>
    </div>

    <!-- Luces ambientales -->
    <div class="ambient-lights">
      <div class="light-beam pink-beam"></div>
      <div class="light-beam blue-beam"></div>
      <div class="light-beam green-beam"></div>
    </div>

    <!-- Header holográfico -->
    <header class="holo-header">
      <div class="header-content">
        <div class="category-display">
          <div class="category-orb">
            <div class="orb-glow"></div>
            <div class="orb-icon">{{ currentCategory.icon }}</div>
          </div>
          <div class="category-info">
            <h1 class="category-title glitch-text" :data-text="currentCategory.name">
              {{ currentCategory.name }}
            </h1>
            <p class="category-subtitle">SELECCIÓN DE NIVEL</p>
          </div>
        </div>
        
        <div class="header-controls">
          <button class="control-btn back-btn" @click="volverCategorias">
            <span class="btn-icon">◄</span>
            <span class="btn-text">RETROCEDER</span>
          </button>
          <button class="control-btn ai-btn" @click="mostrarRecomendacion" title="Consulta AI">
            <span class="btn-icon">🤖</span>
            <span class="btn-text">AI RECOMMEND</span>
          </button>
        </div>
      </div>
      
      <!-- Barra de progreso -->
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        <div class="progress-label">
          <span class="progress-text">SINCRONIZACIÓN: {{ progress }}%</span>
          <span class="progress-stats">{{ nivelCompletado }}/3 NIVELES COMPLETADOS</span>
        </div>
      </div>
    </header>

    <!-- Panel de selección de nivel -->
    <div class="level-selection-panel">
      <div class="panel-header">
        <h2 class="panel-title">
          <span class="title-icon">⚡</span>
          SELECCIONE SU DIFICULTAD
        </h2>
        <div class="panel-subtitle">
          Cada nivel desbloquea capacidades diferentes en la matriz
        </div>
      </div>

      <!-- Grid de niveles -->
      <div class="levels-holo-grid">
        <div
          v-for="level in niveles"
          :key="level.id"
          class="level-holo-card"
          :class="[`level-${level.id}`, { 'recommended': level.recommended }]"
          @click="selectLevel(level.id)"
          @mouseenter="hoveredLevel = level.id"
          @mouseleave="hoveredLevel = null"
        >
          <!-- Efecto holográfico -->
          <div class="holo-effect"></div>
          
          <!-- Cabecera del nivel -->
          <div class="card-header">
            <div class="level-status">
              <div class="status-indicator active"></div>
              <span class="status-text">DISPONIBLE</span>
            </div>
            <div class="level-badge" v-if="level.recommended">
              <span class="badge-glow"></span>
              <span class="badge-text">✨ RECOMENDADO</span>
            </div>
          </div>

          <!-- Contenido principal -->
          <div class="card-body">
            <div class="level-visual">
              <div class="visual-glow"></div>
              <div class="level-avatar">
                <div class="avatar-circle">{{ level.avatar }}</div>
              </div>
              <div class="level-code">
                <span class="code-line">> NIVEL::{{ level.id.toUpperCase() }}</span>
                <span class="code-line">> CÓDIGO::{{ level.code }}</span>
              </div>
            </div>

            <div class="level-info">
              <h3 class="level-name">{{ level.name }}</h3>
              <div class="level-tagline">{{ level.tagline }}</div>
              
              <div class="level-specs">
                <div class="spec-item" v-for="spec in level.specs" :key="spec.label">
                  <div class="spec-icon">{{ spec.icon }}</div>
                  <div class="spec-content">
                    <div class="spec-value">{{ spec.value }}</div>
                    <div class="spec-label">{{ spec.label }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Indicador de dificultad -->
            <div class="difficulty-meter">
              <div class="meter-label">NIVEL DE CARGA</div>
              <div class="meter-bar">
                <div class="meter-fill" :style="{ width: level.difficulty * 20 + '%' }"></div>
                <div class="meter-points">
                  <div class="meter-point" v-for="i in 5" :key="i"
                       :class="{ 'active': i <= level.difficulty }"></div>
                </div>
              </div>
              <div class="meter-reading">{{ level.difficulty }}/5</div>
            </div>
          </div>

          <!-- Pie de carta -->
          <div class="card-footer">
            <div class="level-rewards">
              <div class="reward" v-for="reward in level.rewards" :key="reward">
                <span class="reward-icon">🏆</span>
                <span class="reward-text">{{ reward }}</span>
              </div>
            </div>
            
            <button class="access-btn">
              <span class="btn-inner">
                <span class="btn-text">ACCEDER AL SISTEMA</span>
                <span class="btn-arrow">⟫</span>
              </span>
              <div class="btn-beam"></div>
            </button>
          </div>

          <!-- Efectos de borde -->
          <div class="card-border"></div>
          <div class="card-glow" :style="{ '--level-color': level.color }"></div>
        </div>
      </div>

      <!-- Panel de información -->
      <div class="info-console">
        <div class="console-header">
          <div class="console-dots">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <span class="console-title">CONSOLA DE INFORMACIÓN</span>
        </div>
        <div class="console-body">
          <div class="log-entry" v-if="hoveredLevel">
            <span class="log-time">[{{ new Date().toLocaleTimeString() }}]</span>
            <span class="log-message">
              ANALIZANDO NIVEL {{ hoveredLevel.toUpperCase() }}...
              <span class="log-detail">SISTEMA ÓPTIMO PARA {{ niveles.find(l => l.id === hoveredLevel)?.description }}</span>
            </span>
          </div>
          <div class="log-entry" v-else>
            <span class="log-time">[{{ new Date().toLocaleTimeString() }}]</span>
            <span class="log-message">
              SELECCIONE UN NIVEL PARA ANALIZAR ESPECIFICACIONES...
            </span>
          </div>
          <div class="log-entry">
            <span class="log-time">[{{ new Date().toLocaleTimeString() }}]</span>
            <span class="log-message">
              CATEGORÍA: {{ currentCategory.name }} | PALABRAS DISPONIBLES: {{ currentCategory.words }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Panel AI de recomendación -->
    <div class="ai-recommendation" v-if="mostrarModal">
      <div class="ai-overlay" @click.self="mostrarModal = false"></div>
      <div class="ai-panel">
        <div class="ai-header">
          <div class="ai-avatar">🤖</div>
          <div class="ai-title">
            <h3>RECOMENDACIÓN DE IA</h3>
            <p class="ai-subtitle">Sistema Neural v3.5</p>
          </div>
          <button class="ai-close" @click="mostrarModal = false">✕</button>
        </div>
        
        <div class="ai-body">
          <div class="recommendation-card">
            <div class="rec-visual">
              <div class="rec-glow"></div>
              <div class="rec-orb">{{ nivelRecomendado.avatar }}</div>
            </div>
            <div class="rec-info">
              <h4 class="rec-title">NIVEL OPTIMIZADO</h4>
              <h3 class="rec-level">{{ nivelRecomendado.name }}</h3>
              <p class="rec-reason">
                Basado en su historial de ejecución y capacidades actuales,
                este nivel ofrece el equilibrio óptimo entre desafío y éxito.
              </p>
            </div>
          </div>

          <div class="ai-analysis">
            <h4 class="analysis-title">ANÁLISIS DE DATOS</h4>
            <div class="analysis-grid">
              <div class="analysis-item">
                <div class="analysis-icon">📈</div>
                <div class="analysis-content">
                  <div class="analysis-value">{{ nivelRecomendado.accuracy }}%</div>
                  <div class="analysis-label">TASA DE ÉXITO ESTIMADA</div>
                </div>
              </div>
              <div class="analysis-item">
                <div class="analysis-icon">⏱️</div>
                <div class="analysis-content">
                  <div class="analysis-value">{{ nivelRecomendado.time }}</div>
                  <div class="analysis-label">MINUTOS PROYECTADOS</div>
                </div>
              </div>
              <div class="analysis-item">
                <div class="analysis-icon">🎯</div>
                <div class="analysis-content">
                  <div class="analysis-value">{{ nivelRecomendado.difficulty }}/5</div>
                  <div class="analysis-label">NIVEL DE DESAFÍO</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="ai-footer">
          <button class="ai-btn secondary" @click="mostrarModal = false">
            <span class="btn-icon">↩</span>
            <span class="btn-text">EXPLORAR TODOS</span>
          </button>
          <button class="ai-btn primary" @click="selectRecomendado">
            <span class="btn-icon">🚀</span>
            <span class="btn-text">INICIAR PROTOCOLO</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Efecto de transición -->
    <transition name="matrix-transition">
      <div v-if="transitioning" class="matrix-overlay">
        <div class="transition-text">
          <span class="text-line" v-for="line in transitionLines" :key="line">{{ line }}</span>
        </div>
      </div>
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
const progress = ref(65)
const nivelCompletado = ref(1)

// Datos de categorías actualizados
const categorias = {
  frutas: { 
    name: "FRUTAS NUCLEARES", 
    icon: "🍉", 
    words: 25, 
    color: "#FF3366" 
  },
  animales: { 
    name: "FAUNA DIGITAL", 
    icon: "🐲", 
    words: 30, 
    color: "#00CCFF" 
  },
  paises: { 
    name: "NACIONES MATRIX", 
    icon: "🌐", 
    words: 35, 
    color: "#00FF99" 
  },
  deportes: { 
    name: "DEPORTES QUANTUM", 
    icon: "⚡", 
    words: 28, 
    color: "#FF9900" 
  },
  peliculas: { 
    name: "CINE HOLOGRÁFICO", 
    icon: "🎥", 
    words: 22, 
    color: "#9966FF" 
  },
  ciencia: { 
    name: "CIENCIA AVANZADA", 
    icon: "🔬", 
    words: 20, 
    color: "#FFFF00" 
  }
}

// Niveles completamente desbloqueados
const niveles = ref([
  {
    id: "facil",
    name: "SISTEMA ALFA",
    avatar: "👁️",
    tagline: "ENTRENAMIENTO DE INICIACIÓN",
    description: "Nuevos usuarios y calibración del sistema",
    time: 2,
    accuracy: 85,
    difficulty: 1,
    color: "#00FF99",
    code: "ACCESS_LEVEL_1",
    recommended: true,
    specs: [
      { icon: "💖", value: "10 VIDAS", label: "PROTECCIÓN" },
      { icon: "⚡", value: "2 MIN", label: "DURACIÓN" },
      { icon: "🎯", value: "85%", label: "EFICACIA" }
    ],
    rewards: ["LOGRO: INICIADO", "MEDALLA ALFA"]
  },
  {
    id: "medio",
    name: "SISTEMA BETA",
    avatar: "⚡",
    tagline: "PRUEBAS DE CAMPO",
    description: "Usuarios intermedios y optimización",
    time: 4,
    accuracy: 65,
    difficulty: 3,
    color: "#FF9900",
    code: "ACCESS_LEVEL_2",
    recommended: false,
    specs: [
      { icon: "💖", value: "7 VIDAS", label: "PROTECCIÓN" },
      { icon: "⚡", value: "4 MIN", label: "DURACIÓN" },
      { icon: "🎯", value: "65%", label: "EFICACIA" }
    ],
    rewards: ["LOGRO: OPERADOR", "MEDALLA BETA"]
  },
  {
    id: "dificil",
    name: "SISTEMA OMEGA",
    avatar: "🔥",
    tagline: "MODO EXPERTO",
    description: "Operadores avanzados y pruebas extremas",
    time: 6,
    accuracy: 45,
    difficulty: 5,
    color: "#FF3366",
    code: "ACCESS_LEVEL_3",
    recommended: false,
    specs: [
      { icon: "💖", value: "5 VIDAS", label: "PROTECCIÓN" },
      { icon: "⚡", value: "6 MIN", label: "DURACIÓN" },
      { icon: "🎯", value: "45%", label: "EFICACIA" }
    ],
    rewards: ["LOGRO: MAESTRO", "MEDALLA OMEGA"]
  }
])

// Líneas para la transición matrix
const transitionLines = ref([
  "INICIANDO PROTOCOLO DE ACCESO...",
  "CARGANDO MATRIZ DE JUEGO...",
  "SINCRONIZANDO CON SISTEMA...",
  "PREPARANDO AMBIENTE...",
  "ACCEDIENDO A BASE DE DATOS...",
  "INICIALIZANDO INTERFAZ...",
  "PROTOCOLO COMPLETADO"
])

// Computed
const currentCategory = computed(() => {
  const cat = route.query.category || "frutas"
  return categorias[cat] || { 
    name: "SISTEMA GENÉRICO", 
    icon: "⚙️", 
    words: 20, 
    color: "#9D4DFF" 
  }
})

const nivelRecomendado = computed(() => {
  return niveles.value.find(n => n.recommended) || niveles.value[0]
})

// Estilos dinámicos
const codeRainStyle = (index) => {
  const delay = index * 0.2
  const duration = 1 + Math.random() * 2
  const left = Math.random() * 100
  
  return {
    left: `${left}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    opacity: 0.1 + Math.random() * 0.3
  }
}

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
  }, 3000)
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
  
  // Animar barra de progreso
  setTimeout(() => {
    progress.value = 85
  }, 500)
})
</script>

<style scoped>
.levels-futurista-container {
  min-height: 100vh;
  background: 
    radial-gradient(circle at 20% 30%, rgba(255, 51, 102, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(0, 204, 255, 0.15) 0%, transparent 50%),
    linear-gradient(135deg, #050510 0%, #0A0A1A 50%, #050510 100%);
  position: relative;
  overflow-x: hidden;
  font-family: 'Courier New', 'Roboto Mono', monospace;
  color: #fff;
}

/* Efecto Matrix */
.matrix-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.code-rain {
  position: absolute;
  top: -100px;
  width: 1px;
  height: 100px;
  background: linear-gradient(to bottom, transparent, #00FF99, transparent);
  animation: codeRain linear infinite;
  filter: blur(1px);
}

@keyframes codeRain {
  0% {
    top: -100px;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    top: 100vh;
    opacity: 0;
  }
}

/* Luces ambientales */
.ambient-lights {
  position: fixed;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.light-beam {
  position: absolute;
  width: 300px;
  height: 300px;
  filter: blur(100px);
  opacity: 0.15;
}

.pink-beam { 
  top: 10%; 
  left: 10%; 
  background: #FF3366; 
}
.blue-beam { 
  top: 60%; 
  right: 10%; 
  background: #00CCFF; 
}
.green-beam { 
  bottom: 10%; 
  left: 50%; 
  background: #00FF99; 
}

/* Header holográfico */
.holo-header {
  position: relative;
  z-index: 10;
  padding: 40px 20px 20px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  border-bottom: 2px solid rgba(0, 255, 153, 0.3);
  margin-bottom: 40px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    text-align: center;
  }
}

.category-display {
  display: flex;
  align-items: center;
  gap: 25px;
}

.category-orb {
  position: relative;
  width: 100px;
  height: 100px;
}

.orb-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: currentColor;
  border-radius: 50%;
  filter: blur(20px);
  opacity: 0.3;
  animation: pulse 3s infinite;
}

.orb-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  border: 3px solid;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.2);
}

.category-info {
  flex: 1;
}

.category-title {
  font-size: 2.8rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
  background: linear-gradient(135deg, #00FF99, #00CCFF);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
}

.glitch-text {
  position: relative;
  animation: glitch 2s infinite;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch-text::before {
  animation: glitch-top 1s infinite;
  color: #FF3366;
  clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
  z-index: -1;
}

.glitch-text::after {
  animation: glitch-bottom 1.5s infinite;
  color: #00CCFF;
  clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
  z-index: -2;
}

@keyframes glitch {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-2px); }
  40% { transform: translateX(2px); }
  60% { transform: translateX(-1px); }
  80% { transform: translateX(1px); }
}

@keyframes glitch-top {
  0%, 100% { transform: translateX(0); }
  33% { transform: translateX(-2px); }
  66% { transform: translateX(2px); }
}

@keyframes glitch-bottom {
  0%, 100% { transform: translateX(0); }
  33% { transform: translateX(2px); }
  66% { transform: translateX(-2px); }
}

.category-subtitle {
  font-size: 1rem;
  color: #00FF99;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin: 0;
}

.header-controls {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.control-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 25px;
  border: 2px solid;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
}

.back-btn {
  border-color: #FF9900;
  color: #FF9900;
}

.back-btn:hover {
  background: rgba(255, 153, 0, 0.2);
  transform: translateX(-5px);
  box-shadow: 0 0 20px rgba(255, 153, 0, 0.4);
}

.ai-btn {
  border-color: #00CCFF;
  color: #00CCFF;
}

.ai-btn:hover {
  background: rgba(0, 204, 255, 0.2);
  transform: translateY(-3px) rotate(5deg);
  box-shadow: 0 0 20px rgba(0, 204, 255, 0.4);
}

.btn-icon {
  font-size: 1.2rem;
}

/* Barra de progreso */
.progress-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #00FF99, #00CCFF);
  border-radius: 4px;
  transition: width 1.5s ease;
  position: relative;
  overflow: hidden;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 255, 255, 0.3), 
    transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.progress-label {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 0.9rem;
  color: #aaa;
}

.progress-text {
  color: #00FF99;
}

/* Panel de selección */
.level-selection-panel {
  position: relative;
  z-index: 10;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px 40px;
}

.panel-header {
  text-align: center;
  margin-bottom: 50px;
}

.panel-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  font-size: 2.2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.title-icon {
  color: #00FF99;
  animation: pulse 2s infinite;
}

.panel-subtitle {
  color: #aaa;
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
}

/* Grid de niveles holográficos */
.levels-holo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 35px;
  margin-bottom: 50px;
}

@media (max-width: 768px) {
  .levels-holo-grid {
    grid-template-columns: 1fr;
  }
}

.level-holo-card {
  position: relative;
  background: rgba(10, 15, 30, 0.8);
  border-radius: 20px;
  padding: 30px;
  border: 2px solid;
  transition: all 0.4s;
  overflow: hidden;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.level-holo-card.level-facil {
  border-color: #00FF99;
}

.level-holo-card.level-medio {
  border-color: #FF9900;
}

.level-holo-card.level-dificil {
  border-color: #FF3366;
}

.level-holo-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.6),
    0 0 40px var(--level-color, rgba(0, 255, 153, 0.3));
}

/* Efecto holográfico */
.holo-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, 
    transparent 30%, 
    rgba(255, 255, 255, 0.05) 50%, 
    transparent 70%);
  transform: translateX(-100%);
  animation: holo-scan 3s linear infinite;
  pointer-events: none;
}

@keyframes holo-scan {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Cabecera de carta */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  z-index: 5;
}

.level-status {
  display: flex;
  align-items: center;
  gap: 10px;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #00FF99;
  box-shadow: 0 0 10px #00FF99;
  animation: pulse 2s infinite;
}

.status-text {
  font-size: 0.9rem;
  color: #aaa;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.level-badge {
  position: relative;
  background: rgba(0, 255, 153, 0.2);
  border: 2px solid #00FF99;
  border-radius: 20px;
  padding: 8px 15px;
  overflow: hidden;
}

.badge-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, 
    transparent 30%, 
    rgba(0, 255, 153, 0.3) 50%, 
    transparent 70%);
  animation: holo-scan 2s linear infinite;
}

.badge-text {
  position: relative;
  color: #00FF99;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Cuerpo de carta */
.card-body {
  flex: 1;
  z-index: 5;
}

.level-visual {
  position: relative;
  margin-bottom: 30px;
}

.visual-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  background: radial-gradient(circle, 
    var(--level-color, rgba(0, 255, 153, 0.3)) 0%, 
    transparent 70%);
  filter: blur(40px);
  opacity: 0.3;
  z-index: 1;
}

.level-avatar {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.avatar-circle {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.5rem;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  border: 3px solid var(--level-color, #00FF99);
  box-shadow: 
    inset 0 0 20px rgba(255, 255, 255, 0.2),
    0 0 40px var(--level-color, rgba(0, 255, 153, 0.3));
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(5deg); }
}

.level-code {
  font-family: 'Courier New', monospace;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 15px;
  border: 1px solid rgba(0, 255, 153, 0.3);
}

.code-line {
  display: block;
  color: #00FF99;
  font-size: 0.9rem;
  margin-bottom: 5px;
  letter-spacing: 1px;
}

.code-line:last-child {
  margin-bottom: 0;
}

.level-info {
  margin-bottom: 25px;
}

.level-name {
  font-size: 2rem;
  font-weight: 900;
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.level-tagline {
  color: var(--level-color, #00FF99);
  font-size: 1rem;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.level-specs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 25px;
}

.spec-item {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s;
}

.level-holo-card:hover .spec-item {
  border-color: var(--level-color, #00FF99);
  transform: translateY(-3px);
}

.spec-icon {
  font-size: 1.5rem;
}

.spec-content {
  flex: 1;
}

.spec-value {
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 2px;
}

.spec-label {
  color: #aaa;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Medidor de dificultad */
.difficulty-meter {
  margin-bottom: 25px;
}

.meter-label {
  color: #aaa;
  font-size: 0.9rem;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.meter-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  margin-bottom: 10px;
  position: relative;
  overflow: hidden;
}

.meter-fill {
  height: 100%;
  background: linear-gradient(90deg, #00FF99, #FF9900, #FF3366);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.meter-points {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 2px;
}

.meter-point {
  width: 4px;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
}

.meter-point.active {
  background: white;
  box-shadow: 0 0 5px white;
}

.meter-reading {
  text-align: right;
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
}

/* Pie de carta */
.card-footer {
  margin-top: auto;
  z-index: 5;
}

.level-rewards {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.reward {
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(255, 153, 0, 0.1);
  border: 1px solid rgba(255, 153, 0, 0.3);
  border-radius: 15px;
  padding: 8px 12px;
}

.reward-icon {
  font-size: 0.9rem;
}

.reward-text {
  font-size: 0.8rem;
  color: #FF9900;
}

.access-btn {
  position: relative;
  width: 100%;
  padding: 18px;
  background: linear-gradient(135deg, 
    var(--level-color, #00FF99), 
    rgba(0, 255, 153, 0.7));
  border: none;
  border-radius: 10px;
  color: #050510;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.access-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px var(--level-color, rgba(0, 255, 153, 0.4));
}

.btn-inner {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-arrow {
  font-size: 1.5rem;
  transition: transform 0.3s;
}

.access-btn:hover .btn-arrow {
  transform: translateX(5px);
}

.btn-beam {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, 
    transparent 30%, 
    rgba(255, 255, 255, 0.3) 50%, 
    transparent 70%);
  transform: translateX(-100%);
  transition: transform 0.6s;
}

.access-btn:hover .btn-beam {
  transform: translateX(100%);
}

/* Efectos de borde y glow */
.card-border {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  border: 2px solid transparent;
  background: linear-gradient(45deg, 
    var(--level-color, #00FF99), 
    transparent) border-box;
  -webkit-mask: 
    linear-gradient(#fff 0 0) padding-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
  z-index: 3;
}

.level-holo-card:hover .card-border {
  opacity: 1;
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, 
    var(--level-color, rgba(0, 255, 153, 0.2)) 0%,
    transparent 70%);
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
  z-index: 1;
}

.level-holo-card:hover .card-glow {
  opacity: 0.3;
}

/* Consola de información */
.info-console {
  background: rgba(0, 0, 0, 0.7);
  border-radius: 15px;
  border: 2px solid #00FF99;
  overflow: hidden;
  margin-top: 40px;
}

.console-header {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 20px;
  background: rgba(0, 0, 0, 0.5);
  border-bottom: 2px solid #00FF99;
}

.console-dots {
  display: flex;
  gap: 8px;
}

.console-dots .dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.console-dots .red { background: #FF3366; }
.console-dots .yellow { background: #FF9900; }
.console-dots .green { background: #00FF99; }

.console-title {
  color: #00FF99;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 0.9rem;
}

.console-body {
  padding: 20px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
}

.log-entry {
  margin-bottom: 10px;
  color: #00FF99;
}

.log-time {
  color: #FF9900;
}

.log-message {
  margin-left: 10px;
}

.log-detail {
  display: block;
  color: #aaa;
  margin-left: 20px;
  font-style: italic;
  margin-top: 2px;
}

/* Panel AI */
.ai-recommendation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.ai-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
}

.ai-panel {
  position: relative;
  background: rgba(10, 15, 30, 0.95);
  border-radius: 25px;
  border: 2px solid #00CCFF;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  animation: panelSlide 0.5s ease;
  box-shadow: 
    0 0 60px rgba(0, 204, 255, 0.4),
    inset 0 0 20px rgba(0, 204, 255, 0.1);
}

@keyframes panelSlide {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.ai-header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 30px;
  border-bottom: 2px solid rgba(0, 204, 255, 0.3);
}

.ai-avatar {
  font-size: 3rem;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 204, 255, 0.1);
  border-radius: 50%;
  border: 3px solid #00CCFF;
  animation: pulse 2s infinite;
}

.ai-title {
  flex: 1;
}

.ai-title h3 {
  color: #00CCFF;
  font-size: 1.8rem;
  margin-bottom: 5px;
}

.ai-subtitle {
  color: #aaa;
  font-size: 0.9rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin: 0;
}

.ai-close {
  background: none;
  border: none;
  color: #FF3366;
  font-size: 1.8rem;
  cursor: pointer;
  padding: 5px;
  transition: transform 0.3s;
}

.ai-close:hover {
  transform: rotate(90deg);
}

.ai-body {
  padding: 30px;
}

.recommendation-card {
  display: flex;
  align-items: center;
  gap: 25px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  padding: 25px;
  border: 2px solid #00FF99;
  margin-bottom: 30px;
}

.rec-visual {
  position: relative;
  width: 100px;
  height: 100px;
  flex-shrink: 0;
}

.rec-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, #00FF99 0%, transparent 70%);
  filter: blur(20px);
  opacity: 0.3;
  animation: pulse 2s infinite;
}

.rec-orb {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  border: 3px solid #00FF99;
}

.rec-info {
  flex: 1;
}

.rec-title {
  color: #aaa;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 5px;
}

.rec-level {
  color: #00FF99;
  font-size: 2.2rem;
  font-weight: 900;
  margin-bottom: 15px;
  text-transform: uppercase;
}

.rec-reason {
  color: #aaa;
  line-height: 1.6;
  margin: 0;
}

.ai-analysis {
  margin-bottom: 30px;
}

.analysis-title {
  color: #00CCFF;
  font-size: 1.2rem;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.analysis-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 768px) {
  .analysis-grid {
    grid-template-columns: 1fr;
  }
}

.analysis-item {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 20px;
  border: 1px solid rgba(0, 204, 255, 0.3);
  display: flex;
  align-items: center;
  gap: 15px;
  transition: all 0.3s;
}

.analysis-item:hover {
  transform: translateY(-3px);
  border-color: #00CCFF;
  box-shadow: 0 10px 20px rgba(0, 204, 255, 0.2);
}

.analysis-icon {
  font-size: 2rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 204, 255, 0.1);
  border-radius: 10px;
}

.analysis-content {
  flex: 1;
}

.analysis-value {
  color: white;
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 2px;
}

.analysis-label {
  color: #aaa;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.ai-footer {
  display: flex;
  gap: 15px;
  padding: 30px;
  border-top: 2px solid rgba(0, 204, 255, 0.3);
}

@media (max-width: 768px) {
  .ai-footer {
    flex-direction: column;
  }
}

.ai-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 18px;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.ai-btn.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.ai-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
}

.ai-btn.primary {
  background: linear-gradient(135deg, #00FF99, #00CCFF);
  color: #050510;
}

.ai-btn.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0, 204, 255, 0.4);
}

/* Overlay de transición Matrix */
.matrix-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow: hidden;
}

.matrix-overlay::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(to bottom, 
      transparent 0%, 
      rgba(0, 255, 153, 0.1) 50%, 
      transparent 100%);
  animation: matrix-scan 2s linear infinite;
}

@keyframes matrix-scan {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

.transition-text {
  position: relative;
  z-index: 2;
  font-family: 'Courier New', monospace;
  color: #00FF99;
  text-align: center;
  animation: text-fade 3s ease;
}

.text-line {
  display: block;
  font-size: 1.2rem;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 2px;
  animation: line-typing 0.5s steps(40) forwards;
  opacity: 0;
}

@keyframes text-fade {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}

@keyframes line-typing {
  from { 
    width: 0;
    opacity: 1;
  }
  to { 
    width: 100%;
    opacity: 1;
  }
}

/* Animaciones de entrada/salida */
.matrix-transition-enter-active,
.matrix-transition-leave-active {
  transition: opacity 1s ease;
}

.matrix-transition-enter-from,
.matrix-transition-leave-to {
  opacity: 0;
}

/* Animación de pulso */
@keyframes pulse {
  0%, 100% { 
    opacity: 0.5;
    transform: scale(1);
  }
  50% { 
    opacity: 1;
    transform: scale(1.05);
  }
}

/* Responsive adicional */
@media (max-width: 480px) {
  .holo-header {
    padding: 20px 16px;
  }
  
  .category-title {
    font-size: 2rem;
  }
  
  .levels-holo-grid {
    gap: 20px;
  }
  
  .level-holo-card {
    padding: 20px;
    min-height: 450px;
  }
  
  .level-specs {
    grid-template-columns: 1fr;
  }
  
  .ai-panel {
    width: 95%;
    margin: 10px;
  }
  
  .level-name {
    font-size: 1.6rem;
  }
  
  .avatar-circle {
    width: 80px;
    height: 80px;
    font-size: 2.5rem;
  }
}
</style>





