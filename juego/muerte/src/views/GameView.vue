<template>
  <div class="game-container">

    <!-- HEADER -->
    <header class="header">
      <div class="tag">🐾 Categoría: <strong>{{ categoriaNombre }}</strong></div>
      <div class="tag">🔥 Nivel: <strong>{{ nivel }}</strong></div>
      <div class="tag">❤️ Intentos: <strong>{{ intentos }} / {{ maxIntentos }}</strong></div>
      <div class="tag">⏱️ Tiempo: <strong>{{ tiempoFormateado }}</strong></div>
      <div class="tag">👤 Jugadora: <strong>{{ jugador }}</strong></div>
    </header>

    <!-- AVATAR AHORCADO - MUJER -->
    <div class="hangman-container">
      
      <!-- ESTRUCTURA DE LA HORCA (SIEMPRE VISIBLE) -->
      <div class="gallows">
        <!-- BASE DE LA HORCA -->
        <div class="gallows-base"></div>
        <div class="gallows-stand"></div>
        <div class="gallows-beam"></div>
        <div class="gallows-rope"></div>
        
        <!-- MUÑECO - MUJER -->
        <!-- CABEZA -->
        <div class="woman-head" v-show="intentos >= 1">
          <div class="hair"></div>
          <div class="face">
            <div class="eye left-eye"></div>
            <div class="eye right-eye"></div>
            <div class="mouth" :class="{ sad: intentos >= maxIntentos }"></div>
          </div>
        </div>
        
        <!-- CUERPO -->
        <div class="woman-body" v-show="intentos >= 2"></div>
        
        <!-- BRAZO IZQUIERDO -->
        <div class="woman-arm left-arm" v-show="intentos >= 3"></div>
        
        <!-- BRAZO DERECHO -->
        <div class="woman-arm right-arm" v-show="intentos >= 4"></div>
        
        <!-- PIERNA IZQUIERDA -->
        <div class="woman-leg left-leg" v-show="intentos >= 5"></div>
        
        <!-- PIERNA DERECHA -->
        <div class="woman-leg right-leg" v-show="intentos >= 6"></div>
      </div>

      <!-- CONTADOR DE INTENTOS VISUAL -->
      <div class="attempts-counter">
        <div class="attempts-label">Vidas restantes:</div>
        <div class="attempts-hearts">
          <span v-for="i in maxIntentos" :key="i" 
                class="heart" 
                :class="{ 'heart-lost': i <= intentos }">
            ❤️
          </span>
        </div>
        <div class="attempts-text">{{ maxIntentos - intentos }} / {{ maxIntentos }}</div>
      </div>
    </div>

    <!-- PALABRA -->
    <div class="word">
      <span v-for="(l,i) in palabraArray"
            :key="i"
            class="letra"
            :class="{ revealed: l !== '_', correct: l !== '_' }">
        {{ l }}
      </span>
    </div>

    <!-- PISTA -->
    <div class="hint-box" v-if="nivel!=='dificil'">
      💡 Pista: <strong>{{ pista }}</strong>
    </div>

    <!-- TECLADO -->
    <div class="keyboard">
      <button v-for="letra in letras"
              :key="letra"
              class="key"
              :disabled="letrasUsadas.includes(letra) || finalizado"
              @click="usarLetra(letra)"
              :class="{
                'key-correct': letrasUsadas.includes(letra) && palabra.includes(letra),
                'key-wrong': letrasUsadas.includes(letra) && !palabra.includes(letra)
              }">
        {{ letra }}
      </button>
    </div>

    <!-- RANKING -->
    <div class="ranking-btn-container">
      <button @click="irRanking" class="btn-ranking">🏆 Ver Mejores Tiempos</button>
    </div>

    <!-- MODAL FINAL -->
    <transition name="modal">
      <div v-if="finalizado" class="modal">
        <div class="modal-content">
          <h2 :class="{ ganaste: !perdiste, perdiste: perdiste }">{{ mensajeFinal }}</h2>
          <p v-if="perdiste">La palabra era: <strong>{{ palabra }}</strong></p>
          
          <!-- ESTADÍSTICAS DEL JUEGO -->
          <div class="game-stats">
            <div class="stat">
              <span class="stat-icon">⏱️</span>
              <span class="stat-label">Tiempo:</span>
              <span class="stat-value">{{ tiempoFormateado }}</span>
            </div>
            <div class="stat">
              <span class="stat-icon">🎯</span>
              <span class="stat-label">Aciertos:</span>
              <span class="stat-value">{{ letrasUsadas.filter(l => palabra.includes(l)).length }}/{{ letrasUsadas.length }}</span>
            </div>
            <div class="stat">
              <span class="stat-icon">❤️</span>
              <span class="stat-label">Vidas usadas:</span>
              <span class="stat-value">{{ intentos }}/{{ maxIntentos }}</span>
            </div>
          </div>

          <div class="volver-buttons">
            <button class="btn-restart" @click="reiniciarJuego">🔄 Volver a Jugar</button>
            <button class="btn-volver" @click="volverNivel">⬅️ Volver a Niveles</button>
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

const categoria = route.query.category || "frutas";
const nivel = route.query.level || "facil";
const jugador = ref(localStorage.getItem("ahorcado_jugador")?.trim() || "Jugadora");

// Palabras por categoría (mismo código)
const palabrasPorCategoria = {
  frutas: [
    { palabra: "MANZANA", pista: "Roja o verde, se come cruda" },
    { palabra: "PLATANO", pista: "Amarillo y alargado" },
    { palabra: "FRESA", pista: "Pequeña y roja" },
    { palabra: "NARANJA", pista: "Cítrico y dulce" },
    { palabra: "MANGO", pista: "Dulce y tropical" }
  ],
  animales: [
    { palabra: "HIPOPOTAMO", pista: "Muy pesado" },
    { palabra: "CAMALEON", pista: "Cambia de color" },
    { palabra: "AGUILA", pista: "Ave de presa" },
    { palabra: "LEON", pista: "Rey de la selva" },
    { palabra: "TIBURON", pista: "Depredador marino" }
  ],
  peliculas: [
    { palabra: "TITANIC", pista: "Barco famoso" },
    { palabra: "INCEPTION", pista: "Sueños dentro de sueños" },
    { palabra: "JURASSIC", pista: "Dinosaurios" },
    { palabra: "GLADIADOR", pista: "Coliseo romano" },
    { palabra: "AVENGERS", pista: "Superhéroes" }
  ]
};

// ESTADOS DEL JUEGO
let seleccion, palabra, pista;
const intentos = ref(0);
const letrasUsadas = ref([]);
const finalizado = ref(false);
const perdiste = ref(false);
const mensajeFinal = ref("");
const palabraArray = ref([]);
const letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
const tiempo = ref(0);
let intervaloTiempo = null;

// NOMBRE CATEGORÍA
const categoriaNombre = computed(() => {
  const nombres = { frutas:"Frutas", animales:"Animales", peliculas:"Películas" };
  return nombres[categoria] || "Categoría";
});

// INTENTOS POR NIVEL (6 partes del cuerpo)
const maxIntentos = computed(() => {
  if (nivel === "facil") return 8;
  if (nivel === "medio") return 6;
  return 4;
});

// INICIAR JUEGO
function initGameState(){
  const arr = palabrasPorCategoria[categoria];
  seleccion = arr[Math.floor(Math.random()*arr.length)];
  palabra = seleccion.palabra;
  pista = seleccion.pista;

  intentos.value = 0;
  letrasUsadas.value = [];
  finalizado.value = false;
  perdiste.value = false;
  mensajeFinal.value = "";
  palabraArray.value = Array(palabra.length).fill("_");
  tiempo.value = 0;

  iniciarTiempo();
}

// MANEJAR LETRAS
function usarLetra(letra){
  if(finalizado.value || letrasUsadas.value.includes(letra)) return;

  letrasUsadas.value.push(letra);
  let acierto = false;

  palabra.split("").forEach((l,i)=>{
    if(l === letra){
      palabraArray.value[i] = letra;
      acierto = true;
    }
  });

  if(!acierto){
    intentos.value++;
    if(intentos.value >= maxIntentos.value) finalizarJuego(true);
  } else if(!palabraArray.value.includes("_")){
    finalizarJuego(false);
  }
}

function finalizarJuego(perdio){
  clearInterval(intervaloTiempo);
  perdiste.value = perdio;
  finalizado.value = true;
  mensajeFinal.value = perdio ? "❌ ¡Perdiste!" : "🎉 ¡Ganaste!";
  
  if(!perdio && jugador.value) {
    const puntuacion = {
      jugador: jugador.value,
      tiempo: tiempo.value,
      categoria: categoriaNombre.value,
      nivel: nivel,
      fecha: new Date().toISOString().split('T')[0]
    };
    
    const ranking = JSON.parse(localStorage.getItem('ahorcado_ranking') || '[]');
    ranking.push(puntuacion);
    ranking.sort((a, b) => a.tiempo - b.tiempo);
    localStorage.setItem('ahorcado_ranking', JSON.stringify(ranking.slice(0, 10)));
  }
}

function reiniciarJuego(){ initGameState(); }
function volverNivel(){ router.push({ path:'/levels', query:{ category: categoria } }); }
function volverCategoria(){ router.push('/categories'); }

// TIEMPO
function iniciarTiempo(){
  intervaloTiempo = setInterval(() => { tiempo.value++; }, 1000);
}

const tiempoFormateado = computed(()=>{
  const m = String(Math.floor(tiempo.value/60)).padStart(2,"0");
  const s = String(tiempo.value%60).padStart(2,"0");
  return `${m}:${s}`;
});

function irRanking(){ router.push('/ranking'); }

onMounted(()=>{ initGameState(); });
</script>

<style scoped>
:global(body){
  margin:0;
  background-color:#0a001a;
  font-family:"Poppins", sans-serif;
  color:#ddd;
}

.game-container{
  width:92%;
  max-width:900px;
  margin:20px auto;
  padding:25px;
  background: linear-gradient(145deg, #0a001a, #1a0035);
  border-radius:18px;
  box-shadow:0 0 30px 8px rgba(255, 105, 180, 0.3);
  border: 1px solid rgba(255, 105, 180, 0.2);
}

.header{
  display:flex;
  flex-wrap:wrap;
  justify-content:space-between;
  margin-bottom:20px;
  gap:10px;
}

.tag{
  background: linear-gradient(135deg, rgba(255, 105, 180, 0.2), rgba(255, 20, 147, 0.2));
  padding:8px 15px;
  border-radius:12px;
  font-size:14px;
  box-shadow:0 4px 15px rgba(255, 105, 180, 0.3);
  color:#fff;
  border: 1px solid rgba(255, 105, 180, 0.3);
  transition: transform 0.3s, box-shadow 0.3s;
}

.tag:hover {
  transform: translateY(-2px);
  box-shadow:0 6px 20px rgba(255, 105, 180, 0.4);
}

/* ---------- CONTENEDOR DEL AHORCADO ---------- */
.hangman-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0;
  padding: 25px;
  background: rgba(20, 10, 40, 0.7);
  border-radius: 20px;
  border: 2px solid rgba(255, 105, 180, 0.3);
  min-height: 350px;
}

/* ---------- ESTRUCTURA DE LA HORCA (SIEMPRE VISIBLE) ---------- */
.gallows {
  position: relative;
  width: 300px;
  height: 350px;
  flex-shrink: 0;
}

/* BASE DE LA HORCA */
.gallows-base {
  position: absolute;
  bottom: 0;
  left: 50px;
  width: 180px;
  height: 15px;
  background: linear-gradient(90deg, #9d4edd, #7b2cbf);
  box-shadow: 0 0 20px #9d4edd;
  border-radius: 8px;
}

.gallows-stand {
  position: absolute;
  bottom: 15px;
  left: 140px;
  width: 12px;
  height: 280px;
  background: linear-gradient(180deg, #9d4edd, #7b2cbf);
  box-shadow: 0 0 15px #9d4edd;
  border-radius: 6px;
}

.gallows-beam {
  position: absolute;
  top: 60px;
  left: 140px;
  width: 140px;
  height: 12px;
  background: linear-gradient(90deg, #9d4edd, #7b2cbf);
  box-shadow: 0 0 15px #9d4edd;
  border-radius: 6px;
}

.gallows-rope {
  position: absolute;
  top: 72px;
  left: 270px;
  width: 6px;
  height: 50px;
  background: linear-gradient(180deg, #c77dff, #9d4edd);
  border-radius: 3px;
  box-shadow: 0 0 10px #c77dff;
}

/* ---------- AVATAR FEMENINO ---------- */
/* CABEZA CON PELO */
.woman-head {
  position: absolute;
  top: 122px;
  left: 255px;
  width: 70px;
  height: 70px;
  transform: translateX(-50%);
  z-index: 2;
  animation: appear 0.5s ease-out;
}

.hair {
  position: absolute;
  top: -15px;
  left: -10px;
  width: 80px;
  height: 40px;
  background: linear-gradient(135deg, #8b4513, #d2691e);
  border-radius: 50% 50% 40% 40%;
  box-shadow: 0 5px 15px rgba(139, 69, 19, 0.5);
  z-index: 1;
}

.face {
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #ffd6cc, #ffb399);
  border-radius: 50%;
  border: 3px solid #e68a6d;
  box-shadow: 0 0 25px rgba(255, 182, 193, 0.5);
  z-index: 2;
}

.eye {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #000;
  border-radius: 50%;
  top: 20px;
  animation: blink 3s infinite;
}

.left-eye {
  left: 15px;
}

.right-eye {
  right: 15px;
}

.mouth {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 25px;
  height: 12px;
  border-bottom: 3px solid #c9184a;
  border-radius: 0 0 15px 15px;
  transition: all 0.3s;
}

.mouth.sad {
  border-bottom: none;
  border-top: 3px solid #c9184a;
  border-radius: 15px 15px 0 0;
}

/* CUERPO */
.woman-body {
  position: absolute;
  top: 192px;
  left: 255px;
  width: 10px;
  height: 80px;
  background: linear-gradient(180deg, #ff69b4, #ff1493);
  box-shadow: 0 0 20px rgba(255, 105, 180, 0.6);
  border-radius: 5px;
  transform: translateX(-50%);
  animation: appear 0.5s ease-out 0.1s both;
}

/* BRAZOS */
.woman-arm {
  position: absolute;
  width: 10px;
  height: 50px;
  background: linear-gradient(135deg, #ff69b4, #ff1493);
  box-shadow: 0 0 15px rgba(255, 105, 180, 0.6);
  border-radius: 5px;
  top: 200px;
  animation: appear 0.5s ease-out;
}

.left-arm {
  left: 225px;
  transform: rotate(45deg);
}

.right-arm {
  left: 285px;
  transform: rotate(-45deg);
}

/* PIERNAS */
.woman-leg {
  position: absolute;
  width: 10px;
  height: 60px;
  background: linear-gradient(135deg, #ff69b4, #ff1493);
  box-shadow: 0 0 15px rgba(255, 105, 180, 0.6);
  border-radius: 5px;
  top: 265px;
  animation: appear 0.5s ease-out;
}

.left-leg {
  left: 240px;
  transform: rotate(30deg);
}

.right-leg {
  left: 270px;
  transform: rotate(-30deg);
}

/* ANIMACIONES */
@keyframes appear {
  0% {
    opacity: 0;
    transform: scale(0.5) translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes blink {
  0%, 90%, 100% { height: 10px; }
  95% { height: 2px; }
}

/* CONTADOR DE INTENTOS */
.attempts-counter {
  flex: 1;
  padding: 20px;
  text-align: center;
  background: rgba(255, 105, 180, 0.1);
  border-radius: 15px;
  border: 1px solid rgba(255, 105, 180, 0.2);
}

.attempts-label {
  font-size: 20px;
  color: #ffb6c1;
  margin-bottom: 20px;
  text-shadow: 0 0 10px #ff69b4;
}

.attempts-hearts {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.heart {
  font-size: 32px;
  transition: all 0.3s;
  animation: heartbeat 1.5s infinite;
}

.heart-lost {
  opacity: 0.3;
  transform: scale(0.7);
  filter: grayscale(0.8);
  animation: none;
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.attempts-text {
  font-size: 26px;
  font-weight: bold;
  color: #ff69b4;
  text-shadow: 0 0 15px #ff1493;
}

/* PALABRA */
.word{
  display:flex;
  justify-content:center;
  gap:15px;
  font-size:38px;
  margin: 40px 0;
  color:#fff;
}

.letra{
  width: 55px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 5px solid #ff69b4;
  transition: all 0.3s;
}

.letra.revealed {
  color: #ffb6c1;
  text-shadow: 0 0 20px #ff69b4;
  transform: scale(1.3);
  animation: reveal 0.5s ease;
}

@keyframes reveal {
  0% { transform: scale(0.8); opacity: 0; }
  50% { transform: scale(1.4); }
  100% { transform: scale(1.3); opacity: 1; }
}

/* PISTA */
.hint-box{
  padding:15px 20px;
  background: linear-gradient(135deg, rgba(255, 182, 193, 0.1), rgba(255, 105, 180, 0.1));
  border-radius:12px;
  color:#ffb6c1;
  box-shadow:0 0 25px rgba(255, 105, 180, 0.3);
  margin: 25px 0;
  border: 1px solid rgba(255, 105, 180, 0.2);
  text-align: center;
  font-size: 16px;
}

/* TECLADO */
.keyboard{
  display:grid;
  grid-template-columns:repeat(7,1fr);
  gap:10px;
  margin: 30px 0;
}

.key{
  padding:15px 0;
  background: rgba(40, 20, 60, 0.7);
  border: 2px solid #ff69b4;
  color:#ffb6c1;
  border-radius:12px;
  cursor:pointer;
  transition: all 0.3s;
  font-size: 18px;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(255, 105, 180, 0.2);
}

.key:hover:not(:disabled){
  transform:translateY(-3px);
  box-shadow:0 8px 20px rgba(255, 105, 180, 0.4);
  background: rgba(255, 105, 180, 0.2);
}

.key:disabled{
  opacity:0.5;
  cursor:not-allowed;
}

.key-correct {
  background: rgba(152, 251, 152, 0.3);
  border-color: #98fb98;
  color: #98fb98;
}

.key-wrong {
  background: rgba(255, 99, 71, 0.3);
  border-color: #ff6347;
  color: #ff6347;
}

/* BOTÓN RANKING */
.btn-ranking{
  padding:14px 28px;
  background: linear-gradient(135deg, #ff69b4, #ff1493);
  border:none;
  color:#fff;
  border-radius:12px;
  cursor:pointer;
  font-size:16px;
  font-weight:bold;
  transition: all 0.3s;
  margin: 15px 0;
  box-shadow: 0 4px 15px rgba(255, 105, 180, 0.4);
}

.btn-ranking:hover{
  transform:translateY(-3px);
  box-shadow:0 8px 25px rgba(255, 20, 147, 0.5);
}

/* MODAL */
.modal{
  position:fixed;
  inset:0;
  backdrop-filter:blur(10px) brightness(0.7);
  display:flex;
  justify-content:center;
  align-items:center;
  z-index: 1000;
}

.modal-content{
  background: linear-gradient(145deg, #2a1b5f, #4a2c92);
  padding: 40px;
  border-radius: 20px;
  max-width:500px;
  width: 90%;
  border: 2px solid #ff69b4;
  box-shadow: 0 0 40px rgba(255, 105, 180, 0.5);
  text-align: center;
}

.ganaste{ 
  color:#98fb98;
  text-shadow: 0 0 25px #98fb98;
  font-size: 38px;
  margin-bottom: 20px;
}
.perdiste{ 
  color:#ff6347;
  text-shadow: 0 0 25px #ff6347;
  font-size: 38px;
  margin-bottom: 20px;
}

/* ESTADÍSTICAS DEL JUEGO */
.game-stats {
  display: flex;
  justify-content: space-around;
  margin: 25px 0;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.stat-icon {
  font-size: 24px;
}

.stat-label {
  font-size: 14px;
  color: #ffb6c1;
}

.stat-value {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
}

/* BOTONES MODAL */
.volver-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 25px;
}

.btn-restart, .btn-volver {
  padding: 16px 28px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-restart {
  background: linear-gradient(135deg, #ff69b4, #ff1493);
  color: white;
}

.btn-volver {
  background: rgba(255, 255, 255, 0.1);
  color: #ffb6c1;
  border: 2px solid #ff69b4;
}

.btn-restart:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 20, 147, 0.4);
}

.btn-volver:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 105, 180, 0.4);
  background: rgba(255, 105, 180, 0.2);
}

/* ANIMACIÓN MODAL */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.9);
  opacity: 0;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .hangman-container {
    flex-direction: column;
    gap: 30px;
  }
  
  .gallows {
    width: 250px;
    height: 300px;
  }
  
  .keyboard {
    grid-template-columns: repeat(5, 1fr);
  }
  
  .game-stats {
    flex-direction: column;
    gap: 15px;
  }
  
  .header {
    flex-direction: column;
    align-items: center;
  }
  
  .word {
    font-size: 28px;
  }
  
  .letra {
    width: 40px;
    height: 50px;
  }
}
</style>














