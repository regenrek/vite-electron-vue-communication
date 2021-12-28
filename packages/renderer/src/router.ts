import {createRouter, createWebHistory} from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: () => import('/@/pages/Home/Home.vue') },
  { path: '/about', name: 'About', component: () => import('/@/pages/About/About.vue') }, // Lazy load route component
  { path: '/options/', name: 'Options', component: () => import('/@/pages/Options/Options.vue') },
  {
    path: '/watch/:seriesId(\\d+)/',
    name: 'Watch',
    component: () => import('/@/pages/Watch/Watch.vue'),
    props: true,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory('/'),
});

export default router;
