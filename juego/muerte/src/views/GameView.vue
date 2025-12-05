<template>
  <div class="game-container">

    <!-- ENCABEZADO -->
    <header class="header">
      <div class="tag">🐾 Categoría: <strong>{{ categoria }}</strong></div>
      <div class="tag">🔥 Nivel: <strong>{{ nivel }}</strong></div>
      <div class="tag">❤️ Intentos: <strong>{{ intentos }} / {{ maxIntentos }}</strong></div>
    </header>

    <!-- AHORCADO -->
    <div class="hangman-wrapper">
      <canvas ref="canvas" width="300" height="300"></canvas>
    </div>

    <!-- PALABRA -->
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

    <!-- TECLADO -->
    <div class="keyboard">
      <button
        v-for="letra in letras"
        :key="letra"
        class="key"
        :disabled="letrasUsadas.includes(letra)"
        @click="usarLetra(letra)"
      >
        {{ letra }}
      </button>
    </div>

    <!-- MODAL -->
    <div v-if="finalizado" class="modal">
      <div class="modal-content">
        <h2>{{ mensajeFinal }}</h2>
        <p v-if="perdiste">La palabra era: <strong>{{ palabra }}</strong></p>
        <button class="btn-restart" @click="reiniciarJuego">🔄 Jugar Otra Vez</button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

/* ========= DATOS ========== */
const categoria = "Animales";
const nivel = "Difícil";

const palabras = [
  { palabra: "HIPOPOTAMO", pista: "Muy pesado, vive en ríos" },
  { palabra: "CAMALEON", pista: "Cambia de color" },
  { palabra: "AGUILA", pista: "Ave de presa" },
  { palabra: "ESCORPION", pista: "Tiene un aguijón" },
];

/* ========= ESTADO ========= */
const seleccion = palabras[Math.floor(Math.random() * palabras.length)];
const palabra = seleccion.palabra;
const pista = seleccion.pista;

const intentos = ref(0);
const maxIntentos = 7;
const letrasUsadas = ref([]);
const finalizado = ref(false);
const perdiste = ref(false);
const mensajeFinal = ref("");

const palabraArray = ref(Array(palabra.length).fill("_"));
const letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");

/* ========= CANVAS ========= */
const canvas = ref(null);
let ctx;

/* ========= DIBUJO ========= */
function dibujarHorca() {
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#000";
  ctx.lineCap = "round";

  // PALO VERTICAL
  ctx.beginPath();
  ctx.moveTo(80, 260);
  ctx.lineTo(80, 40);
  ctx.stroke();

  // BASE
  ctx.beginPath();
  ctx.moveTo(20, 260);
  ctx.lineTo(140, 260);
  ctx.stroke();

  // PALO HORIZONTAL
  ctx.beginPath();
  ctx.moveTo(80, 40);
  ctx.lineTo(210, 40);
  ctx.stroke();

  // SOPORTE DIAGONAL
  ctx.beginPath();
  ctx.moveTo(80, 120);
  ctx.lineTo(210, 40);
  ctx.stroke();

  // CUERDA FIJA
  ctx.beginPath();
  ctx.moveTo(210, 40);
  ctx.lineTo(210, 85);
  ctx.stroke();

  // NUDO REDONDO
  ctx.beginPath();
  ctx.arc(210, 105, 18, 0, Math.PI * 2);
  ctx.stroke();
}

function dibujarParte(parte) {
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#000";
  ctx.lineCap = "round";

  switch (parte) {
    case 1: // CABEZA
      ctx.beginPath();
      ctx.arc(210, 145, 28, 0, Math.PI * 2);
      ctx.stroke();
      break;

    case 2: // CUERPO
      ctx.beginPath();
      ctx.moveTo(210, 173);
      ctx.lineTo(210, 235);
      ctx.stroke();
      break;

    case 3: // BRAZO IZQ
      ctx.beginPath();
      ctx.moveTo(210, 190);
      ctx.lineTo(175, 215);
      ctx.stroke();
      break;

    case 4: // BRAZO DER
      ctx.beginPath();
      ctx.moveTo(210, 190);
      ctx.lineTo(245, 215);
      ctx.stroke();
      break;

    case 5: // PIERNA IZQ
      ctx.beginPath();
      ctx.moveTo(210, 235);
      ctx.lineTo(190, 270);
      ctx.stroke();
      break;

    case 6: // PIERNA DER
      ctx.beginPath();
      ctx.moveTo(210, 235);
      ctx.lineTo(230, 270);
      ctx.stroke();
      break;

    case 7: // OJOS X
      ctx.lineWidth = 3;

      ctx.beginPath();
      ctx.moveTo(198, 135);
      ctx.lineTo(208, 155);
      ctx.moveTo(208, 135);
      ctx.lineTo(198, 155);

      ctx.moveTo(215, 135);
      ctx.lineTo(225, 155);
      ctx.moveTo(225, 135);
      ctx.lineTo(215, 155);

      ctx.stroke();
      break;
  }
}

/* ========= LÓGICA ========= */
const sndCorrecto = new Audio("https://assets.mixkit.co/active_storage/sfx/1505/1505-preview.mp3");
const sndError = new Audio("https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3");
const sndWin = new Audio("https://assets.mixkit.co/active_storage/sfx/2769/2769-preview.mp3");
const sndLose = new Audio("https://assets.mixkit.co/active_storage/sfx/442/442-preview.mp3");

function usarLetra(letra) {
  letrasUsadas.value.push(letra);

  let acierto = false;

  palabra.split("").forEach((l, i) => {
    if (l === letra) {
      palabraArray.value[i] = letra;
      acierto = true;
    }
  });

  if (acierto) {
    sndCorrecto.play();
    if (!palabraArray.value.includes("_")) {
      sndWin.play();
      finalizarJuego(false);
    }
  } else {
    sndError.play();
    intentos.value++;
    dibujarParte(intentos.value);
    if (intentos.value === maxIntentos) {
      sndLose.play();
      finalizarJuego(true);
    }
  }
}

function finalizarJuego(perdio) {
  perdiste.value = perdio;
  finalizado.value = true;
  mensajeFinal.value = perdio ? "❌ Perdiste" : "🎉 ¡Ganaste!";
}

function reiniciarJuego() {
  window.location.reload();
}

onMounted(() => {
  ctx = canvas.value.getContext("2d");
  dibujarHorca(); // HORCA FIJA
});
</script>

<style scoped>
/* --- TODO TU CSS SIN CAMBIOS --- */
.game-container {
  width: 92%;
  max-width: 850px;
  margin: 20px auto;
  padding: 25px;
  background: #ffffff;
  border-radius: 18px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  position: relative;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.tag {
  background: #f4f4f4;
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 15px;
}

.hangman-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.word {
  display: flex;
  justify-content: center;
  gap: 14px;
  font-size: 34px;
  margin-bottom: 15px;
}

.letra {
  transition: 0.2s;
}

.letra.pop {
  transform: scale(1.3);
}

.hint-box {
  padding: 12px;
  background: #fff0b3;
  border-left: 5px solid #ffcc00;
  border-radius: 10px;
  margin-bottom: 25px;
  font-size: 18px;
}

.keyboard {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
}

.key {
  padding: 14px 0;
  background: #5c7aff;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 18px;
  cursor: pointer;
}

.key:disabled {
  background: #b5b5b5;
}

.modal {
  position: absolute;
  inset: 0;
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 25px;
  border-radius: 16px;
  width: 80%;
  max-width: 320px;
  text-align: center;
}

.btn-restart {
  margin-top: 15px;
  padding: 12px 25px;
  background: #4e8cff;
  color: white;
  border-radius: 12px;
}
</style>


