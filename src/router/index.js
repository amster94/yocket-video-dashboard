import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import VideoSegment from '../views/VideoSegment.vue'

const routes = [
  {
    path: '/',
    name: 'VideoSegment',
    component: VideoSegment
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
