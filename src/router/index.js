import Vue from 'vue';
import Router from 'vue-router';
import MegaMenuPage from '@/components/public/MegaMenuPage';
import signup from '@/components/private/signup';
import dashboard from '@/components/private/dashboard';
import login from '@/components/private/login';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MegaMenuPage',
      component: MegaMenuPage,
    },
    {
      path: '/national',
      name: 'national',
      component: MegaMenuPage
    },
    {
      path: '/business',
      name: 'business',
      component: MegaMenuPage
    },
    {
      path: '/technology',
      name: 'technology',
      component: MegaMenuPage
    },
    {
      path: '/entertainment',
      name: 'entertainment',
      component: MegaMenuPage
    },
    {
      path: '/sports',
      name: 'sports',
      component: MegaMenuPage
    },
    {
      path: '/science',
      name: 'science',
      component: MegaMenuPage
    },
    {
      path: '/health',
      name: 'health',
      component: MegaMenuPage
    },
    {
      path: '/local',
      name: 'local',
      component: MegaMenuPage
    },
    {
      path: '/date',
      name: 'date',
      component: MegaMenuPage
    },
    {
      path: '/search',
      name: 'search',
      component: MegaMenuPage
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
  ],
  mode: 'history'
});
