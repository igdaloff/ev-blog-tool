import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignupView from '../views/SignupView.vue'
import FormSubmitView from '../views/FormSubmitView.vue'
import CreateBlogPostView from '../views/CreateBlogPostView.vue'

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
    path: '/create-blog',
    name: 'create blog',
    component: CreateBlogPostView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
