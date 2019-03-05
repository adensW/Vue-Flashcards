
const state={
    Status:[
        ],
    
}
const getters={
    Status:(state)=>{
        return state.Status
    }
}
const actions={
    updateStatus(context,prop){
        //actions
        context.commit('updateStatus',prop);
    },
}
const mutations={
    updateStatus:(state,prop)=>{
        state.Status = prop
    },
}
export default {
    namespaced: false,
    state,
    getters,
    actions,
    mutations
  }