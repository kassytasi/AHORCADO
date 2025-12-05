<template>
  <div>
    <!-- FORMULARIO DE NOMBRE / LOGIN -->
    <div v-if="!jugador" class="login‑container">
      <h2>Ingresa tu nombre para jugar</h2>
      <form @submit.prevent="startGame">
        <input
          type="text"
          v-model="inputNombre"
          placeholder="Tu nombre"
          required
        />
        <button type="submit">Comenzar</button>
      </form>
      <p v-if="errorNombre" class="error‑msg">{{ errorNombre }}</p>
    </div>

    <!-- JUEGO -->
    <div v-else class="game-container">

      <!-- ENCABEZADO -->
      <header class="header">
        <div class="tag">🐾 Categoría: <strong>{{ categoria }}</strong></div>
        <div class="tag">🔥 Nivel: <strong>{{ nivel }}</strong></div>
        <div class="tag">❤️ Intentos: <strong>{{ intentos }} / {{ maxIntentos }}</strong></div>
        <div class="tag">⏱️ Tiempo: <strong>{{ tiempoFormateado }}</strong></div>
        <div class="tag">👤 Jugador: <strong>{{ jugador }}</strong></div>
      </header>

      <!-- BOTÓN para cambiar nombre -->
      <div class="logout‑btn-container">
        <button @click="logout" class="btn‑logout">🔄 Cambiar Nombre</button>
      </div>

      <!-- CANVAS / AHORCADO -->
      <div class="hangman-wrapper">
        <canvas ref="canvas" width="300" height="300"></canvas>
      </div>

      <!-- PALABRA A ADIVINAR -->
      <div class="word">
        <span
          v-for="(l, i) in palabraArray"
          :key="i"
          class="letra"
          :class="{ pop: l !== '_' }"
        >
          {{ l }}
        </span>
      </div>

      <!-- PISTA -->
      <div class="hint-box">
        <span>💡 Pista:</span>
        <strong>{{ pista }}</strong>
      </div>

      <!-- TECLADO LETRAS -->
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

      <!-- BOTÓN PARA VER RANKING -->
      <div class="ranking-btn-container" style="margin-top: 20px;">
        <button @click="mostrarRanking = true" class="btn‑ranking">🏆 Ver Mejores Tiempos</button>
      </div>

      <!-- MODAL / OVERLAY DE RANKING -->
      <div v-if="mostrarRanking" class="ranking-overlay">
        <div class="ranking-container">
          <h2>🏆 Mejores Tiempos</h2>
          <p class="subtitulo">Los jugadores más rápidos del ahorcado</p>

          <!-- PODIO TOP 3 -->
          <div class="podio‑top3" v-if="records.length > 0">
            <div class="podio-item segundo" v-if="records[1]">
              <div class="medalla">🥈</div>
              <div class="puesto">2</div>
              <div class="nombre">{{ records[1].jugador }}</div>
              <div class="tiempo">{{ records[1].tiempoTexto }}</div>
            </div>
            <div class="podio-item primero">
              <div class="medalla">🥇</div>
              <div class="puesto">1</div>
              <div class="nombre">{{ records[0].jugador }}</div>
              <div class="tiempo">{{ records[0].tiempoTexto }}</div>
            </div>
            <div class="podio-item tercero" v-if="records[2]">
              <div class="medalla">🥉</div>
              <div class="puesto">3</div>
              <div class="nombre">{{ records[2].jugador }}</div>
              <div class="tiempo">{{ records[2].tiempoTexto }}</div>
            </div>
          </div>

          <!-- LISTA COMPLETA DE RANKING -->
          <div class="ranking-lista">
            <div class="ranking-item" v-for="(r, i) in filtrados" :key="i">
              <span class="pos">{{ i + 1 }}</span>
              <span class="info">
                <strong>{{ r.jugador }}</strong> — {{ r.categoria }} · {{ r.nivel }}
              </span>
              <span class="time">{{ r.tiempoTexto }}</span>
              <span class="fecha">{{ r.fecha }}</span>
            </div>
          </div>

          <!-- BOTONES DE FILTRO -->
          <div class="ranking-filtros">
            <button :class="{ active: filtro === 'Todos' }" @click="filtro = 'Todos'">Todos</button>
            <button :class="{ active: filtro === 'Fácil' }" @click="filtro = 'Fácil'">Fácil</button>
            <button :class="{ active: filtro === 'Medio' }" @click="filtro = 'Medio'">Medio</button>
            <button :class="{ active: filtro === 'Difícil' }" @click="filtro = 'Difícil'">Difícil</button>
          </div>

          <button class="btn-close" @click="mostrarRanking = false">Cerrar</button>
        </div>
      </div>

      <!-- MODAL DE FIN DE JUEGO -->
      <div v-if="finalizado" class="modal">
        <div class="modal-content">
          <h2>{{ mensajeFinal }}</h2>
          <p v-if="perdiste">La palabra era: <strong>{{ palabra }}</strong></p>
          <button class="btn-restart" @click="reiniciarJuego">🔄 Jugar Otra Vez</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

/* ========= DATOS / JUEGO ========= */
const categoria = "Animales";
const nivel = "Difícil";

const palabras = [
  { palabra: "HIPOPOTAMO", pista: "Muy pesado, vive en ríos" },
  { palabra: "CAMALEON", pista: "Cambia de color" },
  { palabra: "AGUILA", pista: "Ave de presa" },
  { palabra: "ESCORPION", pista: "Tiene un aguijón" },
];

/* ========= ESTADO LOGIN ========= */
const inputNombre = ref("");
const jugador = ref(localStorage.getItem("ahorcado_jugador") || "");
const errorNombre = ref("");

// Validaciones de nombre
const minNombreLength = 2;
const maxNombreLength = 20;
const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;

function validarNombre(name) {
  if (!name) return "El nombre no puede quedar vacío.";
  if (name.length < minNombreLength) return `El nombre debe tener al menos ${minNombreLength} caracteres.`;
  if (name.length > maxNombreLength) return `El nombre no puede tener más de ${maxNombreLength} caracteres.`;
  if (!nombreRegex.test(name)) return "El nombre sólo puede contener letras y espacios.";
  return "";
}

function startGame() {
  const name = inputNombre.value.trim();
  const err = validarNombre(name);
  if (err) {
    errorNombre.value = err;
    return;
  }
  errorNombre.value = "";
  jugador.value = name;
  localStorage.setItem("ahorcado_jugador", name);
  initGameState();
}

function logout() {
  localStorage.removeItem("ahorcado_jugador");
  jugador.value = "";
}

/* ========= ESTADO DEL JUEGO ========= */
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
  tiempo.value = 0;

  setTimeout(() => {
    ctx = canvas.value.getContext("2d");
    dibujarHorca();
    iniciarTiempo();
  }, 0);
}

const intentos = ref(0);
const maxIntentos = 7;
const letrasUsadas = ref([]);
const finalizado = ref(false);
const perdiste = ref(false);
const mensajeFinal = ref("");
const palabraArray = ref([]);
const letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");

// Tiempo y ranking
const tiempo = ref(0);
let intervaloTiempo = null;

const mostrarRanking = ref(false);
const filtro = ref("Todos");
const records = ref(JSON.parse(localStorage.getItem("recordsAhorcado")) || []);

const filtrados = computed(() => {
  if (filtro.value === "Todos") return records.value;
  return records.value.filter(r => r.nivel === filtro.value);
});

/* CANVAS / DIBUJO */
const canvas = ref(null);
let ctx;

function dibujarHorca() {
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#000";
  ctx.lineCap = "round";
  // PALO
  ctx.beginPath();
  ctx.moveTo(80, 260);
  ctx.lineTo(80, 40);
  ctx.stroke();
  // BASE
  ctx.beginPath();
  ctx.moveTo(20, 260);
  ctx.lineTo(140, 260);
  ctx.stroke();
  // HORIZONTAL
  ctx.beginPath();
  ctx.moveTo(80, 40);
  ctx.lineTo(210, 40);
  ctx.stroke();
  // SOPORTE DIAGONAL
  ctx.beginPath();
  ctx.moveTo(80, 120);
  ctx.lineTo(210, 40);
  ctx.stroke();
  // CUERDA
  ctx.beginPath();
  ctx.moveTo(210, 40);
  ctx.lineTo(210, 85);
  ctx.stroke();
  // NUDO
  ctx.beginPath();
  ctx.arc(210, 105, 18, 0, Math.PI * 2);
  ctx.stroke();
}

function dibujarParte(parte) {
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#000";
  ctx.lineCap = "round";
  switch (parte) {
    case 1: ctx.beginPath(); ctx.arc(210, 145, 28, 0, Math.PI * 2); ctx.stroke(); break;
    case 2: ctx.beginPath(); ctx.moveTo(210, 173); ctx.lineTo(210, 235); ctx.stroke(); break;
    case 3: ctx.beginPath(); ctx.moveTo(210, 190); ctx.lineTo(175, 215); ctx.stroke(); break;
    case 4: ctx.beginPath(); ctx.moveTo(210, 190); ctx.lineTo(245, 215); ctx.stroke(); break;
    case 5: ctx.beginPath(); ctx.moveTo(210, 235); ctx.lineTo(190, 270); ctx.stroke(); break;
    case 6: ctx.beginPath(); ctx.moveTo(210, 235); ctx.lineTo(230, 270); ctx.stroke(); break;
    case 7:
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(198, 135); ctx.lineTo(208, 155);
      ctx.moveTo(208, 135); ctx.lineTo(198, 155);
      ctx.moveTo(215, 135); ctx.lineTo(225, 155);
      ctx.moveTo(225, 135); ctx.lineTo(215, 155);
      ctx.stroke();
      break;
  }
}

function usarLetra(letra) {
  if (finalizado.value) return;
  if (letrasUsadas.value.includes(letra)) return;

  letrasUsadas.value.push(letra);
  let acierto = false;
  palabra.split("").forEach((l, i) => {
    if (l === letra) { palabraArray.value[i] = letra; acierto = true; }
  });
  if (acierto) {
    if (!palabraArray.value.includes("_")) finalizarJuego(false);
  } else {
    intentos.value++;
    dibujarParte(intentos.value);
    if (intentos.value === maxIntentos) finalizarJuego(true);
  }
}

function finalizarJuego(perdio) {
  clearInterval(intervaloTiempo);
  perdiste.value = perdio;
  finalizado.value = true;
  mensajeFinal.value = perdio ? "❌ Perdiste" : "🎉 ¡Ganaste!";
  if (!perdio) guardarTiempo();
}

function guardarTiempo() {
  const nuevoRecord = {
    jugador: jugador.value,
    categoria,
    nivel,
    tiempo: tiempo.value,
    tiempoTexto: formatearTiempo(tiempo.value),
    fecha: new Date().toLocaleDateString(),
  };
  const arr = JSON.parse(localStorage.getItem("recordsAhorcado")) || [];
  arr.push(nuevoRecord);
  arr.sort((a, b) => a.tiempo - b.tiempo);
  localStorage.setItem("recordsAhorcado", JSON.stringify(arr));
  records.value = arr;
}

function reiniciarJuego() { initGameState(); }

function formatearTiempo(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}

onMounted(() => { if (jugador.value) initGameState(); });

function iniciarTiempo() { intervaloTiempo = setInterval(() => { tiempo.value++; }, 1000); }

const tiempoFormateado = computed(() => formatearTiempo(tiempo.value));
</script>

<style scoped>
/* Estilos login */
.login‑container { max-width: 300px; margin: 100px auto; padding: 20px; background: #fff; border-radius: 10px; text-align: center; box-shadow: 0 6px 20px rgba(0,0,0,0.1);}
.login‑container input { width: 100%; padding: 8px; margin-bottom: 12px; border: 1px solid #ccc; border-radius: 6px;}
.login‑container button { padding: 8px 16px; background: #5c7aff; color: white; border: none; border-radius: 6px; cursor: pointer;}
.error‑msg { color: red; margin-top: 8px;}

/* Estilos juego y ranking */
.game-container { width: 92%; max-width: 850px; margin: 20px auto; padding: 25px; background: #ffffff; border-radius: 18px; box-shadow: 0 8px 25px rgba(0,0,0,0.15); position: relative;}
.header { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 20px;}
.tag { background: #f4f4f4; padding: 10px 14px; border-radius: 12px; font-size: 15px;}
.hangman-wrapper { display: flex; justify-content: center; margin-bottom: 15px;}
.word { display: flex; justify-content: center; gap: 14px; font-size: 34px; margin-bottom: 15px;}
.letra { transition: 0.2s;}
.letra.pop { transform: scale(1.3);}
.hint-box { padding: 12px; background: #fff0b3; border-left: 5px solid #ffcc00; border-radius: 10px; margin-bottom: 25px; font-size: 18px;}
.keyboard { display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px;}
.key { padding: 14px 0; background: #5c7aff; border: none; border-radius: 10px; color: white; font-size: 18px; cursor: pointer;}
.key:disabled { background: #b5b5b5;}
.modal { position: absolute; inset: 0; backdrop-filter: blur(5px); display: flex; align-items: center; justify-content: center;}
.modal-content { background: white; padding: 25px; border-radius: 16px; width: 80%; max-width: 320px; text-align: center;}
.btn-restart { margin-top: 15px; padding: 12px 25px; background: #4e8cff; color: white; border-radius: 12px;}
.logout‑btn-container { text-align: right; margin-bottom: 10px;}
.btn‑logout { padding: 6px 14px; background: #ff5c5c; color: white; border: none; border-radius: 8px; cursor: pointer;}
.ranking-btn-container { text-align: center; margin-top: 20px;}
.btn‑ranking { padding: 10px 20px; background: #5c7aff; color: white; border: none; border-radius: 8px; cursor: pointer;}
.ranking-overlay { position: fixed; inset: 0; background: rgba(255,255,255,0.95); display: flex; align-items: center; justify-content: center; padding: 20px; overflow: auto; z-index: 1000;}
.ranking-container { background: #fff; border-radius: 16px; max-width: 600px; width: 100%; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center;}
.ranking-container h2 { margin-bottom: 5px;}
.subtitulo { color: #666; margin-bottom: 25px;}
.podio‑top3 { display: flex; justify-content: space-around; margin-bottom: 30px;}
.podio-item { flex: 1; background: #f9f9f9; margin: 0 5px; padding: 15px; border-radius: 10px;}
.medalla { font-size: 30px;}
.ranking-lista { max-height: 300px; overflow-y: auto; margin-bottom: 20px;}
.ranking-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #ddd; font-size: 15px;}
.ranking-filtros { display: flex; justify-content: center; gap: 10px; margin-bottom: 15px;}
.ranking-filtros button { padding: 6px 14px; border-radius: 6px; border: 1px solid #ccc; cursor: pointer;}
.ranking-filtros button.active { background: #5c7aff; color: white; border: none;}
.btn-close { padding: 10px 18px; border-radius: 8px; background: #ff5c5c; color: white; border: none; cursor: pointer;}
</style>




