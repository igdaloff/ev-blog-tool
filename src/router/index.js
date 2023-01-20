import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignupView from '../views/SignupView.vue'
import FormSubmitView from '../views/FormSubmitView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView,
  },
  {
    path: '/form-submit',
    name: 'form submit',
    component: FormSubmitView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
