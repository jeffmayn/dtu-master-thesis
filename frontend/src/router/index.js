import { createRouter, createWebHistory } from 'vue-router'
import Index from "../views/index.vue"
import Create from "../views/Create.vue"
import Canvas from "../views/CanvasView.vue"

const routes = [
  {
    name: "Index",
    path: "/",
    component: Index
  },
  {
    name: "Canvas",
    path: "/canvas",
    component: Canvas
  },
  {
    name: "Create",
    path: "/create",
    component: Create
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
