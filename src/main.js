import '@babel/polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import './plugins/vuetify'
import App from './App.vue'

import CompanyRanking from './components/CompanyRanking'
import EditProgram from './components/EditProgram'
import ViewPrograms from './components/ViewPrograms'
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
        name: 'locations',
        path: '/locations',
        component: Locations,
        props: {
            sharedData: sharedData,
        },
    },
    {
        name: 'view-programs',
        path: '/program/list',
        component: ViewPrograms,
        props: {
            sharedData: sharedData,
        },
    },
    {
        name: 'edit-program',
        path: '/program/edit',
        component: EditProgram,
        props: true,
    },
    {
        name: 'fire-talent',
        path: '/fire',
        component: FireTalent,
        props: {
            sharedData: sharedData,
        },
    },
    {
        name: 'hire-talent',
        path: '/hire',
        component: HireTalent,
        props: {
            sharedData: sharedData,
        },
    },
    {
        name: 'view-roster',
        path: '/roster',
        component: ViewRoster,
        props: {
            sharedData: sharedData,
        },
    },
    {
        name: 'company-ranking',
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
