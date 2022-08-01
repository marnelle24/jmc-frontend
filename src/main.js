import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main'

// router setup
import routes from './routes/routes'

import 'vue-toast-notification/dist/theme-sugar.css';
import VueToast from 'vue-toast-notification';

import { initialize } from './init';
import './registerServiceWorker'
import store from "./store";

Vue.use(VueRouter)
Vue.use(LightBootstrap)
Vue.use(VueToast)
// load Store

// configure router
const router = new VueRouter({
    mode: 'history',
    routes,
    linkActiveClass: "active",
    linkExactActiveClass: "exact-active",
    scrollBehavior: (to) => {
        if (to.hash) {
            return {selector: to.hash}
        }
        else {
            return { x: 0, y: 0 }
        }
    }
})

initialize(store, router);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
