<template>
  <div class="start-screen">

    <!-- Fondo animado -->
    <div class="background"></div>

    <div class="start-card">

      <!-- Pantalla inicial -->
      <div v-if="!mostrarLogin">
        <h1 class="title">🎲 AHORCADO</h1>
        <p class="subtitle">Adivina la palabra antes de que se complete el muñeco</p>

        <div class="hangman-preview">
          <svg width="120" height="150">
            <!-- Cabeza -->
            <circle cx="60" cy="30" r="15" stroke="#ffd700" stroke-width="4" fill="#ffecb3"/>
            <!-- Cuerpo -->
            <line x1="60" y1="45" x2="60" y2="90" stroke="#ffd700" stroke-width="4"/>
            <!-- Brazos -->
            <line x1="60" y1="55" x2="35" y2="70" stroke="#ffd700" stroke-width="4"/>
            <line x1="60" y1="55" x2="85" y2="70" stroke="#ffd700" stroke-width="4"/>
            <!-- Piernas -->
            <line x1="60" y1="90" x2="40" y2="120" stroke="#ffd700" stroke-width="4"/>
            <line x1="60" y1="90" x2="80" y2="120" stroke="#ffd700" stroke-width="4"/>
          </svg>
        </div>

        <button class="btn-play" @click="mostrarLogin = true">
          🚀 JUGAR AHORA
        </button>
      </div>

      <!-- Formulario solo de nombre -->
      <div v-else class="login-box">
        <p class="login-info">Escribe tu nombre para continuar</p>
        <input type="text" v-model="nombre" placeholder="Tu nombre..." class="login-input"/>
        <p v-if="error" class="error-msg">{{ error }}</p>
        <button class="btn-enter" @click="entrarAlJuego">Entrar</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const mostrarLogin = ref(false)
const nombre = ref('')
const error = ref('')

function entrarAlJuego() {
  if(!nombre.value.trim()){
    error.value = "Debes ingresar tu nombre"
    return
  }
  error.value = ""
  localStorage.setItem("ahorcado_jugador", nombre.value.trim())
  router.push("/categories")
}
</script>

<style scoped>
/* Fondo animado */
.start-screen {
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #120027, #4c0070);
  overflow: hidden;
}

.background {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(255,255,255,0.05), transparent 70%);
  animation: pulse 5s infinite alternate;
  z-index: 0;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.5; }
  100% { transform: scale(1.1); opacity: 1; }
}

/* Card central */
.start-card {
  position: relative;
  z-index: 1;
  background: rgba(30,10,60,0.85);
  padding: 45px;
  border-radius: 30px;
  text-align: center;
  width: 90%;
  max-width: 450px;
  box-shadow: 0 0 30px #ff6fff, inset 0 0 15px #c600ff;
  color: #fff;
}

/* Tipografía */
.title {
  font-size: 2.8rem;
  font-weight: bold;
  color: #ff6fff;
  text-shadow: 0 0 15px #ff6fff, 0 0 25px #c600ff;
  margin-bottom: 15px;
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 25px;
  color: #ff9eff;
}

/* Preview del muñeco */
.hangman-preview { margin-bottom: 25px; }

/* Botones */
.btn-play, .btn-enter {
  display: block;
  width: 100%;
  padding: 15px;
  margin-bottom: 12px;
  border-radius: 25px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.btn-play {
  background: linear-gradient(45deg, #ff8c42, #ffd93d);
  color: black;
}

.btn-play:hover, .btn-enter:hover { transform: scale(1.05); }

.btn-enter {
  background: linear-gradient(45deg, #1dd1a1, #00b894);
  color: black;
}

/* Input */
.login-box { text-align: center; }
.login-input {
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 15px;
  border: none;
  text-align: center;
  background: #f0e6ff;
}

/* Mensajes */
.error-msg { color: #ff4b4b; margin-bottom: 10px; }
.login-info { margin-bottom: 10px; color: #00ffe0; font-weight: bold; }

/* Responsive */
@media(max-width: 500px){
  .title { font-size: 2rem; }
  .subtitle { font-size: 1rem; }
  .start-card { padding: 25px; }
}
</style>




