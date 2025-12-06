<template>
  <div class="neon-bg">

    <div class="level-card">
      <p class="neon-subtitle">Selecciona el nivel</p>
      <h1 class="neon-title">Categoría: {{ categoryName }}</h1>

      <div class="grid">
        <button class="level-btn facil" @click="selectLevel('facil')" title="4–6 letras • 10 intentos">
          😊 Fácil<br>
          <small>4–6 letras • 10 intentos</small>
        </button>

        <button class="level-btn medio" @click="selectLevel('medio')" title="6–8 letras • 7 intentos">
          😬 Medio<br>
          <small>6–8 letras • 7 intentos</small>
        </button>

        <button class="level-btn dificil" @click="selectLevel('dificil')" title="8+ letras • 5 intentos">
          😈 Difícil<br>
          <small>8+ letras • 5 intentos</small>
        </button>
      </div>

    </div>

  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router"
import { computed } from "vue"

const route = useRoute()
const router = useRouter()

const category = computed(() => route.query.category)

const categoryName = computed(() => {
  const names = {
    frutas: "Frutas",
    animales: "Animales",
    paises: "Países",
    deportes: "Deportes",
    peliculas: "Películas",
    ciencia: "Ciencia"
  }
  return names[category.value] || "Categoría";
})

function selectLevel(level) {
  router.push(`/game?category=${category.value}&level=${level}`)
}
</script>

<style scoped>
.neon-bg {
  min-height: 100vh;
  background: radial-gradient(circle at 20% 20%, #120027, #050010 70%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.level-card {
  background: rgba(20, 10, 40, 0.75);
  padding: 40px;
  width: 100%;
  max-width: 520px;
  border-radius: 25px;
  border: 2px solid #9d4dff;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 20px #9d4dff, inset 0 0 40px #5e1aff;
  text-align: center;
  animation: fadeIn 0.7s ease;
}

.neon-title {
  color: #c59dff;
  font-size: 1.3rem;
  margin-bottom: 25px;
}

.neon-subtitle {
  font-size: 2.2rem;
  color: #e0b6ff;
  margin-bottom: 20px;
  text-shadow: 0 0 15px #a845ff;
}

.grid {
  display: grid;
  gap: 20px;
}

.level-btn {
  background: transparent;
  border: 2px solid #4cddff;
  color: #4cddff;
  padding: 18px 20px;
  border-radius: 18px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: 0.2s ease;
  box-shadow: 0 0 10px #4cddff;
  text-shadow: 0 0 8px #4cddff;
}

.level-btn small {
  display: block;
  font-size: 0.9rem;
  opacity: 0.85;
}

.level-btn:hover {
  transform: scale(1.08);
}

.level-btn:active {
  transform: scale(.95);
  box-shadow: inset 0 0 15px #4cddff;
}

/* Colores por nivel */
.facil {
  border-color: #1dd1a1;
  color: #1dd1a1;
  box-shadow: 0 0 12px #1dd1a1;
}

.medio {
  border-color: #feca57;
  color: #feca57;
  box-shadow: 0 0 12px #feca57;
}

.dificil {
  border-color: #ff6b6b;
  color: #ff6b6b;
  box-shadow: 0 0 12px #ff6b6b;
}

@keyframes fadeIn {
  from { 
    opacity: 0; 
    transform: translateY(20px) scale(.95); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0) scale(1); 
  }
}

@media (max-width: 500px) {
  .level-card { padding: 25px; }
  .level-btn { font-size: 1.1rem; }
}
</style>




