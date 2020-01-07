import Vue from 'vue'
import VueRouter from 'vue-router'

import TodoContents from '../components/TodoContents'
import TodoLogin from '../components/TodoLogin'
import TodoSign from '../components/TodoSign'

import firebase from 'firebase'

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
      //라우팅 내용
        { path: '*', component: TodoLogin },
        { path: '/', component: TodoLogin },
        { path: '/login', component: TodoLogin },
        { path: '/signup', component: TodoSign },
        {
          path: '/todo',
          component: TodoContents,
          meta: {
            requiresAuth: true
          }
         },
    ]
})

export default router
