<template>
  <div>

    <!-- ============ PANTALLA INICIO ============ -->
    <div v-if="pantalla === 'inicio'" class="inicio-container">
      <h1>🪢 Ahorcado</h1>
      <canvas ref="canvasInicio" width="300" height="300"></canvas>

      <button class="btn-jugar" @click="pantalla = 'login'">
        🎮 JUGAR AHORA
      </button>
    </div>

    <!-- ============ LOGIN ============ -->
    <div v-if="pantalla === 'login'" class="login-container">
      <h2>Ingresa tu nombre para jugar</h2>

      <form @submit.prevent="startGame">
        <input v-model="inputNombre" placeholder="Tu nombre" required>
        <button type="submit">Comenzar</button>
      </form>

      <p v-if="errorNombre" class="error-msg">{{ errorNombre }}</p>

      <button class="volver" @click="pantalla = 'inicio'">
        ⬅ Volver
      </button>
    </div>

    <!-- ============ JUEGO ============ -->
    <div v-if="pantalla === 'juego'" class="game-container">

      <!-- ENCABEZADO -->
      <header class="header">
        <div class="tag">🐾 Categoría: <strong>{{ categoria }}</strong></div>
        <div class="tag">🔥 Nivel: <strong>{{ nivel }}</strong></div>
        <div class="tag">❤️ Intentos: <strong>{{ intentos }} / {{ maxIntentos }}</strong></div>
        <div class="tag">⏱️ Tiempo: <strong>{{ tiempoFormateado }}</strong></div>
        <div class="tag">👤 Jugador: <strong>{{ jugador }}</strong></div>
      </header>

      <div class="logout-btn-container">
        <button @click="logout" class="btn-logout">🔄 Cambiar Nombre</button>
      </div>

      <!-- AHORCADO -->
      <div class="hangman-wrapper">
        <canvas ref="canvas" width="300" height="300"></canvas>
      </div>

      <!-- PALABRA -->
      <div class="word">
        <span v-for="(l, i) in palabraArray" :key="i" class="letra" :class="{ pop: l !== '_' }">
          {{ l }}
        </span>
      </div>

      <!-- PISTA -->
      <div class="hint-box">
        💡 Pista: <strong>{{ pista }}</strong>
      </div>

      <!-- TECLADO -->
      <div class="keyboard">
        <button
          v-for="letra in letras"
          :key="letra"
          class="key"
          :disabled="letrasUsadas.includes(letra) || finalizado"
          @click="usarLetra(letra)"
        >
          {{ letra }}
        </button>
      </div>

      <!-- RANKING -->
      <div class="ranking-btn-container">
        <button @click="mostrarRanking = true" class="btn-ranking">
          🏆 Ver Mejores Tiempos
        </button>
      </div>

      <!-- MODAL FINAL -->
      <div v-if="finalizado" class="modal">
        <div class="modal-content">
          <h2>{{ mensajeFinal }}</h2>
          <p v-if="perdiste">
            La palabra era: <strong>{{ palabra }}</strong>
          </p>
          <button class="btn-restart" @click="reiniciarJuego">🔄 Jugar Otra Vez</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from "vue";

/* ============ CONTROL DE PANTALLAS ============ */
const pantalla = ref("inicio")

/* ============ DATOS ============ */
const categoria = "Animales";
const nivel = "Difícil";

const palabras = [
  { palabra: "HIPOPOTAMO", pista: "Muy pesado, vive en ríos" },
  { palabra: "CAMALEON", pista: "Cambia de color" },
  { palabra: "AGUILA", pista: "Ave de presa" },
  { palabra: "ESCORPION", pista: "Tiene un aguijón" },
];

/* ============ LOGIN ============ */
const inputNombre = ref("");
const jugador = ref("");
const errorNombre = ref("");

function validarNombre(name) {
  if (name.length < 2) return "Nombre muy corto";
  return "";
}

function startGame() {
  const err = validarNombre(inputNombre.value);
  if (err) {
    errorNombre.value = err;
    return;
  }

  jugador.value = inputNombre.value;
  pantalla.value = "juego";

  nextTick(() => {
    initGameState()
  })
}

function logout() {
  jugador.value = "";
  inputNombre.value = "";
  pantalla.value = "inicio";
}

/* ============ JUEGO ============ */
const intentos = ref(0);
const maxIntentos = 7;
const letrasUsadas = ref([]);
const finalizado = ref(false);
const perdiste = ref(false);
const mensajeFinal = ref("");
const palabraArray = ref([]);
const letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");

let seleccion;
let palabra;
let pista;

function initGameState() {
  seleccion = palabras[Math.floor(Math.random() * palabras.length)];
  palabra = seleccion.palabra;
  pista = seleccion.pista;

  intentos.value = 0;
  letrasUsadas.value = [];
  finalizado.value = false;
  perdiste.value = false;
  mensajeFinal.value = "";
  palabraArray.value = Array(palabra.length).fill("_");

  ctx = canvas.value.getContext("2d")
  ctx.clearRect(0, 0, 300, 300)
  dibujarHorca()
}

/* ============ CANVAS ============ */
const canvas = ref(null)
const canvasInicio = ref(null)
let ctx;

onMounted(() => {
  if(canvasInicio.value){
    const ctx2 = canvasInicio.value.getContext("2d")
    ctx2.lineWidth = 5
    ctx2.moveTo(150,40)
    ctx2.lineTo(150,230)
    ctx2.stroke()
  }
})

function dibujarHorca() {
  ctx.beginPath();
  ctx.moveTo(80, 260);
  ctx.lineTo(80, 40);
  ctx.stroke();
}

function dibujarParte(parte) {
  ctx.beginPath();
  if (parte === 1) ctx.arc(210, 145, 30, 0, Math.PI * 2)
  if (parte === 2) { ctx.moveTo(210,175); ctx.lineTo(210,235) }
  if (parte === 3) { ctx.moveTo(210,190); ctx.lineTo(175,215) }
  if (parte === 4) { ctx.moveTo(210,190); ctx.lineTo(245,215) }
  if (parte === 5) { ctx.moveTo(210,235); ctx.lineTo(190,270) }
  if (parte === 6) { ctx.moveTo(210,235); ctx.lineTo(230,270) }
  ctx.stroke();
}

/* ============ LÓGICA LETRAS ============ */
function usarLetra(letra) {
  if (finalizado.value) return;

  letrasUsadas.value.push(letra);
  let acierto = false;

  palabra.split("").forEach((l, i) => {
    if(l === letra){
      palabraArray.value[i] = letra;
      acierto = true;
    }
  })

  if(!acierto){
    intentos.value++;
    dibujarParte(intentos.value)
    if(intentos.value === maxIntentos){
      finalizar(true)
    }
  } else {
    if(!palabraArray.value.includes("_")){
      finalizar(false)
    }
  }
}

function finalizar(estado) {
  finalizado.value = true;
  perdiste.value = estado;
  mensajeFinal.value = estado ? "😢 Perdiste" : "🎉 Ganaste";
}

function reiniciarJuego(){
  initGameState()
}
</script>

<style scoped>

.inicio-container{
  display:flex;
  flex-direction:column;
  align-items:center;
  margin-top:60px;
}

.btn-jugar{
  margin-top:20px;
  padding:15px 40px;
  background:#6495ff;
  color:white;
  border:none;
  border-radius:12px;
  font-size:20px;
  cursor:pointer;
}

/* Login */
.login-container{
  max-width:300px;
  margin: 100px auto;
  padding:20px;
  background:#fff;
  border-radius:12px;
  text-align:center;
}

/* Juego */
.game-container{
  max-width:800px;
  margin:30px auto;
  padding:20px;
  background:#fff;
}

.word{
  display:flex;
  gap:15px;
  justify-content:center;
  font-size:32px;
}

.key{
  padding:8px;
  background:#6495ff;
  color:white;
  border:none;
  border-radius:8px;
}

.keyboard{
  display:grid;
  grid-template-columns:repeat(7,1fr);
  gap:6px;
  margin-top:20px;
}

.modal{
  position:fixed;
  inset:0;
  display:flex;
  align-items:center;
  justify-content:center;
  background:rgba(0,0,0,0.5)
}

.modal-content{
  background:white;
  padding:20px;
  border-radius:15px;
}

</style>






