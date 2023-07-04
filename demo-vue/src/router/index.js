import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

import About from '../components/About.vue'
import Home from '../components/Home.vue'
import Logister from '../components/Logister.vue'
// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: HomeView
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (About.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import('../views/AboutView.vue')
//     }
//   ]
// })


const router = createRouter({
  history : createWebHistory(),
  routes:[
    {path:'/', component:Home, name:'home'},
    {path:'/about', component:About, name:'about'},
    {path:'/logister', component:Logister, name:'logister'}
  ]
})
export default router
