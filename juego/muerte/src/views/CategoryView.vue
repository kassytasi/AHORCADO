<template>
  <div class="neon-bg">
    <div class="category-card">
      <h1 class="neon-title">Selecciona una Categoría</h1>

      <div class="grid">
        <button class="cat-btn" @click="select('frutas')">🥭 Frutas</button>
        <button class="cat-btn" @click="select('animales')">🐶 Animales</button>
        <button class="cat-btn" @click="select('paises')">🌍 Países</button>
        <button class="cat-btn" @click="select('deportes')">⚽ Deportes</button>
        <button class="cat-btn" @click="select('peliculas')">🎬 Películas</button>
        <button class="cat-btn" @click="select('ciencia')">🔬 Ciencia</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
const router = useRouter()

function select(category) {
  router.push(`/levels?category=${category}`)
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

.category-card {
  background: rgba(20, 10, 40, 0.7);
  padding: 40px;
  width: 90%;
  max-width: 600px;
  border-radius: 25px;
  border: 2px solid #9d4dff;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 20px #9d4dff, inset 0 0 40px #5e1aff;
  text-align: center;
  animation: fadeIn 0.8s ease;
}

.neon-title {
  font-size: 2.4rem;
  margin-bottom: 25px;
  color: #e0b6ff;
  text-shadow: 0 0 10px #a845ff, 0 0 25px #6d00cc;
}

.grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);
}

.cat-btn {
  background: transparent;
  border: 2px solid #4cddff;
  color: #4cddff;
  padding: 18px 20px;
  border-radius: 18px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: 0 0 10px #4cddff;
  text-shadow: 0 0 10px #4cddff;
}

.cat-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 0 20px #4cddff, inset 0 0 15px #6efbff;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(.9); }
  to { opacity: 1; transform: scale(1); }
}
</style>
