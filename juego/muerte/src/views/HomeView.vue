<template>
  <div class="home-neon-container">
    <!-- Fondo con partículas neón -->
    <div class="neon-particles">
      <div v-for="i in 50" :key="i" class="particle" :style="particleStyle(i)"></div>
    </div>

    <!-- Efectos de luces en las esquinas -->
    <div class="corner-lights">
      <div class="corner corner-tl neon-pink"></div>
      <div class="corner corner-tr neon-blue"></div>
      <div class="corner corner-bl neon-green"></div>
      <div class="corner corner-br neon-orange"></div>
    </div>

    <!-- Contenido principal -->
    <div class="home-content">
      <!-- Logo y título NEÓN -->
      <div class="neon-logo-container float">
        <div class="neon-logo">
          <div class="logo-glow"></div>
          <div class="logo-text">
            <span class="letter" style="--i:1">A</span>
            <span class="letter" style="--i:2">H</span>
            <span class="letter" style="--i:3">O</span>
            <span class="letter" style="--i:4">R</span>
            <span class="letter" style="--i:5">C</span>
            <span class="letter" style="--i:6">A</span>
            <span class="letter" style="--i:7">D</span>
            <span class="letter" style="--i:8">O</span>
          </div>
          <div class="logo-subtitle neon-blue neon-flicker">
            EL JUEGO DEFINITIVO
          </div>
        </div>
      </div>

      <!-- Botón principal NEÓN -->
      <div class="cta-section">
        <transition name="neon-slide" mode="out-in">
          <div v-if="!mostrarLogin" class="welcome-screen">
            <h2 class="welcome-title neon-pink neon-pulse">
              ¡PREPÁRATE PARA EL DESAFÍO!
            </h2>
            <p class="welcome-text">
              Un clásico reinventado con tecnología neón.<br>
              ¿Serás capaz de vencer al ahorcado?
            </p>
            
            <button 
              class="btn-neon btn-neon-pink btn-neon-large" 
              @click="mostrarLogin = true"
            >
              <span class="btn-icon">⚡</span>
              <span class="btn-text">INICIAR BATALLA</span>
            </button>

            <!-- Estadísticas con efectos neón -->
            <div class="neon-stats">
              <div class="stat">
                <div class="stat-icon neon-blue">👥</div>
                <div class="stat-content">
                  <div class="stat-value neon-green">{{ totalJugadores.toLocaleString() }}+</div>
                  <div class="stat-label">JUGADORES</div>
                </div>
              </div>
              <div class="stat">
                <div class="stat-icon neon-pink">🎮</div>
                <div class="stat-content">
                  <div class="stat-value neon-orange">{{ totalPartidas.toLocaleString() }}+</div>
                  <div class="stat-label">PARTIDAS</div>
                </div>
              </div>
              <div class="stat">
                <div class="stat-icon neon-green">📚</div>
                <div class="stat-content">
                  <div class="stat-value neon-purple">{{ palabrasTotales }}+</div>
                  <div class="stat-label">PALABRAS</div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="login-screen">
            <h2 class="login-title neon-blue neon-pulse">
              CREA TU ALTER EGO
            </h2>
            <p class="login-text">
              Elige un nombre que brille en la oscuridad
            </p>
            
            <div class="neon-input-group">
              <div class="input-label neon-green">
                <span class="label-icon">✨</span>
                NOMBRE DEL GLADIADOR
              </div>
              <input
                v-model="nombre"
                type="text"
                placeholder="EJ: NEÓN, CYBER, RAYO..."
                class="input-neon"
                @keyup.enter="entrarAlJuego"
                autofocus
              />
              <div v-if="error" class="error-message neon-red neon-glow">
                ⚡ {{ error }}
              </div>
            </div>
            
            <div class="neon-actions">
              <button 
                class="btn-neon btn-neon-green btn-neon-large" 
                @click="entrarAlJuego"
              >
                <span class="btn-icon">🚀</span>
                <span class="btn-text">DESPEGAR</span>
              </button>
              <button 
                class="btn-neon btn-neon-blue" 
                @click="mostrarLogin = false"
              >
                <span class="btn-icon">↩️</span>
                <span class="btn-text">VOLVER</span>
              </button>
            </div>
          </div>
        </transition>
      </div>

      <!-- Navegación rápida NEÓN -->
      <div class="neon-quick-nav">
        <button class="btn-neon btn-neon-purple" @click="irRanking">
          <span class="btn-icon">🏆</span>
          <span class="btn-text">RANKING NEÓN</span>
        </button>
        <button class="btn-neon btn-neon-orange" @click="irInstrucciones">
          <span class="btn-icon">📖</span>
          <span class="btn-text">MANUAL DE LUZ</span>
        </button>
        <button class="btn-neon btn-neon-yellow" @click="irCategorias">
          <span class="btn-icon">🎯</span>
          <span class="btn-text">CATEGORÍAS</span>
        </button>
      </div>
    </div>

    <!-- Efecto de escaneo -->
    <div class="scan-line"></div>

    <!-- Modal de instrucciones NEÓN -->
    <transition name="neon-modal">
      <div v-if="mostrarInstrucciones" class="neon-modal-overlay" @click.self="mostrarInstrucciones = false">
        <div class="neon-modal-content card-neon card-neon-blue">
          <div class="modal-header">
            <h2 class="modal-title neon-blue neon-flicker">📖 MANUAL DE LUZ</h2>
            <button class="modal-close btn-neon btn-neon-red btn-neon-small" @click="mostrarInstrucciones = false">
              ✕
            </button>
          </div>
          <div class="modal-body">
            <div class="instruction">
              <div class="step-number neon-pink">1</div>
              <div class="step-content">
                <h3 class="neon-green">SELECCIONA TU ZONA</h3>
                <p class="neon-text">Elige una categoría que coincida con tu vibración</p>
              </div>
            </div>
            <div class="instruction">
              <div class="step-number neon-blue">2</div>
              <div class="step-content">
                <h3 class="neon-orange">AJUSTA TU NIVEL</h3>
                <p class="neon-text">Configura la intensidad del desafío</p>
              </div>
            </div>
            <div class="instruction">
              <div class="step-number neon-green">3</div>
              <div class="step-content">
                <h3 class="neon-purple">ACTIVA LAS LETRAS</h3>
                <p class="neon-text">Ilumina el teclado con tus elecciones</p>
              </div>
            </div>
            <div class="instruction">
              <div class="step-number neon-orange">4</div>
              <div class="step-content">
                <h3 class="neon-yellow">¡EVITA EL APAGÓN!</h3>
                <p class="neon-text">Mantén la energía hasta descubrir la palabra</p>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn-neon btn-neon-pink" @click="mostrarInstrucciones = false">
              ⚡ ENERGIZADO ⚡
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const mostrarLogin = ref(false)
const nombre = ref('')
const error = ref('')
const mostrarInstrucciones = ref(false)

const totalJugadores = ref(5000)
const totalPartidas = ref(15000)
const palabrasTotales = ref(300)

const particleStyle = (index) => {
  const colors = [
    '#FF00FF', '#00FFFF', '#00FF00', '#FF5500',
    '#9D00FF', '#FFFF00', '#FF0055'
  ]
  const color = colors[index % colors.length]
  const size = Math.random() * 4 + 1
  const duration = Math.random() * 10 + 10
  const delay = Math.random() * 5
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    background: color,
    boxShadow: `0 0 ${size * 3}px ${color}`
  }
}

function entrarAlJuego() {
  if(!nombre.value.trim()){
    error.value = "¡LA ENERGÍA NECESITA UN NOMBRE!"
    return
  }
  
  if(nombre.value.length < 2){
    error.value = "¡MÁS POTENCIA! (MÍN. 2 CARACTERES)"
    return
  }
  
  error.value = ""
  localStorage.setItem("ahorcado_jugador", nombre.value.trim())
  router.push("/categories")
}

function irRanking() {
  router.push("/ranking")
}

function irInstrucciones() {
  mostrarInstrucciones.value = true
}

function irCategorias() {
  router.push("/categories")
}
</script>

<style scoped>
.home-neon-container {
  min-height: 100vh;
  background: 
    radial-gradient(circle at 20% 20%, rgba(255, 0, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 60%, rgba(0, 255, 0, 0.1) 0%, transparent 50%),
    linear-gradient(45deg, #000000 0%, #050510 30%, #0A0A1A 70%, #000000 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

/* Partículas neón */
.neon-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.particle {
  position: absolute;
  border-radius: 50%;
  animation: float-particle linear infinite;
  filter: blur(1px);
}

@keyframes float-particle {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

/* Luces de esquina */
.corner-lights {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.corner {
  position: absolute;
  width: 200px;
  height: 200px;
  filter: blur(60px);
  opacity: 0.3;
  z-index: 0;
}

.corner-tl { top: 0; left: 0; }
.corner-tr { top: 0; right: 0; }
.corner-bl { bottom: 0; left: 0; }
.corner-br { bottom: 0; right: 0; }

/* Línea de escaneo */
.scan-line {
  position: absolute;
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
  animation: scanning 3s linear infinite;
  z-index: 1;
  box-shadow: 0 0 20px var(--neon-green);
}

/* Contenido principal */
.home-content {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1200px;
  text-align: center;
  padding: 40px 20px;
}

/* Logo neón */
.neon-logo-container {
  margin-bottom: 60px;
}

.neon-logo {
  position: relative;
  display: inline-block;
}

.logo-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  background: radial-gradient(circle, 
    var(--neon-pink) 0%, 
    var(--neon-blue) 30%, 
    transparent 70%);
  filter: blur(40px);
  opacity: 0.5;
  z-index: -1;
}

.logo-text {
  display: flex;
  gap: 15px;
  font-size: 5rem;
  font-weight: 900;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

@media (max-width: 768px) {
  .logo-text {
    font-size: 3rem;
    gap: 8px;
  }
}

.letter {
  color: var(--neon-pink);
  animation: neon-flicker 1.5s infinite;
  animation-delay: calc(var(--i) * 0.1s);
  text-shadow: 
    0 0 10px currentColor,
    0 0 20px currentColor,
    0 0 30px currentColor,
    0 0 40px currentColor;
  transition: all 0.3s;
}

.letter:hover {
  color: var(--neon-blue);
  transform: translateY(-10px) scale(1.2);
}

.logo-subtitle {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
}

/* CTA Section */
.cta-section {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
  border: 2px solid var(--neon-purple);
  border-radius: var(--border-radius-xl);
  padding: 50px;
  margin-bottom: 40px;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-rainbow);
  animation: scanning 3s linear infinite;
}

.welcome-title, .login-title {
  font-size: 2.5rem;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

@media (max-width: 768px) {
  .welcome-title, .login-title {
    font-size: 1.8rem;
  }
}

.welcome-text, .login-text {
  color: var(--text-muted);
  font-size: 1.2rem;
  margin-bottom: 40px;
  line-height: 1.6;
}

/* Estadísticas neón */
.neon-stats {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 50px;
  flex-wrap: wrap;
}

.stat {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: var(--border-radius-lg);
  border: 1px solid;
  min-width: 200px;
  transition: all var(--transition-normal);
}

.stat:hover {
  transform: translateY(-5px);
  border-color: var(--neon-pink);
  box-shadow: var(--shadow-neon-pink);
}

.stat-icon {
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: var(--border-radius);
}

.stat-content {
  text-align: left;
}

.stat-value {
  font-size: 2.2rem;
  font-weight: 900;
  margin-bottom: 5px;
  text-shadow: 0 0 10px currentColor;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 2px;
}

/* Input neón */
.neon-input-group {
  max-width: 500px;
  margin: 0 auto 30px;
}

.input-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.error-message {
  margin-top: 15px;
  padding: 12px 20px;
  border: 2px solid var(--neon-red);
  border-radius: var(--border-radius);
  font-weight: 700;
  text-align: center;
}

/* Acciones neón */
.neon-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

/* Navegación rápida */
.neon-quick-nav {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

/* Modal neón */
.neon-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.neon-modal-content {
  max-width: 600px;
  width: 100%;
  animation: neon-glow 2s infinite;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  border-bottom: 2px solid var(--neon-blue);
}

.modal-title {
  font-size: 2rem;
  margin: 0;
  text-transform: uppercase;
}

.modal-close {
  width: 40px;
  height: 40px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 900;
}

.modal-body {
  padding: 30px;
}

.instruction {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: var(--border-radius);
  border: 1px solid;
  transition: all var(--transition-normal);
}

.instruction:hover {
  transform: translateX(10px);
  border-color: var(--neon-pink);
  box-shadow: var(--shadow-neon-pink);
}

.step-number {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: 900;
  border-radius: 50%;
  border: 3px solid;
  flex-shrink: 0;
}

.step-content h3 {
  font-size: 1.3rem;
  margin-bottom: 5px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.step-content p {
  color: var(--text-muted);
  margin: 0;
}

.modal-footer {
  padding: 30px;
  border-top: 2px solid var(--neon-blue);
  text-align: center;
}

/* Transiciones */
.neon-slide-enter-active,
.neon-slide-leave-active {
  transition: all 0.5s ease;
}

.neon-slide-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.9);
}

.neon-slide-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.9);
}

.neon-modal-enter-active,
.neon-modal-leave-active {
  transition: opacity 0.3s ease;
}

.neon-modal-enter-from,
.neon-modal-leave-to {
  opacity: 0;
}

.neon-modal-enter-active .neon-modal-content,
.neon-modal-leave-active .neon-modal-content {
  transition: transform 0.3s ease;
}

.neon-modal-enter-from .neon-modal-content,
.neon-modal-leave-to .neon-modal-content {
  transform: scale(0.9);
}

/* Responsive */
@media (max-width: 768px) {
  .home-content {
    padding: 20px 16px;
  }
  
  .cta-section {
    padding: 30px 20px;
  }
  
  .neon-stats {
    flex-direction: column;
    align-items: center;
  }
  
  .stat {
    width: 100%;
    max-width: 300px;
  }
  
  .neon-actions,
  .neon-quick-nav {
    flex-direction: column;
  }
  
  .neon-actions .btn-neon,
  .neon-quick-nav .btn-neon {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .logo-text {
    font-size: 2.2rem;
  }
  
  .logo-subtitle {
    font-size: 1rem;
    letter-spacing: 2px;
  }
  
  .welcome-title, .login-title {
    font-size: 1.5rem;
  }
  
  .modal-header {
    padding: 20px;
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .instruction {
    flex-direction: column;
    text-align: center;
  }
}
</style>





