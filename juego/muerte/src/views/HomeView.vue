<template>
  <div class="home-neon-container">
    <!-- Fondo con efecto de red neuronal -->
    <div class="neural-network">
      <div class="node" v-for="i in 25" :key="i" :style="nodeStyle(i)"></div>
      <div class="connection" v-for="i in 50" :key="'c' + i" :style="connectionStyle(i)"></div>
    </div>

    <!-- Efectos de iluminación -->
    <div class="lighting-effects">
      <div class="spotlight spotlight-pink"></div>
      <div class="spotlight spotlight-blue"></div>
      <div class="spotlight spotlight-purple"></div>
      <div class="radar-beam"></div>
    </div>

    <!-- Contenido principal con diseño futurista -->
    <div class="home-content">
      <!-- Cabecera holográfica -->
      <div class="holographic-header">
        <div class="hologram-effect"></div>
        <div class="main-title">
          <span class="title-letter" v-for="(letter, index) in 'AHORCADO'" :key="index" 
                :style="letterStyle(index)">
            {{ letter }}
          </span>
        </div>
        <div class="subtitle glitch-text" data-text="MATRIX EDITION">
          MATRIX EDITION
        </div>
        <div class="title-glow"></div>
      </div>

      <!-- Panel de control central -->
      <div class="control-panel">
        <!-- Sección de bienvenida o login -->
        <transition name="panel-transition" mode="out-in">
          <div v-if="!mostrarLogin" class="panel-section">
            <div class="panel-header">
              <h3 class="panel-title">
                <span class="icon">🎮</span>
                INICIAR SISTEMA
              </h3>
              <div class="status-indicator">
                <div class="status-dot online"></div>
                <span class="status-text">EN LÍNEA</span>
              </div>
            </div>

            <div class="panel-body">
              <div class="welcome-message">
                <p class="greeting">👋 BIENVENIDO, OPERADOR</p>
                <h2 class="mission-title">MISIÓN ACTIVA: <span class="highlight">CÓDIGO NEO-87</span></h2>
                <p class="mission-desc">
                  Infiltra la matriz del ahorcado y descifra los códigos antes que el sistema te elimine.
                </p>
              </div>

              <!-- Panel de métricas -->
              <div class="metrics-grid">
                <div class="metric-card" v-for="metric in metrics" :key="metric.label"
                     :style="{ '--metric-color': metric.color }">
                  <div class="metric-icon">{{ metric.icon }}</div>
                  <div class="metric-content">
                    <div class="metric-value">{{ metric.value }}</div>
                    <div class="metric-label">{{ metric.label }}</div>
                  </div>
                  <div class="metric-glow"></div>
                </div>
              </div>

              <!-- Botón de acción principal -->
              <button class="main-action-btn" @click="mostrarLogin = true">
                <div class="btn-inner">
                  <span class="btn-icon">🚀</span>
                  <span class="btn-text">INICIAR PROTOCOLO</span>
                  <span class="btn-subtext">INGRESAR CREDENCIALES</span>
                </div>
                <div class="btn-glow"></div>
                <div class="btn-particles">
                  <span v-for="i in 5" :key="i" class="particle"></span>
                </div>
              </button>
            </div>
          </div>

          <div v-else class="panel-section login-panel">
            <div class="panel-header">
              <h3 class="panel-title">
                <span class="icon">🔐</span>
                ACCESO AL SISTEMA
              </h3>
              <div class="security-level">
                <div class="level-bar">
                  <div class="level-fill" :style="{ width: securityLevel + '%' }"></div>
                </div>
                <span class="level-text">SEGURIDAD: {{ securityLevel }}%</span>
              </div>
            </div>

            <div class="panel-body">
              <!-- Terminal de acceso -->
              <div class="terminal">
                <div class="terminal-header">
                  <div class="terminal-dots">
                    <span class="dot red"></span>
                    <span class="dot yellow"></span>
                    <span class="dot green"></span>
                  </div>
                  <span class="terminal-title">TERMINAL DE ACCESO</span>
                </div>
                <div class="terminal-body">
                  <div class="command-line">
                    <span class="prompt">user@matrix:~$</span>
                    <span class="command">login_agent --name=</span>
                    <input
                      v-model="nombre"
                      type="text"
                      class="terminal-input"
                      placeholder="IDENTIFICADOR_AGENTE"
                      @keyup.enter="entrarAlJuego"
                      @input="updateSecurityLevel"
                      autofocus
                    />
                  </div>
                  <div class="terminal-output" v-if="error">
                    <span class="error-symbol">❌</span>
                    <span class="error-text">{{ error }}</span>
                  </div>
                  <div class="terminal-status">
                    <span class="status-symbol">⏳</span>
                    <span class="status-text">ESPERANDO AUTENTICACIÓN...</span>
                  </div>
                </div>
              </div>

              <!-- Botones de control -->
              <div class="control-buttons">
                <button class="control-btn confirm-btn" @click="entrarAlJuego">
                  <span class="btn-icon">✅</span>
                  <span class="btn-text">CONFIRMAR ACCESO</span>
                </button>
                <button class="control-btn cancel-btn" @click="mostrarLogin = false">
                  <span class="btn-icon">↩️</span>
                  <span class="btn-text">CANCELAR</span>
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- Panel de navegación rápida -->
      <div class="nav-panel">
        <div class="nav-card" v-for="nav in navigation" :key="nav.label" 
             :style="{ '--nav-color': nav.color }" @click="nav.action">
          <div class="nav-icon">{{ nav.icon }}</div>
          <div class="nav-content">
            <div class="nav-label">{{ nav.label }}</div>
            <div class="nav-desc">{{ nav.description }}</div>
          </div>
          <div class="nav-indicator">
            <div class="arrow">➤</div>
          </div>
          <div class="nav-glow"></div>
        </div>
      </div>

      <!-- Sistema de alertas -->
      <div class="alert-system">
        <div class="alert alert-system" v-if="showSystemAlert">
          <div class="alert-icon">⚠️</div>
          <div class="alert-content">
            <div class="alert-title">ALERTA DEL SISTEMA</div>
            <div class="alert-message">SISTEMA DE JUEGO CARGADO AL 100%</div>
          </div>
          <button class="alert-close" @click="showSystemAlert = false">✕</button>
        </div>
      </div>
    </div>

    <!-- Efectos de partículas -->
    <div class="floating-elements">
      <div class="floating-element" v-for="i in 8" :key="i" :style="floatingStyle(i)">
        {{ ['⚡', '💎', '🌟', '🔮', '💫', '✨', '🎯', '🔱'][i-1] }}
      </div>
    </div>

    <!-- Efecto de escaneo -->
    <div class="scanner-beam"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const mostrarLogin = ref(false)
const nombre = ref('')
const error = ref('')
const securityLevel = ref(0)
const showSystemAlert = ref(true)

// Métricas del sistema
const metrics = ref([
  { icon: '👥', value: '5.2K+', label: 'AGENTES ACTIVOS', color: '#00ffea' },
  { icon: '🎯', value: '98.7%', label: 'EFECTIVIDAD', color: '#ff00ff' },
  { icon: '⚡', value: '2.1s', label: 'TIEMPO RESPUESTA', color: '#ffff00' },
  { icon: '📊', value: '15K+', label: 'MISIONES', color: '#00ff00' }
])

// Navegación
const navigation = ref([
  { 
    icon: '🏆', 
    label: 'CLASIFICACIÓN', 
    description: 'TOP 10 AGENTES',
    color: '#ff9900',
    action: () => router.push('/ranking')
  },
  { 
    icon: '📚', 
    label: 'BASE DE DATOS', 
    description: 'CATEGORÍAS',
    color: '#00ccff',
    action: () => router.push('/categories')
  },
  { 
    icon: '⚙️', 
    label: 'CONFIGURACIÓN', 
    description: 'AJUSTES DEL SISTEMA',
    color: '#9966ff',
    action: () => console.log('Configuración')
  }
])

// Estilos dinámicos
const nodeStyle = (index) => {
  const colors = ['#ff00ff', '#00ffff', '#00ff00', '#ff9900']
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${index * 0.1}s`,
    backgroundColor: colors[index % colors.length],
    boxShadow: `0 0 20px ${colors[index % colors.length]}`
  }
}

const connectionStyle = (index) => {
  return {
    animationDelay: `${index * 0.05}s`,
    animationDuration: `${3 + Math.random() * 2}s`
  }
}

const letterStyle = (index) => {
  const colors = ['#ff00ff', '#00ffff', '#00ff00', '#ff9900', '#9966ff', '#ff3366', '#00ffea']
  return {
    animationDelay: `${index * 0.15}s`,
    color: colors[index % colors.length],
    textShadow: `0 0 20px ${colors[index % colors.length]}`
  }
}

const floatingStyle = (index) => {
  const delay = index * 0.5
  return {
    animationDelay: `${delay}s`,
    left: `${10 + (index * 10)}%`
  }
}

// Funciones
function updateSecurityLevel() {
  const length = nombre.value.length
  securityLevel.value = Math.min(100, length * 20)
}

function entrarAlJuego() {
  if (!nombre.value.trim()) {
    error.value = "ERROR: IDENTIFICADOR REQUERIDO"
    return
  }
  
  if (nombre.value.length < 2) {
    error.value = "ERROR: IDENTIFICADOR MÍNIMO 2 CARACTERES"
    return
  }
  
  error.value = ""
  localStorage.setItem("ahorcado_jugador", nombre.value.trim())
  router.push("/categories")
}

onMounted(() => {
  // Ocultar alerta después de 5 segundos
  setTimeout(() => {
    showSystemAlert.value = false
  }, 5000)
})
</script>

<style scoped>
.home-neon-container {
  min-height: 100vh;
  background: 
    radial-gradient(ellipse at 20% 20%, rgba(255, 0, 255, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 80%, rgba(0, 255, 255, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 40% 60%, rgba(0, 255, 0, 0.1) 0%, transparent 50%),
    linear-gradient(135deg, #0a0a14 0%, #151522 50%, #0a0a14 100%);
  position: relative;
  overflow: hidden;
  font-family: 'Courier New', monospace;
}

/* Red neuronal animada */
.neural-network {
  position: absolute;
  width: 100%;
  height: 100%;
}

.node {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: pulse 2s infinite;
  z-index: 1;
}

.connection {
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 0, 255, 0.5), transparent);
  animation: connect 3s linear infinite;
  transform-origin: left;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.5); opacity: 1; }
}

@keyframes connect {
  0% { transform: scaleX(0); opacity: 0; }
  50% { transform: scaleX(1); opacity: 0.5; }
  100% { transform: scaleX(0); opacity: 0; }
}

/* Efectos de iluminación */
.lighting-effects {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.spotlight {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.3;
}

.spotlight-pink { 
  top: 10%; 
  left: 10%; 
  background: #ff00ff; 
}
.spotlight-blue { 
  bottom: 10%; 
  right: 10%; 
  background: #00ffff; 
}
.spotlight-purple { 
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%);
  background: #9966ff; 
}

.radar-beam {
  position: absolute;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00ff00, transparent);
  top: 30%;
  animation: radar 4s linear infinite;
  box-shadow: 0 0 20px #00ff00;
}

@keyframes radar {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Contenido principal */
.home-content {
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* Cabecera holográfica */
.holographic-header {
  position: relative;
  text-align: center;
  margin-bottom: 60px;
  padding: 40px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 2px solid rgba(0, 255, 255, 0.3);
  overflow: hidden;
}

.hologram-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, 
    transparent 30%, 
    rgba(0, 255, 255, 0.1) 50%, 
    transparent 70%);
  animation: hologram 3s linear infinite;
}

@keyframes hologram {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.main-title {
  display: flex;
  justify-content: center;
  gap: 15px;
  font-size: 4.5rem;
  font-weight: 900;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .main-title {
    font-size: 2.8rem;
    gap: 8px;
  }
}

.title-letter {
  animation: float 3s infinite;
  text-transform: uppercase;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

.subtitle {
  font-size: 1.8rem;
  color: #00ffea;
  text-transform: uppercase;
  letter-spacing: 4px;
  position: relative;
}

.glitch-text {
  animation: glitch 2s infinite;
  position: relative;
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
  animation: glitch-1 0.5s infinite;
  color: #ff00ff;
  z-index: -1;
}

.glitch-text::after {
  animation: glitch-2 0.5s infinite;
  color: #00ffff;
  z-index: -2;
}

@keyframes glitch {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-2px); }
  40% { transform: translateX(2px); }
  60% { transform: translateX(-1px); }
  80% { transform: translateX(1px); }
}

@keyframes glitch-1 {
  0%, 100% { clip-path: inset(0 0 0 0); }
  33% { clip-path: inset(10px 0 30px 0); }
  66% { clip-path: inset(20px 0 10px 0); }
}

@keyframes glitch-2 {
  0%, 100% { clip-path: inset(0 0 0 0); }
  33% { clip-path: inset(40px 0 1px 0); }
  66% { clip-path: inset(10px 0 40px 0); }
}

/* Panel de control */
.control-panel {
  background: rgba(10, 15, 30, 0.8);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  border: 2px solid rgba(0, 255, 255, 0.2);
  margin-bottom: 40px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5),
              inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 30px;
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 2px solid rgba(0, 255, 255, 0.3);
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 1.8rem;
  color: #00ffea;
  margin: 0;
}

.panel-title .icon {
  font-size: 2rem;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 10px;
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.status-dot.online {
  background: #00ff00;
  box-shadow: 0 0 10px #00ff00;
  animation: pulse 2s infinite;
}

.status-text {
  color: #00ff00;
  font-weight: bold;
  letter-spacing: 1px;
}

.panel-body {
  padding: 40px;
}

/* Mensaje de bienvenida */
.welcome-message {
  text-align: center;
  margin-bottom: 40px;
}

.greeting {
  font-size: 1.3rem;
  color: #00ffff;
  margin-bottom: 10px;
}

.mission-title {
  font-size: 2.2rem;
  color: white;
  margin-bottom: 20px;
}

.mission-title .highlight {
  color: #ff00ff;
  text-shadow: 0 0 10px #ff00ff;
}

.mission-desc {
  font-size: 1.1rem;
  color: #aaa;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
}

/* Grid de métricas */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.metric-card {
  position: relative;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  padding: 25px;
  border: 2px solid;
  border-color: var(--metric-color, #00ffea);
  transition: all 0.3s;
  overflow: hidden;
}

.metric-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px var(--metric-color, rgba(0, 255, 234, 0.3));
}

.metric-icon {
  font-size: 3rem;
  margin-bottom: 20px;
  text-align: center;
}

.metric-content {
  text-align: center;
}

.metric-value {
  font-size: 2.8rem;
  font-weight: 900;
  color: var(--metric-color, #00ffea);
  margin-bottom: 5px;
  text-shadow: 0 0 10px currentColor;
}

.metric-label {
  font-size: 0.9rem;
  color: #aaa;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.metric-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, 
    var(--metric-color, rgba(0, 255, 234, 0.2)) 0%,
    transparent 70%);
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.metric-card:hover .metric-glow {
  opacity: 0.3;
}

/* Botón principal */
.main-action-btn {
  position: relative;
  width: 100%;
  padding: 30px;
  background: linear-gradient(135deg, #0066ff, #00ccff);
  border: none;
  border-radius: 15px;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  overflow: hidden;
  margin-top: 20px;
}

.main-action-btn:hover {
  transform: scale(1.02);
  box-shadow: 0 0 50px rgba(0, 204, 255, 0.5);
}

.btn-inner {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.btn-icon {
  font-size: 2.5rem;
}

.btn-text {
  font-size: 1.8rem;
  letter-spacing: 2px;
}

.btn-subtext {
  font-size: 1rem;
  opacity: 0.8;
}

.btn-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, 
    rgba(255, 255, 255, 0.3) 0%,
    transparent 70%);
  opacity: 0;
  transition: opacity 0.3s;
}

.main-action-btn:hover .btn-glow {
  opacity: 1;
}

.btn-particles {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.btn-particles .particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
  animation: particle-float 2s infinite;
}

@keyframes particle-float {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) translateX(var(--tx, 0));
    opacity: 0;
  }
}

/* Panel de login */
.login-panel {
  border-color: rgba(255, 0, 255, 0.3);
}

.security-level {
  display: flex;
  align-items: center;
  gap: 15px;
}

.level-bar {
  width: 200px;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.level-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff0000, #ff9900, #00ff00);
  transition: width 0.3s;
}

.level-text {
  color: #00ffea;
  font-weight: bold;
  font-size: 0.9rem;
}

/* Terminal */
.terminal {
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  border: 2px solid #00ff00;
  overflow: hidden;
  margin-bottom: 30px;
}

.terminal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: rgba(0, 0, 0, 0.5);
  border-bottom: 2px solid #00ff00;
}

.terminal-dots {
  display: flex;
  gap: 8px;
}

.terminal-dots .dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.terminal-dots .red { background: #ff5f57; }
.terminal-dots .yellow { background: #ffbd2e; }
.terminal-dots .green { background: #28ca42; }

.terminal-title {
  color: #00ff00;
  font-weight: bold;
  letter-spacing: 1px;
}

.terminal-body {
  padding: 25px;
}

.command-line {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.prompt {
  color: #00ff00;
  font-weight: bold;
}

.command {
  color: #00ccff;
}

.terminal-input {
  flex: 1;
  background: transparent;
  border: none;
  color: white;
  font-family: 'Courier New', monospace;
  font-size: 1rem;
  min-width: 200px;
  outline: none;
  border-bottom: 2px solid #00ff00;
  padding: 5px 0;
}

.terminal-input::placeholder {
  color: #666;
}

.terminal-output,
.terminal-status {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  margin-top: 15px;
  border-radius: 5px;
}

.terminal-output {
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid #ff0000;
}

.error-symbol {
  color: #ff0000;
}

.error-text {
  color: #ff6666;
}

.terminal-status {
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid #00ff00;
}

.status-symbol {
  color: #00ff00;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  100% { transform: rotate(360deg); }
}

.status-text {
  color: #00ff00;
}

/* Botones de control */
.control-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.control-btn {
  padding: 20px 40px;
  border: none;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 15px;
}

.confirm-btn {
  background: linear-gradient(135deg, #00cc00, #00ff00);
  color: white;
}

.cancel-btn {
  background: linear-gradient(135deg, #cc0000, #ff0000);
  color: white;
}

.control-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* Panel de navegación */
.nav-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.nav-card {
  position: relative;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  padding: 25px;
  border: 2px solid;
  border-color: var(--nav-color, #00ccff);
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-card:hover {
  transform: translateX(10px);
  box-shadow: 0 10px 30px var(--nav-color, rgba(0, 204, 255, 0.3));
}

.nav-icon {
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  border: 2px solid var(--nav-color, #00ccff);
}

.nav-content {
  flex: 1;
}

.nav-label {
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
  margin-bottom: 5px;
}

.nav-desc {
  font-size: 0.9rem;
  color: #aaa;
}

.nav-indicator .arrow {
  font-size: 1.5rem;
  color: var(--nav-color, #00ccff);
  transition: transform 0.3s;
}

.nav-card:hover .arrow {
  transform: translateX(5px);
}

.nav-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, 
    var(--nav-color, rgba(0, 204, 255, 0.2)) 0%,
    transparent 70%);
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
  border-radius: 15px;
}

.nav-card:hover .nav-glow {
  opacity: 0.3;
}

/* Sistema de alertas */
.alert-system {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
}

.alert {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.9);
  border-radius: 10px;
  border: 2px solid #ff9900;
  animation: slideIn 0.5s ease;
  backdrop-filter: blur(10px);
}

@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

.alert-icon {
  font-size: 2rem;
}

.alert-content {
  flex: 1;
}

.alert-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #ff9900;
  margin-bottom: 5px;
}

.alert-message {
  color: white;
  font-size: 0.9rem;
}

.alert-close {
  background: none;
  border: none;
  color: #ff6666;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 5px;
}

/* Elementos flotantes */
.floating-elements {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-element {
  position: absolute;
  font-size: 2rem;
  animation: float-element 6s infinite ease-in-out;
}

@keyframes float-element {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(10deg); }
}

/* Haz de escaneo */
.scanner-beam {
  position: absolute;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent, 
    #ffff00, 
    transparent);
  top: 0;
  animation: scanner 6s linear infinite;
  box-shadow: 0 0 30px #ffff00;
}

@keyframes scanner {
  0% { top: 0; }
  100% { top: 100%; }
}

/* Transiciones */
.panel-transition-enter-active,
.panel-transition-leave-active {
  transition: all 0.5s ease;
}

.panel-transition-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.panel-transition-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

/* Responsive */
@media (max-width: 768px) {
  .home-content {
    padding: 20px;
  }
  
  .holographic-header {
    padding: 30px 20px;
  }
  
  .main-title {
    font-size: 2.5rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
    letter-spacing: 2px;
  }
  
  .panel-header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .panel-body {
    padding: 30px 20px;
  }
  
  .metrics-grid {
    grid-template-columns: 1fr;
  }
  
  .nav-panel {
    grid-template-columns: 1fr;
  }
  
  .control-buttons {
    flex-direction: column;
  }
  
  .control-btn {
    width: 100%;
    justify-content: center;
  }
  
  .alert-system {
    left: 20px;
    right: 20px;
    bottom: 20px;
  }
}
</style>





