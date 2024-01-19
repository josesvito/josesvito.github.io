import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
const Home = () => import(/* webpackPrefetch: true */ '../views/Home.vue');
const HelloWorld = () => import(/* webpackPrefetch: true */ '../views/HelloWorld.vue');

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/hello',
    name: 'HelloWorld',
    component: HelloWorld
  },
  // {
  //   path: '/:pathMatch(.*)*',
  //   component: () => import(/* webpackChunkName: "Oops" */ '../views/Oops.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
