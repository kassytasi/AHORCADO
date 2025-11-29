import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameView from '../views/GameView.vue'
import CategoryView from '../views/CategoryView.vue'
import LevelView from '../views/LevelView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/categories', name: 'categories', component: CategoryView },
  { path: '/levels', name: 'levels', component: LevelView },
  { path: '/game', name: 'game', component: GameView }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
