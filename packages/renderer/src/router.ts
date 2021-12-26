import {createRouter, createWebHashHistory} from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: () => import('/@/pages/Home/Home.vue') },
  { path: '/about', name: 'About', component: () => import('/@/pages/About/About.vue') }, // Lazy load route component
  { path: '/options/', name: 'Options', component: () => import('/@/pages/Options/Options.vue') },
];

const router = createRouter({
  routes,
  history: createWebHashHistory('/'),
});

export default router;
