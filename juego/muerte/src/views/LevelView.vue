<template>
  <div class="neon-bg">

    <div class="level-card">
           <p class="neon-subtitle">Selecciona el nivel</p>
      <h1 class="neon-title">Categoría: {{ categoryName }}</h1>

      <div class="grid">
        <button class="level-btn" @click="selectLevel('facil')">
          😊 Fácil<br>
          <small>4–6 letras • 10 intentos</small>
        </button>

        <button class="level-btn" @click="selectLevel('medio')">
          😬 Medio<br>
          <small>6–8 letras • 7 intentos</small>
        </button>

        <button class="level-btn" @click="selectLevel('dificil')">
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
  return names[category.value]
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
  background: rgba(20, 10, 40, 0.7);
  padding: 40px;
  width: 90%;
  max-width: 500px;
  border-radius: 25px;
  border: 2px solid #9d4dff;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 20px #9d4dff, inset 0 0 40px #5e1aff;
  text-align: center;
  animation: fadeIn 0.8s ease;
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
  transition: 0.2s;
  box-shadow: 0 0 10px #4cddff;
}

.level-btn small {
  display: block;
  font-size: 0.9rem;
  opacity: 0.8;
}

.level-btn:hover {
  transform: scale(1.08);
  box-shadow: 0 0 20px #4cddff, inset 0 0 15px #6efbff;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(.9); }
  to { opacity: 1; transform: scale(1); }
}
</style>
