import '@babel/polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import './plugins/vuetify'
import App from './App.vue'

import CompanyRanking from './components/CompanyRanking'
import FireTalent from './components/FireTalent'
import HireTalent from './components/HireTalent'
import Locations from './components/Locations'
import InGameState from './models/InGameState'
import ViewRoster from './components/ViewRoster'

Vue.use(VueRouter);
Vue.config.productionTip = false;

var sharedData = {
    gameState: new InGameState(),
}

const routes = [
    {
        name: 'Locations',
        path: '/locations',
        component: Locations,
        props: {
            sharedData: sharedData,
        },
    },
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
    {
        name: 'View Roster',
        path: '/roster',
        component: ViewRoster,
        props: {
            sharedData: sharedData,
        },
    },
    {
        name: 'Company Ranking',
        path: '/company-ranking',
        component: CompanyRanking,
        props: {
            sharedData: sharedData,
        },
    }
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
