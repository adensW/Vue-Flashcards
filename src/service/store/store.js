import Vue from 'vue'
import Vuex from 'vuex'
import CardListModule from './modules/CardListModule'
import DashboardModule from './modules/DashboardModule';
Vue.use(Vuex)
export default new Vuex.Store({
    state:{
       
    },
    mutations:{

    },
    modules:{
        CardList:CardListModule,
        SetList:DashboardModule
    }
})