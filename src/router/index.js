import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue';
import Photolist from '../views/Photolist.vue';
import PhotoDetail from '../views/PhotoDetail.vue';
import store from "../store/index";
import SystemError from '../components/System.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Photolist',
    component: Photolist,
    meta: {
      requireAuth:true,
    }
  },
  {
    path: "/photo/:id",
    name: "PhotoDetail",
    component: PhotoDetail,
    props: true,
    meta: {
      requireAuth:true,
    }
  },
  {
    path: "/*",
    name: "SystemError",
    component: SystemError,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth) && !store.state.auth)
  {
    next({
      path: "/",
      query: {
        redirect: to.fullPath,
      },
    });
  } else {
    next();
  }
});

export default router
