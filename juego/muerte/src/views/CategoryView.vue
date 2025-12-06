<template>
  <div class="neon-bg">
    <div class="category-card">

      <h1 class="neon-title">Selecciona una Categoría</h1>

      <div class="grid">
        <button class="cat-btn frutas" @click="select('frutas')">🥭 Frutas</button>
        <button class="cat-btn animales" @click="select('animales')">🐶 Animales</button>
        <button class="cat-btn paises" @click="select('paises')">🌍 Países</button>
        <button class="cat-btn deportes" @click="select('deportes')">⚽ Deportes</button>
        <button class="cat-btn peliculas" @click="select('peliculas')">🎬 Películas</button>
        <button class="cat-btn ciencia" @click="select('ciencia')">🔬 Ciencia</button>
      </div>

      <!-- BOTÓN VOLVER -->
      <button class="back-btn" @click="volverInicio">
        ⬅ Volver al inicio
      </button>

    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
const router = useRouter()

function select(category) {
  router.push(`/levels?category=${category}`)
}

function volverInicio() {
  router.push('/')
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
  background: rgba(20, 10, 40, 0.75);
  padding: 40px 30px;
  width: 100%;
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

/* ✅ En móvil pasa a 1 columna */
@media (max-width: 500px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

.cat-btn {
  background: transparent;
  border: 2px solid #4cddff;
  color: #4cddff;
  padding: 18px 20px;
  border-radius: 18px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: 0.2s ease;
  box-shadow: 0 0 10px #4cddff;
  text-shadow: 0 0 10px #4cddff;
}

/* EFECTO CLIC */
.cat-btn:active {
  transform: scale(.95);
  box-shadow: inset 0 0 20px #4cddff;
  background: rgba(76, 221, 255, 0.1);
}

.cat-btn:hover {
  transform: scale(1.08);
}

/* COLORES SUTILES POR CATEGORÍA */
.frutas { border-color: #ff9f43; box-shadow: 0 0 12px #ff9f43 }
.animales { border-color: #1dd1a1; box-shadow: 0 0 12px #1dd1a1 }
.paises { border-color: #54a0ff; box-shadow: 0 0 12px #54a0ff }
.deportes { border-color: #feca57; box-shadow: 0 0 12px #feca57 }
.peliculas { border-color: #ff6b6b; box-shadow: 0 0 12px #ff6b6b }
.ciencia { border-color: #5f27cd; box-shadow: 0 0 12px #5f27cd }

/* BOTÓN VOLVER */
.back-btn {
  margin-top: 30px;
  background: transparent;
  border: 2px solid #ff6ec7;
  color: #ff6ec7;
  padding: 12px 30px;
  border-radius: 30px;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 0 12px #ff6ec7;
  transition: .3s;
}

.back-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px #ff92d4;
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
</style>


