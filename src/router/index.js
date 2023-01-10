import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Ships from '../views/Ships.vue'
import ViewShip from '../views/ViewShip.vue'
import LogIn from '../views/LogIn.vue'
import Register from '../views/RegisterView.vue'
import store from '@/store'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/ships',
    name: 'Ships',
    component: Ships,
    meta: {
      title: 'Ships'
    },
    beforeEnter: (to, from, next) => {
      if(!store.state.currentUser) {
        next({ name: 'LogIn' })
      } else {
        next();
      }
    },
  },
  {
    path: '/view-ship/:name',
    name: 'ViewShip',
    component: ViewShip,
    meta: {
      title: 'Ship Details'
    },
    beforeEnter: (to, from, next) => {
      if(!store.state.currentUser) {
        next({ name: 'LogIn' })
      } else {
        next();
      }
    },
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn,
    meta: {
      title: 'LogIn'
    },
  }, 
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: 'Register'
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Star Wars`;
  next();
});

export default router
