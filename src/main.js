import '@babel/polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import './plugins/vuetify'
import App from './App.vue'

import FireTalent from './components/FireTalent'
import HireTalent from './components/HireTalent'
import InGameState from './models/InGameState'

Vue.use(VueRouter);
Vue.config.productionTip = false;

var sharedData = {
    gameState: new InGameState(),
}

const routes = [
    {
        name: 'Fire Talent',
        path: '/fire',
        component: FireTalent,
        props: {
            sharedData: sharedData,
        },
    },
    {
        name: 'Hire Talent',
        path: '/hire',
        component: HireTalent,
        props: {
            sharedData: sharedData,
        },
    },
];

const router = new VueRouter({
  routes
});

new Vue({
    router,
    data: {
        sharedData: sharedData,
    },
    render: h => h(App),
}).$mount('#app');
