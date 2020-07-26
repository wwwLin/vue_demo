import Vue from 'vue'
import VueRouter from "vue-router";
import Vuex from "vuex";
import iView from "iview/dist/iview"
import routers from "./router/router"
import 'iview/dist/styles/iview.css';
import 'es6-promise/auto';
import App from './App.vue'
import api from './request/api';

Vue.config.productionTip = false;
Vue.prototype.$api = api;

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(iView);
Vue.use(Vuex)


const router = new VueRouter({
    routes: routers
})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')