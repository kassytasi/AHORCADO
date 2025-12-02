<template>
  <div class="neon-bg">
    <div class="neon-card">

      <h1 class="neon-title">
        <span class="icon">🎮</span>
        AHORCADO
      </h1>

      <p class="neon-subtitle">¡Adivina la palabra antes de que sea tarde!</p>

      <div class="hangman-container">
        <svg width="240" height="220" class="neon-svg">
          <line x1="10" y1="200" x2="160" y2="200" stroke="#40c9ff" stroke-width="6" />
          <line x1="85" y1="200" x2="85" y2="20" stroke="#40c9ff" stroke-width="6" />
          <line x1="85" y1="20" x2="190" y2="20" stroke="#40c9ff" stroke-width="6" />
          <line x1="190" y1="20" x2="190" y2="70" stroke="#40c9ff" stroke-width="4" />
        </svg>
      </div>

      <button class="neon-btn" @click="goPlay">
        🚀 ¡JUGAR AHORA!
      </button>

    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function goPlay() {
  router.push('/categories')
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

.neon-card {
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
  font-size: 3rem;
  font-weight: 900;
  color: #d8b4ff;
  text-shadow: 0 0 10px #a845ff, 0 0 25px #6d00cc;
}

.icon {
  margin-right: 10px;
}

.neon-subtitle {
  color: #b98aff;
  font-size: 1.2rem;
  text-shadow: 0 0 8px #994aff;
  margin-bottom: 30px;
}

.neon-svg line {
  filter: drop-shadow(0 0 8px #40c9ff);
}

.neon-btn {
  background: transparent;
  border: 2px solid #40c9ff;
  color: #40c9ff;
  padding: 15px 45px;
  border-radius: 30px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: 0.25s ease;
  box-shadow: 0 0 12px #40c9ff;
  text-shadow: 0 0 10px #40c9ff;
}

.neon-btn:hover {
  transform: scale(1.07);
  box-shadow: 0 0 25px #40c9ff, inset 0 0 20px #6efbff;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>
