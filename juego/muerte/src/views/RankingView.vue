<template>
  <div class="ranking-container">

    <h1>🏆 Mejores Tiempos</h1>

    <!-- PODIO 3 PRIMEROS -->
    <div class="podio" v-if="recordsFiltrados.length > 0">
      <div v-for="(r,i) in recordsFiltrados.slice(0,3)" :key="i" class="puesto" :class="'puesto-'+(i+1)">
        <div class="copa">
          <span v-if="i===0">🥇</span>
          <span v-else-if="i===1">🥈</span>
          <span v-else>🥉</span>
        </div>
        <div class="info">
          <strong>{{ r.jugador }}</strong>
          <div>{{ r.tiempoTexto }}</div>
        </div>
      </div>
    </div>

    <!-- FILTROS -->
    <div class="filtros">
      <select v-model="filtroCategoria">
        <option value="Todos">Todas las Categorías</option>
        <option value="Frutas">Frutas</option>
        <option value="Animales">Animales</option>
        <option value="Países">Países</option>
        <option value="Deportes">Deportes</option>
        <option value="Películas">Películas</option>
        <option value="Ciencia">Ciencia</option>
      </select>

      <select v-model="filtroNivel">
        <option value="Todos">Todos los Niveles</option>
        <option value="facil">Fácil</option>
        <option value="medio">Medio</option>
        <option value="dificil">Difícil</option>
      </select>
    </div>

    <!-- TABLA DE RECORDS -->
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Jugador</th>
          <th>Categoría</th>
          <th>Nivel</th>
          <th>Tiempo</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(r,index) in recordsFiltrados" :key="index">
          <td>{{ index+1 }}</td>
          <td>{{ r.jugador }}</td>
          <td>{{ r.categoria }}</td>
          <td>{{ r.nivel }}</td>
          <td>{{ r.tiempoTexto }}</td>
          <td>{{ r.fecha }}</td>
        </tr>
        <tr v-if="recordsFiltrados.length===0">
          <td colspan="6">No hay registros aún</td>
        </tr>
      </tbody>
    </table>

    <!-- BOTÓN VOLVER -->
    <div class="btn-container">
      <button @click="volverJuego">⬅️ Volver al Juego</button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const records = ref([]);
const filtroCategoria = ref("Todos");
const filtroNivel = ref("Todos");

onMounted(()=>{
  // Obtener registros guardados en localStorage
  const arr = JSON.parse(localStorage.getItem("recordsAhorcado")) || [];
  records.value = arr;
});

// Computed para filtrar registros con normalización de mayúsculas
const recordsFiltrados = computed(()=>{
  return records.value
    .filter(r => {
      if(filtroCategoria.value==="Todos") return true;
      return r.categoria.toLowerCase() === filtroCategoria.value.toLowerCase();
    })
    .filter(r => {
      if(filtroNivel.value==="Todos") return true;
      return r.nivel.toLowerCase() === filtroNivel.value.toLowerCase();
    })
    .sort((a,b)=> a.tiempo - b.tiempo); // ordenar por tiempo ascendente
});

function volverJuego(){
  router.push('/');
}
</script>

<style scoped>
.ranking-container{
  width:90%; max-width:800px; margin:20px auto;
  padding:20px; background: radial-gradient(circle at 20% 20%,#120027,#050010 70%);
  color:#fff; border-radius:16px; box-shadow:0 0 20px #9d4dff,inset 0 0 25px #5e1aff; font-family:"Poppins",sans-serif;
}
h1{ text-align:center; margin-bottom:20px; color:#ff6b6b; text-shadow:0 0 12px #ff4c4c; }

/* PODIO 3 PRIMEROS */
.podio{
  display:flex;
  justify-content:center;
  gap:15px;
  margin-bottom:20px;
}
.puesto{
  display:flex;
  flex-direction:column;
  align-items:center;
  padding:10px;
  border-radius:12px;
  background: rgba(255,255,255,0.05);
  box-shadow: 0 0 10px #fff;
  min-width:80px;
}
.puesto-1 { background: rgba(255,215,0,0.3); } /* Oro */
.puesto-2 { background: rgba(192,192,192,0.3); } /* Plata */
.puesto-3 { background: rgba(205,127,50,0.3); } /* Bronce */
.copa{ font-size:24px; margin-bottom:5px; }
.info strong{ display:block; font-size:16px; }
.info div{ font-size:14px; }

/* FILTROS */
.filtros{ display:flex; justify-content:center; gap:15px; margin-bottom:20px; }
.filtros select{ padding:8px 12px; border-radius:10px; border:none; font-size:14px; background:#1dd1a1; color:#050010; font-weight:bold; cursor:pointer; }

/* TABLA */
table{ width:100%; border-collapse:collapse; margin-bottom:20px; }
thead tr{ background:#4cddff; color:#050010; font-weight:bold; }
th,td{ padding:8px 12px; text-align:center; border:1px solid #fff; }
tbody tr:nth-child(even){ background:rgba(255,255,255,0.05); }

/* BOTÓN VOLVER */
.btn-container{text-align:center;}
.btn-container button{padding:10px 20px; background:#ff6b6b; color:#050010; border:none; border-radius:12px; cursor:pointer; font-weight:bold; text-shadow:0 0 6px #ff4c4c; transition:0.2s;}
.btn-container button:hover{transform:scale(1.05); box-shadow:0 0 15px #ff6b6b;}
</style>
