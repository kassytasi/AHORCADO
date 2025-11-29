<template>
  <q-page class="game-wrapper column items-center q-pa-md">

    <!-- PANEL DE INFORMACIÓN -->
    <div class="info-panel column items-center q-pa-md q-mb-lg">
      <div class="title">🎮 AHORCADO</div>

      <div class="info-row">
        <span class="label">Categoría:</span>
        <span class="value neon">{{ categoryName }}</span>
      </div>

      <div class="info-row">
        <span class="label">Nivel:</span>
        <span class="value neon">{{ levelName }}</span>
      </div>

      <div class="info-row">
        <span class="label">Intentos:</span>
        <span class="value attempts">{{ attempts }}</span>
      </div>
    </div>

    <!-- AHORCADO -->
    <div class="hangman-area column items-center q-mb-lg">
      <svg width="260" height="260" class="neon-svg">
        <line x1="20" y1="240" x2="180" y2="240" stroke="#40c9ff" stroke-width="6"/>
        <line x1="100" y1="240" x2="100" y2="30" stroke="#40c9ff" stroke-width="6"/>
        <line x1="100" y1="30" x2="200" y2="30" stroke="#40c9ff" stroke-width="6"/>
        <line x1="200" y1="30" x2="200" y2="70" stroke="#40c9ff" stroke-width="4"/>

        <circle v-if="fails >= 1" cx="200" cy="95" r="25" stroke="#ff4c4c" stroke-width="4" fill="none"/>
        <line v-if="fails >= 2" x1="200" y1="120" x2="200" y2="180" stroke="#ff4c4c" stroke-width="4"/>
        <line v-if="fails >= 3" x1="200" y1="135" x2="170" y2="160" stroke="#ff4c4c" stroke-width="4"/>
        <line v-if="fails >= 4" x1="200" y1="135" x2="230" y2="160" stroke="#ff4c4c" stroke-width="4"/>
        <line v-if="fails >= 5" x1="200" y1="180" x2="170" y2="220" stroke="#ff4c4c" stroke-width="4"/>
        <line v-if="fails >= 6" x1="200" y1="180" x2="230" y2="220" stroke="#ff4c4c" stroke-width="4"/>
      </svg>

      <!-- PALABRA -->
      <div class="word row justify-center q-mt-md">
        <span v-for="(l,i) in wordArray" :key="i" class="letter">
          {{ guessed.includes(l) ? l.toUpperCase() : "_" }}
        </span>
      </div>

      <!-- PISTA -->
      <div class="hint-text q-mt-md">💡 {{ currentHint }}</div>
    </div>

    <!-- TECLADO -->
    <div class="keyboard column items-center q-mb-lg">
      <div v-for="(row, index) in keyboardRows" :key="index" class="keyboard-row row justify-center q-mb-sm">
        <q-btn
          v-for="l in row"
          :key="l"
          :label="l"
          color="cyan-5"
          text-color="white"
          flat
          glossy
          :disable="usedLetters.includes(l) || gameOver"
          class="key q-mx-xs q-my-xs"
          @click="press(l)"
        />
      </div>
    </div>

    <!-- MODAL GANASTE -->
    <q-dialog v-model="win">
      <q-card class="modal success">
        <q-card-section class="text-center">
          <div class="text-h5">🎉 ¡GANASTE!</div>
          <div>La palabra era: <strong>{{ word.toUpperCase() }}</strong></div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn label="🔄 Jugar otra vez" color="cyan" flat @click="restart"/>
          <q-btn label="🏠 Salir" color="red" flat @click="$router.push('/')"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- MODAL PERDISTE -->
    <q-dialog v-model="lose">
      <q-card class="modal fail">
        <q-card-section class="text-center">
          <div class="text-h5">💀 ¡PERDISTE!</div>
          <div>La palabra era: <strong>{{ word.toUpperCase() }}</strong></div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn label="🔄 Reintentar" color="cyan" flat @click="restart"/>
          <q-btn label="🏠 Salir" color="red" flat @click="$router.push('/')"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup>
import { ref, computed, watch } from "vue"

// --- Configuración inicial ---
const category = "animales"
const level = "facil"

const categoryNames = { animales:"Animales", frutas:"Frutas", paises:"Países", deportes:"Deportes", peliculas:"Películas", ciencia:"Ciencia" }
const levelNames = { facil:"Fácil", medio:"Medio", dificil:"Difícil" }

const categoryName = categoryNames[category]
const levelName = levelNames[level]

const attemptsConfig = { facil:10, medio:7, dificil:5 }
const attempts = ref(attemptsConfig[level])

const words = {
  animales:["perro","gato","oso","caballo","tiburon","elefante","leopardo"]
}

function filterByLevel(list){
  if(level==="facil") return list.filter(w=>w.length<=6)
  if(level==="medio") return list.filter(w=>w.length>=6 && w.length<=8)
  return list.filter(w=>w.length>=8)
}

let selectedWords = filterByLevel(words[category])
if(selectedWords.length===0) selectedWords=words[category]

const word = selectedWords[Math.floor(Math.random()*selectedWords.length)]
const wordArray = word.split("")

const hintsDB = {
  perro:["Animal doméstico","Ladra","Amigo fiel"],
  gato:["Tiene bigotes","Hace miau","Trepa"],
  elefante:["El animal más grande de tierra","Tiene trompa","Muy inteligente"],
  oso:["Animal grande","Come miel","Hiberna"],
  caballo:["Corre rápido","Se monta","Animal grande"],
  leopardo:["Tiene manchas","Corre veloz","Felino"],
  tiburon:["Vive en el mar","Depredador","Muy rápido"]
}

const currentHint = ref(hintsDB[word][0])

// --- Juego ---
const letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("")
const keyboardRows = [
  letters.slice(0,10),
  letters.slice(10,20),
  letters.slice(20)
]

const usedLetters = ref([])
const guessed = ref([])
const fails = ref(0)
const win = ref(false)
const lose = ref(false)
const gameOver = computed(()=>win.value || lose.value)

function press(l){
  if(gameOver.value) return
  usedLetters.value.push(l)
  const lower = l.toLowerCase()
  if(word.includes(lower)) guessed.value.push(lower)
  else { fails.value++; attempts.value-- }
}

watch([guessed, attempts], ()=>{
  if(attempts.value<=0) lose.value=true
  const remaining = wordArray.filter(l=>!guessed.value.includes(l))
  if(remaining.length===0) win.value=true
})

function restart(){ location.reload() }
</script>

<style scoped>
.game-wrapper{
  background: radial-gradient(circle at center, #0f0c29,#302b63,#24243e);
  min-height:100vh; color:#fff; font-family:'Press Start 2P',cursive; padding-top:1rem;
}
.info-panel{
  background: rgba(255,255,255,0.05); border:2px solid #40c9ff; border-radius:15px; box-shadow:0 0 15px #40c9ff,0 0 30px #ff4c4c; text-align:center;
}
.title{ font-size:1.8em; text-shadow:0 0 10px #40c9ff,0 0 20px #ff4c4c; margin-bottom:10px; }
.info-row{ display:flex; justify-content:space-between; width:200px; margin:5px 0; }
.label{ font-weight:bold; }
.value{ font-size:1.3em; text-shadow:0 0 5px #ff4c4c;}
.attempts{ color:#4cff4c; text-shadow:0 0 5px #4cff4c;}
.hangman-area{ background: rgba(255,255,255,0.03); padding:15px; border-radius:15px; box-shadow:0 0 20px #ff4c4c,0 0 30px #40c9ff; display:flex; flex-direction:column; align-items:center;}
.word .letter{ font-size:2em; margin:0 5px; color:#fff; text-shadow:0 0 5px #40c9ff,0 0 10px #ff4c4c;}
.hint-text{ color:#ffdd57; text-shadow:0 0 5px #ffdd57; font-style:italic; text-align:center;}
.keyboard-row{ flex-wrap: wrap;}
.key{ min-width:40px; min-height:40px; font-weight:bold; text-shadow:0 0 5px #0ff,0 0 10px #0ff; box-shadow:0 0 5px #0ff,0 0 10px #0ff; transition:0.2s;}
.key:disabled{ background:#222 !important; color:#555 !important; text-shadow:none; box-shadow:none;}
.modal.success{ border:2px solid #4cff4c; box-shadow:0 0 25px #4cff4c,0 0 50px #40c9ff;}
.modal.fail{ border:2px solid #ff4c4c; box-shadow:0 0 25px #ff4c4c,0 0 50px #ffdd57;}
</style>
