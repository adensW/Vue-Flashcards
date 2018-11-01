import Vue from 'vue'
import Vuex from 'vuex'
import cardListModule from './modules/cardListModule'
import DashboardModule from './modules/DashboardModule';
Vue.use(Vuex)
export default new Vuex.Store({
    state:{
       
    },
    mutations:{

    },
    modules:{
        cardList:cardListModule,
        setList:DashboardModule
    }
})