import Vue from 'vue'
import Vuex from 'vuex'
import cardListModule from './modules/cardListModule'
Vue.use(Vuex)
export default new Vuex.Store({
    state:{
       
    },
    mutations:{

    },
    modules:{
        cardList:cardListModule
    }
})