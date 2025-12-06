<template>
  <div class="game-container">

    <!-- HEADER -->
    <header class="header">
      <div class="tag">🐾 Categoría: <strong>{{ categoria }}</strong></div>
      <div class="tag">🔥 Nivel: <strong>{{ nivel }}</strong></div>
      <div class="tag">❤️ Intentos: <strong>{{ intentos }} / {{ maxIntentos }}</strong></div>
      <div class="tag">⏱️ Tiempo: <strong>{{ tiempoFormateado }}</strong></div>
      <div class="tag">👤 Jugador: <strong>{{ jugador }}</strong></div>
    </header>

    <!-- MUÑECO -->
    <div class="hangman-wrapper">
      <canvas ref="canvas" width="300" height="300"></canvas>
    </div>

    <!-- PALABRA -->
    <div class="word">
      <span v-for="(l,i) in palabraArray" :key="i" class="letra" :class="{ pop: l!=='_' }">{{ l }}</span>
    </div>

    <!-- PISTA -->
    <div class="hint-box" v-if="nivel!=='dificil'">💡 Pista: <strong>{{ pista }}</strong></div>

    <!-- TECLADO -->
    <div class="keyboard">
      <button v-for="letra in letras" :key="letra" class="key"
              :disabled="letrasUsadas.includes(letra) || finalizado"
              @click="usarLetra(letra)">
        {{ letra }}
      </button>
    </div>

    <!-- RANKING -->
    <div class="ranking-btn-container">
      <button @click="irRanking" class="btn-ranking">🏆 Ver Mejores Tiempos</button>
    </div>

    <!-- MODAL FIN DE JUEGO -->
    <transition name="modal">
      <div v-if="finalizado" class="modal">
        <div class="modal-content">
          <h2 :class="{ ganaste: !perdiste, perdiste: perdiste }">{{ mensajeFinal }}</h2>
          <p v-if="perdiste">La palabra era: <strong>{{ palabra }}</strong></p>
          <div class="volver-buttons">
            <button class="btn-restart" @click="reiniciarJuego">🔄 Volver a Jugar</button>
            <button class="btn-volver" @click="volverNivel">⬅️ Volver a Nivel</button>
            <button class="btn-volver" @click="volverCategoria">🏠 Volver a Categoría</button>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const categoria = route.query.category || "Animales";
const nivel = route.query.level || "facil";
const jugador = ref(localStorage.getItem("ahorcado_jugador")?.trim() || "Jugador");

/* PALABRAS Y PISTAS */
const palabras = [
  { palabra: "HIPOPOTAMO", pista: "Muy pesado, vive en ríos" },
  { palabra: "CAMALEON", pista: "Cambia de color" },
  { palabra: "AGUILA", pista: "Ave de presa" },
  { palabra: "ESCORPION", pista: "Tiene un aguijón" }
];

let seleccion, palabra, pista;

/* ESTADOS */
const intentos = ref(0);
const maxIntentos = computed(()=>{
  if(nivel==="facil") return 10;
  if(nivel==="medio") return 7;
  return 5;
});

const letrasUsadas = ref([]);
const finalizado = ref(false);
const perdiste = ref(false);
const mensajeFinal = ref("");
const palabraArray = ref([]);
const letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
const tiempo = ref(0);
let intervaloTiempo = null;

const canvas = ref(null);
let ctx;

/* INICIAR JUEGO */
function initGameState(){
  seleccion = palabras[Math.floor(Math.random()*palabras.length)];
  palabra = seleccion.palabra;
  pista = seleccion.pista;

  intentos.value = 0;
  letrasUsadas.value = [];
  finalizado.value = false;
  perdiste.value = false;
  mensajeFinal.value = "";
  palabraArray.value = Array(palabra.length).fill("_");
  tiempo.value = 0;

  setTimeout(()=>{
    ctx = canvas.value.getContext("2d");
    limpiarCanvas();
    dibujarHorca();
    iniciarTiempo();
  },0);
}

/* FUNCIONES DEL MUÑECO */
function limpiarCanvas(){ ctx.clearRect(0,0,canvas.value.width,canvas.value.height); }

function dibujarHorca(){
  ctx.lineWidth=5; ctx.strokeStyle="#fff"; ctx.lineCap="round";
  ctx.beginPath(); ctx.moveTo(80,260); ctx.lineTo(80,40); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(20,260); ctx.lineTo(140,260); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(80,40); ctx.lineTo(210,40); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(80,120); ctx.lineTo(210,40); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(210,40); ctx.lineTo(210,85); ctx.stroke();
  ctx.beginPath(); ctx.arc(210,105,18,0,Math.PI*2); ctx.stroke();
}

function dibujarParte(parte){
  ctx.lineWidth=5;
  switch(parte){
    case 1: ctx.beginPath(); ctx.arc(210,145,28,0,Math.PI*2); ctx.stroke(); break;
    case 2: ctx.beginPath(); ctx.moveTo(210,173); ctx.lineTo(210,235); ctx.stroke(); break;
    case 3: ctx.beginPath(); ctx.moveTo(210,190); ctx.lineTo(175,215); ctx.stroke(); break;
    case 4: ctx.beginPath(); ctx.moveTo(210,190); ctx.lineTo(245,215); ctx.stroke(); break;
    case 5: ctx.beginPath(); ctx.moveTo(210,235); ctx.lineTo(190,270); ctx.stroke(); break;
    case 6: ctx.beginPath(); ctx.moveTo(210,235); ctx.lineTo(230,270); ctx.stroke(); break;
    case 7:
      ctx.lineWidth=3;
      ctx.beginPath();
      ctx.moveTo(198,135); ctx.lineTo(208,155);
      ctx.moveTo(208,135); ctx.lineTo(198,155);
      ctx.moveTo(215,135); ctx.lineTo(225,155);
      ctx.moveTo(225,135); ctx.lineTo(215,155);
      ctx.stroke();
      break;
  }
}

/* FUNCIONES JUEGO */
function usarLetra(letra){
  if(finalizado.value) return;
  if(letrasUsadas.value.includes(letra)) return;

  letrasUsadas.value.push(letra);
  let acierto=false;
  palabra.split("").forEach((l,i)=>{ if(l===letra){ palabraArray.value[i]=letra; acierto=true; } });

  if(!acierto){
    intentos.value++;
    dibujarParte(intentos.value);
    if(intentos.value >= maxIntentos.value){ finalizarJuego(true); }
  } else {
    if(!palabraArray.value.includes("_")) finalizarJuego(false);
  }
}

function finalizarJuego(perdio){
  clearInterval(intervaloTiempo);
  perdiste.value = perdio;
  finalizado.value = true;
  mensajeFinal.value = perdio ? "❌ Perdiste" : "🎉 ¡Ganaste!";
  if(!perdio) guardarTiempo();
}

function reiniciarJuego(){ initGameState(); }
function volverNivel(){ router.push({ path:'/levels', query:{ category: categoria } }); }
function volverCategoria(){ router.push({ path:'/categories' }); }

/* GUARDAR TIEMPO MEJORADO */
function guardarTiempo(){
  const jugadorLimpio = jugador.value.trim() || "Jugador";
  localStorage.setItem("ahorcado_jugador", jugadorLimpio);

  const nuevoRecord = {
    jugador: jugadorLimpio,
    categoria,
    nivel,
    tiempo: tiempo.value,
    tiempoTexto: formatearTiempo(tiempo.value),
    fecha: new Date().toLocaleDateString()
  };

  const arr = JSON.parse(localStorage.getItem("recordsAhorcado"))||[];
  const indexExistente = arr.findIndex(r => r.jugador===jugadorLimpio && r.categoria===categoria && r.nivel===nivel);

  if(indexExistente>=0){
    if(nuevoRecord.tiempo < arr[indexExistente].tiempo){
      arr[indexExistente] = nuevoRecord;
    }
  } else {
    arr.push(nuevoRecord);
  }

  arr.sort((a,b)=>a.tiempo-b.tiempo);
  localStorage.setItem("recordsAhorcado", JSON.stringify(arr));
}

function iniciarTiempo(){ intervaloTiempo=setInterval(()=>{ tiempo.value++; },1000); }
function formatearTiempo(sec){ const m=String(Math.floor(sec/60)).padStart(2,"0"); const s=String(sec%60).padStart(2,"0"); return `${m}:${s}`; }
const tiempoFormateado = computed(()=>formatearTiempo(tiempo.value));

function irRanking(){ router.push('/ranking'); }

onMounted(()=>{ initGameState(); });
</script>

<style scoped>
/* Forzar fondo oscuro en todo el body para que no se vea blanco */
:global(body) {
  margin: 0;
  background-color: #0a001a; /* fondo negro/azulado */
  font-family: "Poppins", sans-serif;
  color: #ddd;
}

/* Contenedor principal con fondo negro y resplandor púrpura */
.game-container {
  width: 92%;
  max-width: 900px;
  margin: 20px auto;
  padding: 25px;
  background-color: #0a001a; /* fondo oscuro */
  border-radius: 18px;
  box-shadow: 0 0 30px 8px #7e4dff; /* resplandor púrpura */
  color: #ddd;
}

.header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 10px;
}

.tag {
  background: rgba(30, 20, 50, 0.7);
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 0 10px #9d4dff;
  text-shadow: 0 0 8px #5e1aff;
  color: #fff;
}

.volver-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.btn-volver {
  background: transparent;
  border: 2px solid #4cddff;
  color: #4cddff;
  padding: 6px 12px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 500;
  transition: 0.2s;
  box-shadow: 0 0 10px #4cddff;
  text-shadow: 0 0 5px #4cddff;
}

.btn-volver:hover {
  transform: scale(1.08);
}

.hangman-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.word {
  display: flex;
  justify-content: center;
  gap: 12px;
  font-size: 32px;
  margin-bottom: 15px;
  letter-spacing: 2px;
  color: #fff;
  text-shadow: 0 0 8px #ff6b6b;
}

.letra.pop {
  transform: scale(1.3);
  color: #ff6b6b;
  font-weight: bold;
  text-shadow: 0 0 12px #ff4c4c;
}

.hint-box {
  padding: 10px 12px;
  background: rgba(0, 255, 224, 0.1);
  border-radius: 10px;
  color: #00ffe0;
  box-shadow: 0 0 15px #00ffe0;
  font-weight: bold;
}

.keyboard {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-bottom: 20px;
}

.key {
  padding: 12px 0;
  background: transparent;
  border: 2px solid #1dd1a1;
  color: #1dd1a1;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
  text-shadow: 0 0 6px #1dd1a1;
}

.key:disabled {
  background: #333;
  color: #555;
  border-color: #555;
}

.key:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 0 10px #1dd1a1;
}

.ranking-btn-container {
  text-align: center;
  margin-bottom: 15px;
}

.btn-ranking {
  padding: 10px 18px;
  background: transparent;
  border: 2px solid #feca57;
  color: #feca57;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s;
  text-shadow: 0 0 6px #feca57;
}

.btn-ranking:hover {
  transform: scale(1.05);
  box-shadow: 0 0 12px #feca57;
}

.modal {
  position: fixed;
  inset: 0;
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  z-index: 1000;
}

.modal-content {
  background: rgba(30, 20, 50, 0.95);
  padding: 25px;
  border-radius: 16px;
  text-align: center;
  color: #fff;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 0 20px #9d4dff, inset 0 0 30px #5e1aff;
}

.ganaste {
  color: #1dd1a1;
  text-shadow: 0 0 15px #1dd1a1;
}

.perdiste {
  color: #ff4c4c;
  text-shadow: 0 0 15px #ff4c4c;
}

@media (max-width: 600px) {
  .word {
    font-size: 24px;
  }
  .keyboard {
    grid-template-columns: repeat(5, 1fr);
  }
  .header {
    flex-direction: column;
    gap: 8px;
  }
  .modal-content {
    padding: 20px;
  }
  .volver-buttons {
    flex-direction: column;
    gap: 8px;
  }
}
</style>









