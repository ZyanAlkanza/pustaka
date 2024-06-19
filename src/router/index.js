import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DetailView from '@/views/DetailView.vue'
import DashboardView from '@/views/DashboardView.vue'
import UsersView from '@/views/UsersView.vue'
import UserDetailView from '@/views/UserDetailView.vue'
import UserAddView from '@/views/UserAddView.vue'
import UserEditView from '@/views/UserEditView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView
    },
    {
      path: '/userDetail/:id',
      name: 'userDetail',
      component: UserDetailView
    },
    {
      path: '/userAdd',
      name: 'userAdd',
      component: UserAddView
    },
    {
      path: '/userEdit/:id',
      name: 'userEdit',
      component: UserEditView
    }

    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
