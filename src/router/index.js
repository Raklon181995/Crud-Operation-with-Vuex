import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import AddDetails from '../views/AddDetails';
import ViewDetails from '../views/ViewDetails';
import EditDetails from '../views/EditDetails';
import PageNotFound from '../views/PageNotFound';

import SuccessView from '../views/SuccessView';
import ErrorView from '../views/ErrorView';


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/user/add',
    name: 'addDetails',
    component: AddDetails
  },
  {
    path: '/view/:contactId',
    name: 'viewDetails',
    component: ViewDetails
  },
  {
    path: '/success',
    name:'SuccessView',
    component: SuccessView
  },
  {
    path: '/error',
    name:'ErrorView',
    component: ErrorView
  },
  {
    path: '/edit/:contactId',
    name: 'editDetails',
    component: EditDetails
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    component: PageNotFound
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
