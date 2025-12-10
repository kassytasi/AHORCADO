<template>
  <div class="ranking-neon-container">
    <!-- Efectos de fondo neón -->
    <div class="neon-grid"></div>
    <div class="neon-scan-line"></div>
    <div class="corner-glow corner-tl neon-pink"></div>
    <div class="corner-glow corner-tr neon-blue"></div>
    <div class="corner-glow corner-bl neon-green"></div>
    <div class="corner-glow corner-br neon-orange"></div>

    <!-- Header NEÓN -->
    <header class="ranking-header card-neon card-neon-purple">
      <div class="header-content">
        <div class="header-title">
          <h1 class="main-title neon-pink neon-flicker">
            🏆 RANKING NEÓN 🏆
          </h1>
          <p class="subtitle neon-blue">
            Los mejores tiempos en la historia del juego
          </p>
        </div>
        
        <div class="header-actions">
          <button class="btn-neon btn-neon-blue" @click="actualizarRanking">
            <span class="btn-icon">🔄</span>
            <span class="btn-text">ACTUALIZAR</span>
          </button>
          <button class="btn-neon btn-neon-green" @click="volverAlJuego">
            <span class="btn-icon">🎮</span>
            <span class="btn-text">VOLVER A JUGAR</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Estadísticas globales -->
    <div class="global-stats">
      <div class="stat-card card-neon card-neon-blue">
        <div class="stat-icon neon-pink">👥</div>
        <div class="stat-content">
          <div class="stat-value neon-green">{{ totalJugadores }}</div>
          <div class="stat-label">JUGADORES ÚNICOS</div>
        </div>
      </div>
      
      <div class="stat-card card-neon card-neon-green">
        <div class="stat-icon neon-blue">🎮</div>
        <div class="stat-content">
          <div class="stat-value neon-orange">{{ totalPartidas }}</div>
          <div class="stat-label">PARTIDAS JUGADAS</div>
        </div>
      </div>
      
      <div class="stat-card card-neon card-neon-orange">
        <div class="stat-icon neon-green">⏱️</div>
        <div class="stat-content">
          <div class="stat-value neon-purple">{{ tiempoPromedio }}</div>
          <div class="stat-label">TIEMPO PROMEDIO</div>
        </div>
      </div>
      
      <div class="stat-card card-neon card-neon-pink">
        <div class="stat-icon neon-yellow">🎯</div>
        <div class="stat-content">
          <div class="stat-value neon-blue">{{ tasaExito }}%</div>
          <div class="stat-label">TASA DE ÉXITO</div>
        </div>
      </div>
    </div>

    <!-- Filtros NEÓN -->
    <div class="filters-section card-neon card-neon-blue">
      <div class="filter-group">
        <div class="filter-label neon-green">
          <span class="filter-icon">🎯</span>
          FILTRAR POR CATEGORÍA
        </div>
        <div class="filter-buttons">
          <button
            v-for="cat in categoriasFiltro"
            :key="cat.value"
            class="btn-neon btn-neon-small"
            :class="{ 
              'btn-neon-pink': filtroCategoria === cat.value,
              'btn-neon-outline': filtroCategoria !== cat.value 
            }"
            @click="filtroCategoria = cat.value"
          >
            {{ cat.icon }} {{ cat.label }}
          </button>
        </div>
      </div>
      
      <div class="filter-group">
        <div class="filter-label neon-orange">
          <span class="filter-icon">🔥</span>
          FILTRAR POR NIVEL
        </div>
        <div class="filter-buttons">
          <button
            v-for="nivel in nivelesFiltro"
            :key="nivel.value"
            class="btn-neon btn-neon-small"
            :class="{ 
              'btn-neon-green': filtroNivel === nivel.value,
              'btn-neon-outline': filtroNivel !== nivel.value 
            }"
            @click="filtroNivel = nivel.value"
          >
            {{ nivel.icon }} {{ nivel.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Podio NEÓN -->
    <div class="podium-section" v-if="recordsFiltrados.length >= 3">
      <h2 class="section-title neon-yellow neon-flicker">
        🥇 PODIO DE CAMPEONES 🥇
      </h2>
      
      <div class="podium">
        <!-- Segundo lugar -->
        <div class="podium-place second">
          <div class="place-number neon-blue">2</div>
          <div class="player-card card-neon card-neon-blue">
            <div class="player-medal">🥈</div>
            <div class="player-info">
              <div class="player-name neon-blue">
                {{ recordsFiltrados[1]?.jugador || 'JUGADOR' }}
              </div>
              <div class="player-time neon-green">
                {{ formatTime(recordsFiltrados[1]?.tiempo) }}
              </div>
              <div class="player-date neon-purple">
                {{ formatDate(recordsFiltrados[1]?.fecha) }}
              </div>
              <div class="player-hour neon-pink">
                {{ formatHour(recordsFiltrados[1]?.timestamp) }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- Primer lugar -->
        <div class="podium-place first">
          <div class="place-number neon-yellow">1</div>
          <div class="player-card card-neon card-neon-yellow">
            <div class="player-medal">🥇</div>
            <div class="player-info">
              <div class="player-name neon-yellow">
                {{ recordsFiltrados[0]?.jugador || 'CAMPEÓN' }}
              </div>
              <div class="player-time neon-pink">
                {{ formatTime(recordsFiltrados[0]?.tiempo) }}
              </div>
              <div class="player-date neon-blue">
                {{ formatDate(recordsFiltrados[0]?.fecha) }}
              </div>
              <div class="player-hour neon-green">
                {{ formatHour(recordsFiltrados[0]?.timestamp) }}
              </div>
            </div>
            <div class="crown">👑</div>
          </div>
        </div>
        
        <!-- Tercer lugar -->
        <div class="podium-place third">
          <div class="place-number neon-orange">3</div>
          <div class="player-card card-neon card-neon-orange">
            <div class="player-medal">🥉</div>
            <div class="player-info">
              <div class="player-name neon-orange">
                {{ recordsFiltrados[2]?.jugador || 'JUGADOR' }}
              </div>
              <div class="player-time neon-green">
                {{ formatTime(recordsFiltrados[2]?.tiempo) }}
              </div>
              <div class="player-date neon-purple">
                {{ formatDate(recordsFiltrados[2]?.fecha) }}
              </div>
              <div class="player-hour neon-blue">
                {{ formatHour(recordsFiltrados[2]?.timestamp) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabla de ranking NEÓN -->
    <div class="ranking-table-section">
      <div class="table-header">
        <h2 class="section-title neon-purple neon-flicker">
          📊 CLASIFICACIÓN COMPLETA
        </h2>
        
        <div class="table-controls">
          <div class="table-info neon-blue">
            Mostrando <strong>{{ recordsFiltrados.length }}</strong> registros
          </div>
          <div class="table-sort">
            <button 
              class="btn-neon btn-neon-small"
              :class="{ 'btn-neon-green': ordenActual === 'tiempo' }"
              @click="ordenarPorTiempo"
            >
              ⏱️ POR TIEMPO
            </button>
            <button 
              class="btn-neon btn-neon-small"
              :class="{ 'btn-neon-green': ordenActual === 'fecha' }"
              @click="ordenarPorFecha"
            >
              📅 POR FECHA
            </button>
          </div>
        </div>
      </div>
      
      <div class="ranking-table-container card-neon card-neon-purple">
        <div class="table-scroll">
          <table class="ranking-table">
            <thead>
              <tr>
                <th class="col-position">
                  <div class="header-cell neon-pink">#</div>
                </th>
                <th class="col-player">
                  <div class="header-cell neon-blue">JUGADOR</div>
                </th>
                <th class="col-category">
                  <div class="header-cell neon-green">CATEGORÍA</div>
                </th>
                <th class="col-level">
                  <div class="header-cell neon-orange">NIVEL</div>
                </th>
                <th class="col-time">
                  <div class="header-cell neon-purple">TIEMPO</div>
                </th>
                <th class="col-date">
                  <div class="header-cell neon-yellow">FECHA Y HORA</div>
                </th>
                <th class="col-actions">
                  <div class="header-cell neon-red">ACCIONES</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(record, index) in paginatedRecords"
                :key="record.id"
                :class="{
                  'current-player': record.jugador === currentPlayer,
                  'podium-row': index < 3 && record.ranking <= 3
                }"
              >
                <td class="col-position">
                  <div class="position-cell" :class="getPositionClass(index + 1)">
                    {{ index + 1 }}
                  </div>
                </td>
                
                <td class="col-player">
                  <div class="player-cell">
                    <div class="player-avatar" :class="getAvatarClass(record.jugador)">
                      {{ getAvatar(record.jugador) }}
                    </div>
                    <div class="player-details">
                      <div class="player-name">
                        {{ record.jugador }}
                        <span v-if="record.jugador === currentPlayer" class="you-badge neon-green">
                          (TÚ)
                        </span>
                      </div>
                      <div class="player-level" :class="getLevelClass(record.nivel)">
                        {{ getLevelLabel(record.nivel) }}
                      </div>
                    </div>
                  </div>
                </td>
                
                <td class="col-category">
                  <div class="category-cell">
                    <span class="category-icon">{{ getCategoryIcon(record.categoria) }}</span>
                    <span class="category-name">{{ record.categoria }}</span>
                  </div>
                </td>
                
                <td class="col-level">
                  <span class="level-badge" :class="getLevelClass(record.nivel)">
                    {{ getLevelLabel(record.nivel) }}
                  </span>
                </td>
                
                <td class="col-time">
                  <div class="time-cell">
                    <div class="time-value" :class="getTimeClass(record.tiempo)">
                      {{ formatTime(record.tiempo) }}
                    </div>
                    <div class="time-unit">segundos</div>
                  </div>
                </td>
                
                <td class="col-date">
                  <div class="date-cell">
                    <div class="date-day">{{ formatDate(record.fecha) }}</div>
                    <div class="date-time">{{ formatTimeOfDay(record.timestamp) }}</div>
                  </div>
                </td>
                
                <td class="col-actions">
                  <div class="actions-cell">
                    <button
                      class="btn-neon btn-neon-small btn-neon-blue"
                      @click="verDetalle(record)"
                      title="Ver detalles"
                    >
                      👁️
                    </button>
                    <button
                      v-if="record.jugador === currentPlayer"
                      class="btn-neon btn-neon-small btn-neon-pink"
                      @click="compartirLogro(record)"
                      title="Compartir logro"
                    >
                      📤
                    </button>
                  </div>
                </td>
              </tr>
              
              <!-- Estado vacío -->
              <tr v-if="recordsFiltrados.length === 0">
                <td colspan="7" class="empty-state">
                  <div class="empty-content">
                    <div class="empty-icon neon-blue">📊</div>
                    <h3 class="empty-title neon-pink">¡NO HAY REGISTROS AÚN!</h3>
                    <p class="empty-message neon-green">
                      Sé el primero en aparecer en el ranking
                    </p>
                    <button class="btn-neon btn-neon-pink" @click="volverAlJuego">
                      🎮 JUGAR AHORA
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Paginación -->
        <div class="pagination" v-if="recordsFiltrados.length > itemsPerPage">
          <button
            class="pagination-btn btn-neon btn-neon-small"
            :class="{ 'btn-neon-disabled': currentPage === 1 }"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            ⬅️ ANTERIOR
          </button>
          
          <div class="pagination-info neon-blue">
            Página {{ currentPage }} de {{ totalPages }}
          </div>
          
          <button
            class="pagination-btn btn-neon btn-neon-small"
            :class="{ 'btn-neon-disabled': currentPage === totalPages }"
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            SIGUIENTE ➡️
          </button>
        </div>
      </div>
    </div>

    <!-- Tu posición -->
    <div class="your-position" v-if="miPosicion !== -1">
      <h3 class="position-title neon-green neon-flicker">
        🎯 TU POSICIÓN EN EL RANKING
      </h3>
      <div class="position-card card-neon card-neon-green">
        <div class="position-rank">
          <div class="rank-number neon-pink">{{ miPosicion + 1 }}</div>
          <div class="rank-label neon-blue">posición global</div>
        </div>
        
        <div class="position-stats">
          <div class="stat">
            <div class="stat-icon neon-yellow">🏆</div>
            <div class="stat-content">
              <div class="stat-value neon-orange">{{ mejorTiempo }}</div>
              <div class="stat-label">MEJOR TIEMPO</div>
            </div>
          </div>
          
          <div class="stat">
            <div class="stat-icon neon-blue">🎮</div>
            <div class="stat-content">
              <div class="stat-value neon-purple">{{ partidasJugadas }}</div>
              <div class="stat-label">PARTIDAS</div>
            </div>
          </div>
          
          <div class="stat">
            <div class="stat-icon neon-pink">⭐</div>
            <div class="stat-content">
              <div class="stat-value neon-green">{{ categoriaFavorita }}</div>
              <div class="stat-label">CATEGORÍA FAVORITA</div>
            </div>
          </div>
        </div>
        
        <button class="btn-neon btn-neon-pink" @click="volverAlJuego">
          ⚡ MEJORAR MI POSICIÓN
        </button>
      </div>
    </div>

    <!-- Modal de detalle -->
    <transition name="neon-modal">
      <div v-if="detalleVisible" class="detail-modal-overlay" @click.self="detalleVisible = false">
        <div class="detail-modal-content card-neon card-neon-blue">
          <div class="modal-header">
            <h2 class="modal-title neon-blue neon-flicker">📈 DETALLES DEL LOGRO</h2>
            <button class="modal-close btn-neon btn-neon-red btn-neon-small" @click="detalleVisible = false">
              ✕
            </button>
          </div>
          
          <div class="modal-body">
            <div class="player-detail">
              <div class="detail-avatar" :class="getAvatarClass(registroDetalle?.jugador)">
                {{ getAvatar(registroDetalle?.jugador) }}
              </div>
              <div class="detail-info">
                <h3 class="detail-name neon-pink">{{ registroDetalle?.jugador }}</h3>
                <div class="detail-rank neon-green">Posición #{{ obtenerPosicion(registroDetalle) + 1 }}</div>
              </div>
            </div>
            
            <div class="detail-stats">
              <div class="stat-row">
                <div class="stat-label neon-blue">CATEGORÍA</div>
                <div class="stat-value">
                  <span class="category-badge neon-green">
                    {{ registroDetalle?.categoria }}
                  </span>
                </div>
              </div>
              
              <div class="stat-row">
                <div class="stat-label neon-orange">NIVEL</div>
                <div class="stat-value">
                  <span class="level-badge" :class="getLevelClass(registroDetalle?.nivel)">
                    {{ getLevelLabel(registroDetalle?.nivel) }}
                  </span>
                </div>
              </div>
              
              <div class="stat-row">
                <div class="stat-label neon-purple">TIEMPO</div>
                <div class="stat-value time-highlight neon-yellow">
                  {{ formatTime(registroDetalle?.tiempo) }}
                </div>
              </div>
              
              <div class="stat-row">
                <div class="stat-label neon-pink">FECHA</div>
                <div class="stat-value neon-blue">
                  {{ formatFullDate(registroDetalle?.fecha) }}
                </div>
              </div>
              
              <div class="stat-row">
                <div class="stat-label neon-green">HORA</div>
                <div class="stat-value neon-orange">
                  {{ formatHour(registroDetalle?.timestamp) }}
                </div>
              </div>
            </div>
            
            <div class="detail-comparison card-neon card-neon-purple">
              <h4 class="comparison-title neon-purple">📊 COMPARACIÓN</h4>
              <div class="comparison-item">
                <span class="comparison-label neon-blue">Tiempo promedio:</span>
                <span class="comparison-value neon-green">{{ tiempoPromedioCategoria }} segundos</span>
              </div>
              <div class="comparison-item">
                <span class="comparison-label neon-orange">Mejor tiempo global:</span>
                <span class="comparison-value neon-yellow">{{ mejorTiempoGlobal }} segundos</span>
              </div>
              <div class="comparison-item">
                <span class="comparison-label neon-pink">Diferencia:</span>
                <span class="comparison-value" :class="getDiffClass(registroDetalle?.tiempo)">
                  {{ calcularDiferencia(registroDetalle?.tiempo) }}
                </span>
              </div>
            </div>
          </div>
          
          <div class="modal-footer">
            <button class="btn-neon btn-neon-pink" @click="compartirLogro(registroDetalle)">
              🎉 COMPARTIR LOGRO
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// Función exportable para guardar resultados (para usar en otros componentes)
export function guardarResultadoEnRanking(tiempo, categoria, nivel, exito) {
  const jugador = localStorage.getItem('ahorcado_jugador') || 'Jugador'
  const ahora = new Date() // FECHA/HORA ACTUAL DEL SISTEMA
  
  const nuevoRecord = {
    id: `record-real-${Date.now()}`,
    jugador: jugador,
    categoria: categoria,
    nivel: nivel,
    tiempo: tiempo,
    fecha: ahora.toISOString().split('T')[0],
    timestamp: ahora.toISOString(),
    exito: exito
  }
  
  const recordsGuardados = JSON.parse(localStorage.getItem('ahorcado_ranking')) || []
  recordsGuardados.push(nuevoRecord)
  localStorage.setItem('ahorcado_ranking', JSON.stringify(recordsGuardados))
  
  return nuevoRecord
}
</script>

<script setup>
import { ref, computed, onMounted, watch } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

// Estados
const records = ref([])
const filtroCategoria = ref("Todos")
const filtroNivel = ref("Todos")
const currentPage = ref(1)
const itemsPerPage = 15
const ordenActual = ref("tiempo")
const detalleVisible = ref(false)
const registroDetalle = ref(null)

// Estadísticas globales
const totalJugadores = computed(() => {
  const jugadoresUnicos = new Set(records.value.map(r => r.jugador))
  return jugadoresUnicos.size
})

const totalPartidas = computed(() => {
  return records.value.length
})

const tiempoPromedio = computed(() => {
  if (records.value.length === 0) return "0:00"
  const total = records.value.reduce((sum, r) => sum + r.tiempo, 0)
  const promedio = Math.floor(total / records.value.length)
  return formatTime(promedio)
})

const tasaExito = computed(() => {
  if (records.value.length === 0) return 0
  const exitos = records.value.filter(r => r.exito).length
  return Math.round((exitos / records.value.length) * 100)
})

const partidasJugadas = computed(() => {
  return records.value.filter(r => r.jugador === currentPlayer.value).length
})

const mejorTiempo = computed(() => {
  const misRecords = records.value.filter(r => r.jugador === currentPlayer.value && r.exito)
  if (misRecords.length === 0) return "N/A"
  const mejor = Math.min(...misRecords.map(r => r.tiempo))
  return formatTime(mejor)
})

const categoriaFavorita = computed(() => {
  const misRecords = records.value.filter(r => r.jugador === currentPlayer.value)
  if (misRecords.length === 0) return "Ninguna"
  
  const categorias = misRecords.reduce((acc, r) => {
    acc[r.categoria] = (acc[r.categoria] || 0) + 1
    return acc
  }, {})
  
  return Object.keys(categorias).reduce((a, b) => 
    categorias[a] > categorias[b] ? a : b
  )
})

const tiempoPromedioCategoria = ref(85)
const mejorTiempoGlobal = ref(45)

// Filtros
const categoriasFiltro = ref([
  { value: "Todos", label: "Todas", icon: "🌐" },
  { value: "Frutas", label: "Frutas", icon: "🍉" },
  { value: "Animales", label: "Animales", icon: "🦁" },
  { value: "Países", label: "Países", icon: "🌍" },
  { value: "Deportes", label: "Deportes", icon: "⚽" },
  { value: "Películas", label: "Películas", icon: "🎬" },
  { value: "Ciencia", label: "Ciencia", icon: "🔬" }
])

const nivelesFiltro = ref([
  { value: "Todos", label: "Todos", icon: "📊" },
  { value: "facil", label: "Fácil", icon: "😊" },
  { value: "medio", label: "Medio", icon: "😎" },
  { value: "dificil", label: "Difícil", icon: "🔥" }
])

// Computed
const currentPlayer = computed(() => {
  return localStorage.getItem("ahorcado_jugador") || "Jugador"
})

const recordsFiltrados = computed(() => {
  let filtered = [...records.value]
  
  // Aplicar filtros
  if (filtroCategoria.value !== "Todos") {
    filtered = filtered.filter(r => r.categoria === filtroCategoria.value)
  }
  
  if (filtroNivel.value !== "Todos") {
    filtered = filtered.filter(r => r.nivel === filtroNivel.value)
  }
  
  // Ordenar
  if (ordenActual.value === "tiempo") {
    filtered.sort((a, b) => a.tiempo - b.tiempo)
  } else {
    filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  }
  
  return filtered
})

const paginatedRecords = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return recordsFiltrados.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(recordsFiltrados.value.length / itemsPerPage)
})

const miPosicion = computed(() => {
  return recordsFiltrados.value.findIndex(r => r.jugador === currentPlayer.value)
})

// ========== MÉTODOS MEJORADOS CON FECHAS REALES ==========

function formatTime(seconds) {
  if (!seconds && seconds !== 0) return "0:00"
  const min = Math.floor(seconds / 60)
  const sec = seconds % 60
  return `${min}:${sec.toString().padStart(2, '0')}`
}

function formatDate(dateString) {
  if (!dateString) {
    return new Date().toLocaleDateString('es-ES')
  }
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return new Date().toLocaleDateString('es-ES')
    }
    return date.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    })
  } catch {
    return new Date().toLocaleDateString('es-ES')
  }
}

function formatFullDate(dateString) {
  if (!dateString) {
    return new Date().toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return new Date().toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return new Date().toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
}

function formatTimeOfDay(timestamp) {
  if (!timestamp) {
    const ahora = new Date()
    return ahora.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  }
  
  try {
    const date = new Date(timestamp)
    if (isNaN(date.getTime())) {
      const ahora = new Date()
      return ahora.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      })
    }
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  } catch {
    const ahora = new Date()
    return ahora.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  }
}

function formatHour(timestamp) {
  if (!timestamp) {
    const ahora = new Date()
    return ahora.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false 
    })
  }
  try {
    const date = new Date(timestamp)
    if (isNaN(date.getTime())) {
      const ahora = new Date()
      return ahora.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
      })
    }
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false 
    })
  } catch {
    const ahora = new Date()
    return ahora.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false 
    })
  }
}

// Métodos de utilidad
function getAvatar(name) {
  if (!name) return "👤"
  const avatars = ["👩", "👨", "🧑", "👧", "👦", "🦸", "🧙", "🧚", "👾", "🤖", "🎮", "⭐"]
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % avatars.length
  return avatars[index]
}

function getAvatarClass(name) {
  if (!name) return "avatar-default"
  const classes = [
    "avatar-pink", "avatar-blue", "avatar-green", "avatar-orange",
    "avatar-purple", "avatar-yellow", "avatar-red", "avatar-cyan"
  ]
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % classes.length
  return classes[index]
}

function getCategoryIcon(category) {
  const icons = {
    "Frutas": "🍉",
    "Animales": "🦁",
    "Países": "🌍",
    "Deportes": "⚽",
    "Películas": "🎬",
    "Ciencia": "🔬"
  }
  return icons[category] || "🎯"
}

function getLevelLabel(level) {
  const labels = {
    "facil": "FÁCIL",
    "medio": "MEDIO",
    "dificil": "DIFÍCIL"
  }
  return labels[level] || level?.toUpperCase() || "N/A"
}

function getLevelClass(level) {
  return `level-${level}`
}

function getPositionClass(position) {
  if (position === 1) return "position-gold"
  if (position === 2) return "position-silver"
  if (position === 3) return "position-bronze"
  return "position-other"
}

function getTimeClass(seconds) {
  if (!seconds) return "time-normal"
  if (seconds < 60) return "time-fast"
  if (seconds < 120) return "time-medium"
  return "time-slow"
}

function calcularDiferencia(tiempo) {
  if (!tiempo) return "N/A"
  const diferencia = tiempo - mejorTiempoGlobal.value
  if (diferencia === 0) return "🥇 RÉCORD"
  if (diferencia > 0) return `+${diferencia}s`
  return `${diferencia}s`
}

function getDiffClass(tiempo) {
  if (!tiempo) return "diff-neutral"
  if (tiempo === mejorTiempoGlobal.value) return "neon-green"
  if (tiempo < mejorTiempoGlobal.value) return "neon-pink"
  return "neon-red"
}

// Métodos de acción
function volverAlJuego() {
  router.push('/')
}

function actualizarRanking() {
  cargarRecords()
  const refreshBtn = document.querySelector('.btn-neon-blue')
  if (refreshBtn) {
    refreshBtn.classList.add('neon-pulse')
    setTimeout(() => {
      refreshBtn.classList.remove('neon-pulse')
    }, 1000)
  }
}

function cargarRecords() {
  const savedRecords = JSON.parse(localStorage.getItem("ahorcado_ranking")) || []
  
  if (savedRecords.length === 0) {
    records.value = generarRecordsEjemplo()
  } else {
    records.value = savedRecords.map((record, index) => ({
      id: record.id || `record-${index}-${Date.now()}`,
      jugador: record.jugador || "Jugador",
      categoria: record.categoria || "Frutas",
      nivel: record.nivel || "facil",
      tiempo: typeof record.tiempo === 'number' ? record.tiempo : 0,
      fecha: record.fecha || new Date().toISOString().split('T')[0],
      timestamp: record.timestamp || new Date().toISOString(),
      exito: record.exito !== undefined ? record.exito : true,
      ranking: record.ranking || index + 1
    }))
  }
}

// FUNCIÓN MEJORADA: GENERAR REGISTROS CON FECHAS REALES ACTUALES
function generarRecordsEjemplo() {
  const nombres = ["NEÓN", "CYBER", "RAYO", "LUZ", "SPARK", "FLASH", "PULSE", "GLOW", "BEAM", "SHINE"]
  const categorias = ["Frutas", "Animales", "Países", "Deportes", "Películas", "Ciencia"]
  const niveles = ["facil", "medio", "dificil"]
  
  const recordsEjemplo = []
  
  for (let i = 0; i < 30; i++) {
    // FECHA ACTUAL DEL SISTEMA
    const fechaActual = new Date()
    
    // Variar horas y minutos para que no sean todos iguales (pero mismo día)
    fechaActual.setHours(fechaActual.getHours() - Math.floor(Math.random() * 24))
    fechaActual.setMinutes(fechaActual.getMinutes() - Math.floor(Math.random() * 60))
    fechaActual.setSeconds(fechaActual.getSeconds() - Math.floor(Math.random() * 60))
    
    const record = {
      id: `record-${i}-${Date.now()}`,
      jugador: nombres[Math.floor(Math.random() * nombres.length)],
      categoria: categorias[Math.floor(Math.random() * categorias.length)],
      nivel: niveles[Math.floor(Math.random() * niveles.length)],
      tiempo: Math.floor(Math.random() * 300) + 30,
      fecha: fechaActual.toISOString().split('T')[0], // FECHA ACTUAL
      timestamp: fechaActual.toISOString(), // TIMESTAMP ACTUAL
      exito: Math.random() > 0.3,
      ranking: i + 1
    }
    
    recordsEjemplo.push(record)
  }
  
  return recordsEjemplo.sort((a, b) => a.tiempo - b.tiempo)
}

function ordenarPorTiempo() {
  ordenActual.value = "tiempo"
  currentPage.value = 1
}

function ordenarPorFecha() {
  ordenActual.value = "fecha"
  currentPage.value = 1
}

function verDetalle(record) {
  registroDetalle.value = record
  detalleVisible.value = true
}

function obtenerPosicion(record) {
  if (!record) return -1
  return recordsFiltrados.value.findIndex(r => r.id === record.id)
}

function compartirLogro(record) {
  if (!record) return
  
  const texto = `🏆 ¡Acabo de conseguir un tiempo de ${formatTime(record.tiempo)} en Ahorcado Neón! 🎮\n\n`
                + `Categoría: ${record.categoria}\n`
                + `Nivel: ${getLevelLabel(record.nivel)}\n`
                + `Fecha: ${formatDate(record.fecha)}\n`
                + `Hora: ${formatHour(record.timestamp)}\n\n`
                + `#AhorcadoNeon #Videojuego`
  
  if (navigator.share) {
    navigator.share({
      title: 'Mi logro en Ahorcado Neón',
      text: texto,
      url: window.location.href
    }).catch(console.error)
  } else {
    navigator.clipboard.writeText(texto).then(() => {
      alert('¡Logro copiado al portapapeles! Puedes compartirlo donde quieras.')
    }).catch(console.error)
  }
}

// FUNCIÓN INTERNA PARA GUARDAR NUEVOS RESULTADOS (para uso interno)
function guardarResultadoInterno(tiempo, categoria, nivel, exito) {
  const jugador = localStorage.getItem('ahorcado_jugador') || 'Jugador'
  const ahora = new Date()
  
  const nuevoRecord = {
    id: `record-real-${Date.now()}`,
    jugador: jugador,
    categoria: categoria,
    nivel: nivel,
    tiempo: tiempo,
    fecha: ahora.toISOString().split('T')[0],
    timestamp: ahora.toISOString(),
    exito: exito
  }
  
  const recordsGuardados = JSON.parse(localStorage.getItem('ahorcado_ranking')) || []
  recordsGuardados.push(nuevoRecord)
  localStorage.setItem('ahorcado_ranking', JSON.stringify(recordsGuardados))
  
  // Actualizar la lista en tiempo real
  cargarRecords()
  
  return nuevoRecord
}

// Ciclo de vida
onMounted(() => {
  cargarRecords()
  
  setInterval(() => {
    const nuevosRecords = JSON.parse(localStorage.getItem("ahorcado_ranking")) || []
    if (nuevosRecords.length !== records.value.length) {
      cargarRecords()
    }
  }, 30000)
})

// Watch para cambios en filtros
watch([filtroCategoria, filtroNivel], () => {
  currentPage.value = 1
})
</script>

<style scoped>
/* ESTILOS MEJORADOS CON EFECTOS NEÓN */
:root {
  --neon-pink: #ff00ff;
  --neon-blue: #00ffff;
  --neon-green: #00ff00;
  --neon-orange: #ff9900;
  --neon-purple: #cc00ff;
  --neon-yellow: #ffff00;
  --neon-red: #ff0000;
  --neon-pink-glow: rgba(255, 0, 255, 0.7);
  --neon-blue-glow: rgba(0, 255, 255, 0.7);
  --neon-green-glow: rgba(0, 255, 0, 0.7);
  --transition-normal: 0.3s ease;
  --border-radius: 15px;
  --text-neon: #ffffff;
}

.ranking-neon-container {
  min-height: 100vh;
  background: 
    radial-gradient(circle at 10% 10%, rgba(255, 0, 255, 0.15) 0%, transparent 40%),
    radial-gradient(circle at 90% 90%, rgba(0, 255, 255, 0.15) 0%, transparent 40%),
    radial-gradient(circle at 50% 50%, rgba(0, 255, 0, 0.1) 0%, transparent 60%),
    linear-gradient(45deg, #000000 0%, #050510 30%, #0A0A1A 70%, #000000 100%);
  position: relative;
  overflow-x: hidden;
  padding: 20px;
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  color: var(--text-neon);
}

/* Efectos de fondo mejorados */
.neon-grid {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(255, 0, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 0, 255, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  z-index: 0;
  animation: scanning 20s linear infinite;
}

.neon-scan-line {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, 
    transparent, 
    var(--neon-green), 
    var(--neon-blue), 
    var(--neon-pink), 
    transparent);
  animation: scanning 3s linear infinite;
  z-index: 1;
  box-shadow: 0 0 20px var(--neon-green);
}

.corner-glow {
  position: fixed;
  width: 300px;
  height: 300px;
  filter: blur(80px);
  opacity: 0.2;
  z-index: 0;
}

.corner-tl {
  top: -100px;
  left: -100px;
  background: var(--neon-pink);
}

.corner-tr {
  top: -100px;
  right: -100px;
  background: var(--neon-blue);
}

.corner-bl {
  bottom: -100px;
  left: -100px;
  background: var(--neon-green);
}

.corner-br {
  bottom: -100px;
  right: -100px;
  background: var(--neon-orange);
}

/* Efectos neón */
.neon-pink { color: var(--neon-pink); text-shadow: 0 0 10px var(--neon-pink-glow); }
.neon-blue { color: var(--neon-blue); text-shadow: 0 0 10px var(--neon-blue-glow); }
.neon-green { color: var(--neon-green); text-shadow: 0 0 10px var(--neon-green-glow); }
.neon-orange { color: var(--neon-orange); text-shadow: 0 0 10px rgba(255, 153, 0, 0.7); }
.neon-purple { color: var(--neon-purple); text-shadow: 0 0 10px rgba(204, 0, 255, 0.7); }
.neon-yellow { color: var(--neon-yellow); text-shadow: 0 0 10px rgba(255, 255, 0, 0.7); }
.neon-red { color: var(--neon-red); text-shadow: 0 0 10px rgba(255, 0, 0, 0.7); }

.neon-flicker {
  animation: neon-flicker 1.5s infinite alternate;
}

/* Cards neón */
.card-neon {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius);
  padding: 20px;
  position: relative;
  overflow: hidden;
  transition: all var(--transition-normal);
}

.card-neon::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, 
    var(--neon-pink), 
    var(--neon-blue), 
    var(--neon-green), 
    var(--neon-orange));
  border-radius: calc(var(--border-radius) + 2px);
  z-index: -1;
  opacity: 0.3;
  transition: opacity var(--transition-normal);
}

.card-neon:hover::before {
  opacity: 0.6;
}

.card-neon-purple::before { background: linear-gradient(45deg, var(--neon-purple), var(--neon-pink), var(--neon-blue)); }
.card-neon-blue::before { background: linear-gradient(45deg, var(--neon-blue), var(--neon-green), var(--neon-purple)); }
.card-neon-green::before { background: linear-gradient(45deg, var(--neon-green), var(--neon-yellow), var(--neon-orange)); }
.card-neon-orange::before { background: linear-gradient(45deg, var(--neon-orange), var(--neon-red), var(--neon-yellow)); }
.card-neon-pink::before { background: linear-gradient(45deg, var(--neon-pink), var(--neon-purple), var(--neon-blue)); }
.card-neon-yellow::before { background: linear-gradient(45deg, var(--neon-yellow), var(--neon-orange), var(--neon-red)); }

/* Botones neón */
.btn-neon {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all var(--transition-normal);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  overflow: hidden;
  font-size: 0.9rem;
}

.btn-neon::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.btn-neon:hover::before {
  left: 100%;
}

.btn-neon-small {
  padding: 8px 16px;
  font-size: 0.8rem;
}

.btn-neon-pink {
  background: rgba(255, 0, 255, 0.1);
  border: 2px solid var(--neon-pink);
  color: var(--neon-pink);
  box-shadow: 0 0 15px rgba(255, 0, 255, 0.3);
}

.btn-neon-pink:hover {
  background: rgba(255, 0, 255, 0.2);
  box-shadow: 0 0 25px rgba(255, 0, 255, 0.5);
  transform: translateY(-2px);
}

.btn-neon-blue {
  background: rgba(0, 255, 255, 0.1);
  border: 2px solid var(--neon-blue);
  color: var(--neon-blue);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
}

.btn-neon-blue:hover {
  background: rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 25px rgba(0, 255, 255, 0.5);
  transform: translateY(-2px);
}

.btn-neon-green {
  background: rgba(0, 255, 0, 0.1);
  border: 2px solid var(--neon-green);
  color: var(--neon-green);
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.3);
}

.btn-neon-green:hover {
  background: rgba(0, 255, 0, 0.2);
  box-shadow: 0 0 25px rgba(0, 255, 0, 0.5);
  transform: translateY(-2px);
}

.btn-neon-orange {
  background: rgba(255, 153, 0, 0.1);
  border: 2px solid var(--neon-orange);
  color: var(--neon-orange);
  box-shadow: 0 0 15px rgba(255, 153, 0, 0.3);
}

.btn-neon-orange:hover {
  background: rgba(255, 153, 0, 0.2);
  box-shadow: 0 0 25px rgba(255, 153, 0, 0.5);
  transform: translateY(-2px);
}

.btn-neon-outline {
  background: transparent;
  border: 2px solid var(--neon-blue);
  color: var(--neon-blue);
}

.btn-neon-outline:hover {
  background: rgba(0, 255, 255, 0.1);
}

.btn-neon-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-neon-disabled:hover {
  transform: none !important;
  box-shadow: none !important;
}

/* Header */
.ranking-header {
  margin-bottom: 30px;
  border-width: 3px;
  padding: 30px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    text-align: center;
  }
}

.header-title {
  flex: 1;
}

.main-title {
  font-size: 2.8rem;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 3px;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

.header-actions {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

/* Estadísticas globales */
.global-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
  position: relative;
  z-index: 10;
}

.stat-card {
  padding: 25px;
  text-align: center;
  border-width: 2px;
  transition: all var(--transition-normal);
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
}

.stat-icon {
  font-size: 3rem;
  margin-bottom: 15px;
  display: inline-block;
  animation: neon-pulse 2s infinite;
}

.stat-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 900;
  text-shadow: 0 0 15px currentColor;
}

.stat-label {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  opacity: 0.8;
}

/* Filtros */
.filters-section {
  padding: 30px;
  margin-bottom: 40px;
  border-width: 3px;
}

.filter-group {
  margin-bottom: 25px;
}

.filter-group:last-child {
  margin-bottom: 0;
}

.filter-label {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.filter-icon {
  font-size: 1.5rem;
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

/* Podio MEJORADO con hora */
.podium-section {
  margin-bottom: 50px;
  position: relative;
  z-index: 10;
}

.section-title {
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 40px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.podium {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .podium {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }
}

.podium-place {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.podium-place.first {
  order: 2;
}

.podium-place.second {
  order: 1;
}

.podium-place.third {
  order: 3;
}

.place-number {
  font-size: 4rem;
  font-weight: 900;
  text-shadow: 0 0 20px currentColor;
  animation: neon-pulse 2s infinite;
}

.player-card {
  padding: 30px;
  text-align: center;
  border-width: 3px;
  width: 100%;
  max-width: 300px;
  position: relative;
  transition: all var(--transition-normal);
}

.player-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
}

.player-medal {
  font-size: 4rem;
  margin-bottom: 15px;
  animation: float 3s ease-in-out infinite;
}

.player-info {
  margin-bottom: 15px;
}

.player-name {
  font-size: 1.8rem;
  font-weight: 900;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.player-time {
  font-size: 2.2rem;
  font-weight: 900;
  margin-bottom: 8px;
  text-shadow: 0 0 15px currentColor;
}

.player-date {
  font-size: 1.1rem;
  margin-bottom: 5px;
}

.player-hour {
  font-size: 1rem;
  opacity: 0.8;
}

.crown {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2.5rem;
  animation: float 2s ease-in-out infinite;
}

/* Tabla de ranking */
.ranking-table-section {
  position: relative;
  z-index: 10;
  margin-bottom: 50px;
}

.table-header {
  margin-bottom: 25px;
}

.table-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.table-info {
  font-size: 1.1rem;
  font-weight: 700;
}

.table-info strong {
  color: var(--neon-pink);
  text-shadow: 0 0 10px var(--neon-pink-glow);
}

.table-sort {
  display: flex;
  gap: 12px;
}

.ranking-table-container {
  padding: 20px;
  border-width: 3px;
}

.table-scroll {
  overflow-x: auto;
  margin-bottom: 25px;
}

.ranking-table {
  width: 100%;
  min-width: 1000px;
  border-collapse: collapse;
}

.ranking-table thead {
  background: rgba(0, 0, 0, 0.4);
}

.header-cell {
  padding: 20px;
  text-align: left;
  font-size: 1.1rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.ranking-table tbody tr {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all var(--transition-normal);
}

.ranking-table tbody tr:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: scale(1.005);
}

.ranking-table tbody tr.current-player {
  background: rgba(255, 0, 255, 0.1);
}

.ranking-table tbody tr.podium-row {
  background: rgba(255, 255, 0, 0.05);
}

.ranking-table td {
  padding: 15px;
}

/* Celdas específicas */
.position-cell {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-weight: 900;
  font-size: 1.2rem;
  text-shadow: 0 0 10px currentColor;
}

.position-gold {
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #000;
  box-shadow: 0 0 20px #FFD700;
}

.position-silver {
  background: linear-gradient(135deg, #C0C0C0, #A0A0A0);
  color: #000;
  box-shadow: 0 0 20px #C0C0C0;
}

.position-bronze {
  background: linear-gradient(135deg, #CD7F32, #A65C00);
  color: #000;
  box-shadow: 0 0 20px #CD7F32;
}

.position-other {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-neon);
}

.player-cell {
  display: flex;
  align-items: center;
  gap: 15px;
}

.player-avatar {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  border-radius: 50%;
  border: 2px solid;
  flex-shrink: 0;
}

.avatar-pink { border-color: var(--neon-pink); color: var(--neon-pink); }
.avatar-blue { border-color: var(--neon-blue); color: var(--neon-blue); }
.avatar-green { border-color: var(--neon-green); color: var(--neon-green); }
.avatar-orange { border-color: var(--neon-orange); color: var(--neon-orange); }
.avatar-purple { border-color: var(--neon-purple); color: var(--neon-purple); }
.avatar-yellow { border-color: var(--neon-yellow); color: var(--neon-yellow); }
.avatar-red { border-color: var(--neon-red); color: var(--neon-red); }
.avatar-cyan { border-color: var(--neon-blue); color: var(--neon-blue); }

.player-details {
  flex: 1;
  min-width: 0;
}

.player-name {
  font-weight: 700;
  margin-bottom: 5px;
  font-size: 1.1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.you-badge {
  font-size: 0.8rem;
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  background: rgba(0, 255, 0, 0.2);
  color: var(--neon-green);
}

.player-level {
  font-size: 0.8rem;
  padding: 3px 10px;
  border-radius: 10px;
  display: inline-block;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.level-facil {
  background: rgba(0, 255, 0, 0.2);
  color: var(--neon-green);
  border: 1px solid var(--neon-green);
}

.level-medio {
  background: rgba(255, 165, 0, 0.2);
  color: var(--neon-orange);
  border: 1px solid var(--neon-orange);
}

.level-dificil {
  background: rgba(255, 0, 85, 0.2);
  color: var(--neon-red);
  border: 1px solid var(--neon-red);
}

.category-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.category-icon {
  font-size: 1.5rem;
}

.category-name {
  font-weight: 600;
}

.level-badge {
  display: inline-block;
  padding: 6px 15px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.time-cell {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.time-value {
  font-size: 1.3rem;
  font-weight: 900;
}

.time-fast { color: var(--neon-green); }
.time-medium { color: var(--neon-yellow); }
.time-slow { color: var(--neon-orange); }

.time-unit {
  font-size: 0.8rem;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.date-cell {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.date-day {
  font-weight: 700;
  font-size: 1.1rem;
}

.date-time {
  font-size: 0.9rem;
  opacity: 0.7;
}

.actions-cell {
  display: flex;
  gap: 8px;
}

/* Estado vacío */
.empty-state {
  padding: 60px 20px;
  text-align: center;
}

.empty-content {
  max-width: 400px;
  margin: 0 auto;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  opacity: 0.5;
  animation: float 3s ease-in-out infinite;
}

.empty-title {
  font-size: 1.8rem;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.empty-message {
  font-size: 1.1rem;
  margin-bottom: 30px;
  opacity: 0.8;
}

/* Paginación */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  padding-top: 25px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.pagination-info {
  font-size: 1rem;
  font-weight: 700;
}

/* Tu posición */
.your-position {
  position: relative;
  z-index: 10;
  margin-bottom: 40px;
}

.position-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.position-card {
  padding: 40px;
  border-width: 3px;
  max-width: 800px;
  margin: 0 auto;
}

.position-rank {
  text-align: center;
  margin-bottom: 40px;
}

.rank-number {
  font-size: 4.5rem;
  font-weight: 900;
  margin-bottom: 10px;
  text-shadow: 0 0 30px var(--neon-pink-glow);
}

.rank-label {
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  opacity: 0.8;
}

.position-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.position-stats .stat {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: var(--border-radius);
  border: 2px solid;
  transition: all var(--transition-normal);
}

.position-stats .stat:hover {
  transform: translateY(-5px);
}

.position-stats .stat-icon {
  font-size: 2.5rem;
  margin: 0;
}

.position-stats .stat-content {
  flex: 1;
  text-align: left;
}

.position-stats .stat-value {
  font-size: 1.8rem;
  margin-bottom: 5px;
}

.position-stats .stat-label {
  font-size: 0.8rem;
  opacity: 0.8;
}

/* Modal de detalle */
.detail-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.detail-modal-content {
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  border-width: 5px;
  animation: neon-glow 2s infinite;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  border-bottom: 2px solid var(--neon-blue);
}

.modal-title {
  font-size: 2rem;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.modal-body {
  padding: 30px;
}

.player-detail {
  display: flex;
  align-items: center;
  gap: 25px;
  margin-bottom: 30px;
}

.detail-avatar {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  border-radius: 50%;
  border: 3px solid;
  flex-shrink: 0;
}

.detail-info {
  flex: 1;
}

.detail-name {
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: 8px;
  text-transform: uppercase;
}

.detail-rank {
  font-size: 1.2rem;
  font-weight: 700;
}

.detail-stats {
  margin-bottom: 30px;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-row:last-child {
  border-bottom: none;
}

.stat-label {
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: 700;
}

.time-highlight {
  font-size: 1.8rem;
  font-weight: 900;
  text-shadow: 0 0 20px currentColor;
}

.category-badge,
.level-badge {
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.detail-comparison {
  padding: 25px;
  margin-bottom: 30px;
}

.comparison-title {
  font-size: 1.3rem;
  margin-bottom: 20px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.comparison-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.comparison-item:last-child {
  border-bottom: none;
}

.comparison-label {
  font-size: 0.95rem;
}

.comparison-value {
  font-size: 1.1rem;
  font-weight: 700;
}

.modal-footer {
  padding: 30px;
  border-top: 2px solid var(--neon-blue);
  text-align: center;
}

/* Transiciones */
.neon-modal-enter-active,
.neon-modal-leave-active {
  transition: opacity 0.3s ease;
}

.neon-modal-enter-from,
.neon-modal-leave-to {
  opacity: 0;
}

.neon-modal-enter-active .detail-modal-content,
.neon-modal-leave-active .detail-modal-content {
  transition: transform 0.3s ease;
}

.neon-modal-enter-from .detail-modal-content,
.neon-modal-leave-to .detail-modal-content {
  transform: scale(0.9);
}

/* Animaciones */
@keyframes scanning {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes neon-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@keyframes neon-flicker {
  0%, 100% { opacity: 1; text-shadow: 0 0 20px currentColor; }
  50% { opacity: 0.8; text-shadow: 0 0 10px currentColor; }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes neon-glow {
  0%, 100% { box-shadow: 0 0 20px var(--neon-blue-glow); }
  50% { box-shadow: 0 0 40px var(--neon-blue-glow); }
}

/* Responsive */
@media (max-width: 768px) {
  .ranking-neon-container {
    padding: 15px;
  }
  
  .main-title {
    font-size: 2rem;
  }
  
  .global-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .filter-buttons {
    justify-content: center;
  }
  
  .podium {
    gap: 20px;
  }
  
  .player-card {
    padding: 20px;
  }
  
  .table-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .table-sort {
    justify-content: center;
  }
  
  .position-stats {
    grid-template-columns: 1fr;
  }
  
  .detail-modal-content {
    margin: 10px;
  }
  
  .modal-header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .player-detail {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .global-stats {
    grid-template-columns: 1fr;
  }
  
  .filter-buttons {
    flex-direction: column;
  }
  
  .filter-buttons .btn-neon {
    width: 100%;
  }
  
  .header-actions {
    width: 100%;
    justify-content: center;
  }
  
  .header-actions .btn-neon {
    flex: 1;
    min-width: 140px;
  }
  
  .pagination {
    flex-direction: column;
    gap: 15px;
  }
  
  .pagination .btn-neon {
    width: 100%;
  }
}
</style>


