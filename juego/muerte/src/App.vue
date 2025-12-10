<template>
  <div id="app">
    <!-- Navegación principal -->
    <nav class="main-nav" v-if="showNavigation">
      <div class="nav-container">
        <router-link to="/" class="nav-logo">
          <span class="logo-icon">🎮</span>
          <span class="logo-text">Ahorcado</span>
        </router-link>
        
        <div class="nav-links">
          <router-link to="/" class="nav-link" exact-active-class="active">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" 
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9 22V12H15V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Inicio</span>
          </router-link>
          
          <router-link to="/categories" class="nav-link" active-class="active">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
              <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
              <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
              <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
            </svg>
            <span>Categorías</span>
          </router-link>
          
          <router-link to="/ranking" class="nav-link" active-class="active">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6.4 19L12 12.5882L17.6 19M6.4 5L12 11.4118L17.6 5M4 8L20 8M4 16L20 16" 
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Ranking</span>
          </router-link>
        </div>
        
        <div class="nav-user" v-if="currentUser">
          <div class="user-info">
            <span class="user-avatar">{{ getUserAvatar }}</span>
            <span class="user-name">{{ currentUser }}</span>
          </div>
          <button class="logout-btn" @click="logout" title="Cerrar sesión">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" 
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16 17L21 12L16 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        
        <!-- Botón móvil -->
        <button class="mobile-menu-btn" @click="toggleMobileMenu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 12H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      
      <!-- Menú móvil -->
      <transition name="slide-down">
        <div v-if="mobileMenuOpen" class="mobile-menu">
          <div class="mobile-user" v-if="currentUser">
            <div class="user-avatar">{{ getUserAvatar }}</div>
            <div class="user-details">
              <div class="user-name">{{ currentUser }}</div>
              <div class="user-stats">
                <span class="stat">🏆 12 victorias</span>
                <span class="stat">⏱️ 2:34 min</span>
              </div>
            </div>
          </div>
          
          <div class="mobile-links">
            <router-link to="/" class="mobile-link" @click="closeMobileMenu" exact-active-class="active">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" 
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 22V12H15V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Inicio</span>
            </router-link>
            
            <router-link to="/categories" class="mobile-link" @click="closeMobileMenu" active-class="active">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
                <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
                <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
                <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
              </svg>
              <span>Categorías</span>
            </router-link>
            
            <router-link to="/ranking" class="mobile-link" @click="closeMobileMenu" active-class="active">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M6.4 19L12 12.5882L17.6 19M6.4 5L12 11.4118L17.6 5M4 8L20 8M4 16L20 16" 
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Ranking</span>
            </router-link>
            
            <button class="mobile-logout" @click="logout">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" 
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 17L21 12L16 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      </transition>
    </nav>

    <!-- Contenido principal -->
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Footer -->
    <footer class="main-footer" v-if="showNavigation">
      <div class="footer-content">
        <div class="footer-section">
          <h4>🎮 Ahorcado Game</h4>
          <p>El clásico juego de palabras reinventado</p>
          <div class="social-links">
            <a href="#" class="social-link" title="Twitter">🐦</a>
            <a href="#" class="social-link" title="GitHub">💻</a>
            <a href="#" class="social-link" title="Contacto">📧</a>
          </div>
        </div>
        
        <div class="footer-section">
          <h4>Enlaces rápidos</h4>
          <router-link to="/" class="footer-link">🏠 Inicio</router-link>
          <router-link to="/categories" class="footer-link">🎯 Categorías</router-link>
          <router-link to="/ranking" class="footer-link">🏆 Ranking</router-link>
        </div>
        
        <div class="footer-section">
          <h4>Estadísticas</h4>
          <div class="footer-stats">
            <span class="stat">👥 1,284 jugadores</span>
            <span class="stat">🎮 5,842 partidas</span>
            <span class="stat">📚 150 palabras</span>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>© 2024 Ahorcado Game. Todos los derechos reservados.</p>
        <p class="version">Versión 2.0.0</p>
      </div>
    </footer>

    <!-- Notificaciones (opcional) -->
    <transition-group name="notification" tag="div" class="notifications">
      <div v-for="notification in notifications" :key="notification.id" 
           class="notification" :class="notification.type">
        <span class="notification-icon">{{ notification.icon }}</span>
        <div class="notification-content">
          <p class="notification-title">{{ notification.title }}</p>
          <p class="notification-message">{{ notification.message }}</p>
        </div>
        <button class="notification-close" @click="removeNotification(notification.id)">
          ×
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const currentUser = ref("")
const mobileMenuOpen = ref(false)
const notifications = ref([])

// Computed
const showNavigation = computed(() => {
  return route.name !== 'game' // Ocultar navegación en el juego
})

const getUserAvatar = computed(() => {
  if (!currentUser.value) return "👤"
  const avatars = ["👩", "👨", "🧑", "👧", "👦", "🦸", "🧙", "🧚"]
  const index = currentUser.value.charCodeAt(0) % avatars.length
  return avatars[index]
})

// Métodos
function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
}

function logout() {
  localStorage.removeItem("ahorcado_jugador")
  localStorage.removeItem("ahorcado_player_data")
  currentUser.value = ""
  mobileMenuOpen.value = false
  // Redirigir al inicio
  window.location.href = '/'
}

function showNotification(type, title, message) {
  const id = Date.now()
  const icons = {
    success: "✅",
    error: "❌",
    info: "ℹ️",
    warning: "⚠️"
  }
  
  notifications.value.push({
    id,
    type,
    icon: icons[type] || "ℹ️",
    title,
    message
  })
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    removeNotification(id)
  }, 5000)
}

function removeNotification(id) {
  notifications.value = notifications.value.filter(n => n.id !== id)
}

// Ciclo de vida
onMounted(() => {
  // Cargar usuario actual
  const savedUser = localStorage.getItem("ahorcado_jugador")
  if (savedUser) {
    currentUser.value = savedUser
  }
  
  // Cerrar menú móvil al hacer clic fuera
  document.addEventListener('click', (event) => {
    const nav = document.querySelector('.main-nav')
    const menuBtn = document.querySelector('.mobile-menu-btn')
    if (nav && !nav.contains(event.target) && menuBtn && !menuBtn.contains(event.target)) {
      mobileMenuOpen.value = false
    }
  })
})

// Watch para cambios de ruta
watch(() => route.path, () => {
  mobileMenuOpen.value = false
  window.scrollTo(0, 0)
})
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-gradient);
}

/* Navegación */
.main-nav {
  background: rgba(20, 10, 40, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(157, 77, 255, 0.2);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 70px;
  max-width: 1400px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 16px;
  }
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: var(--text-light);
  font-size: 1.5rem;
  font-weight: 700;
  transition: transform var(--transition-normal);
}

.nav-logo:hover {
  transform: scale(1.05);
}

.logo-icon {
  font-size: 1.8rem;
  animation: float 3s ease-in-out infinite;
}

.logo-text {
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.nav-links {
  display: flex;
  gap: 2px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius);
  padding: 4px;
}

@media (max-width: 1024px) {
  .nav-links {
    display: none;
  }
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  text-decoration: none;
  color: var(--text-muted);
  font-weight: 500;
  border-radius: calc(var(--border-radius) - 4px);
  transition: all var(--transition-normal);
}

.nav-link:hover {
  color: var(--text-light);
  background: rgba(255, 255, 255, 0.1);
}

.nav-link.active {
  color: var(--text-light);
  background: rgba(255, 105, 180, 0.2);
  box-shadow: var(--shadow-primary);
}

.nav-user {
  display: flex;
  align-items: center;
  gap: 16px;
}

@media (max-width: 1024px) {
  .nav-user {
    display: none;
  }
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.user-avatar {
  font-size: 1.2rem;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}

.user-name {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-light);
}

.logout-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.3);
  border-radius: var(--border-radius);
  color: #FF6B6B;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.logout-btn:hover {
  background: rgba(255, 107, 107, 0.2);
  transform: translateY(-2px);
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  padding: 8px;
  border-radius: var(--border-radius);
}

@media (max-width: 1024px) {
  .mobile-menu-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

/* Menú móvil */
.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(20, 10, 40, 0.98);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(157, 77, 255, 0.2);
  padding: 20px;
  z-index: 99;
}

.mobile-user {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius);
  margin-bottom: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-user .user-avatar {
  font-size: 1.8rem;
  width: 60px;
  height: 60px;
}

.user-details {
  flex: 1;
}

.user-details .user-name {
  font-size: 1.2rem;
  margin-bottom: 4px;
}

.user-stats {
  display: flex;
  gap: 12px;
  font-size: 0.8rem;
  color: var(--text-muted);
}

.mobile-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  text-decoration: none;
  color: var(--text-muted);
  font-weight: 500;
  border-radius: var(--border-radius);
  transition: all var(--transition-normal);
}

.mobile-link:hover {
  color: var(--text-light);
  background: rgba(255, 255, 255, 0.1);
}

.mobile-link.active {
  color: var(--text-light);
  background: rgba(255, 105, 180, 0.2);
  box-shadow: var(--shadow-primary);
}

.mobile-logout {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.3);
  border-radius: var(--border-radius);
  color: #FF6B6B;
  cursor: pointer;
  font-weight: 500;
  transition: all var(--transition-normal);
  margin-top: 8px;
}

.mobile-logout:hover {
  background: rgba(255, 107, 107, 0.2);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

/* Contenido principal */
.main-content {
  flex: 1;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.3s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}

/* Footer */
.main-footer {
  background: rgba(10, 5, 25, 0.95);
  border-top: 1px solid rgba(157, 77, 255, 0.2);
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  padding: 40px 24px;
  max-width: 1400px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 30px 16px;
  }
}

.footer-section h4 {
  color: var(--text-light);
  font-size: 1.2rem;
  margin-bottom: 16px;
}

.footer-section p {
  color: var(--text-muted);
  margin-bottom: 16px;
  line-height: 1.5;
}

.social-links {
  display: flex;
  gap: 12px;
}

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  color: var(--text-light);
  text-decoration: none;
  transition: all var(--transition-normal);
}

.social-link:hover {
  background: rgba(255, 105, 180, 0.2);
  transform: translateY(-3px);
}

.footer-link {
  display: block;
  color: var(--text-muted);
  text-decoration: none;
  padding: 8px 0;
  transition: color var(--transition-normal);
}

.footer-link:hover {
  color: var(--primary-color);
}

.footer-stats {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer-stats .stat {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px 24px;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.footer-bottom p {
  margin: 4px 0;
}

.version {
  color: var(--accent-color);
  font-weight: 500;
}

/* Notificaciones */
.notifications {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
}

.notification {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: var(--bg-card);
  border-radius: var(--border-radius);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  animation: slideInRight 0.3s ease;
  max-width: 400px;
}

.notification.success {
  border-color: rgba(29, 209, 161, 0.3);
  background: rgba(29, 209, 161, 0.1);
}

.notification.error {
  border-color: rgba(255, 107, 107, 0.3);
  background: rgba(255, 107, 107, 0.1);
}

.notification.info {
  border-color: rgba(76, 221, 255, 0.3);
  background: rgba(76, 221, 255, 0.1);
}

.notification.warning {
  border-color: rgba(254, 202, 87, 0.3);
  background: rgba(254, 202, 87, 0.1);
}

.notification-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.notification-content {
  flex: 1;
  min-width: 0;
}

.notification-title {
  font-weight: 600;
  color: var(--text-light);
  margin-bottom: 4px;
  font-size: 0.95rem;
}

.notification-message {
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.4;
}

.notification-close {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
  flex-shrink: 0;
}

.notification-close:hover {
  background: rgba(255, 255, 255, 0.1);
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
