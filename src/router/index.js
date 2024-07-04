import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import SearchPage from '../views/SearchPage.vue'

const routes = [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
        path: '/search/:params',
        name: 'Search',
        component: SearchPage
    }
  ]
  
  const router = createRouter({
    history: createWebHistory('/zaiten/'),
    routes
  })
  
  export default router