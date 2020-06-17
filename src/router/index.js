import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/auth',
    name: 'Authorize',
    component: () => import('../views/Authorization.vue')
  },
  {
    path: '/article/:field/:id',
    name: 'FullArticle',
    component: () => import('../views/FullArticle.vue'),
    props: true
  },
  {
    path: '/new-article',
    name: 'NewArticle',
    component: () => import('../views/NewArticle.vue'),
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
