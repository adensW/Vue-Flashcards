const state={
    Sets:[],
}
const getters={
    AllSets:(state)=>{
        return state.Sets
    }
}
const actions={
    updateSet(context,prop){
        //actions
        context.commit('UpdateSet',prop);
    },
    addSet(context,prop){
        context.commit('addSet',prop);
        this._vm.$aidb.open("DB_Vue_FlashCard").add("Sets",prop).execude();
    },
    initSets(context){
        context.commit('initSets');
    }
}
const mutations={
    addSet:(state,prop)=>{
        state.Sets.push(prop);
    },
    updateSet:(state,prop)=>{
        let index = -1;
        for (let i = 0; i < state.Sets.length; i++) {
            const element = state.Sets[i];
            if(element.id===prop.id)
            {
                index = i;
            }
        }
        if(index!=-1)
        {
            state.Sets[index] = prop;
        }
    },
    initSets:(state,prop)=>{
       state.Sets = prop;
    }
}
export default {
    namespaced: false,
    state,
    getters,
    actions,
    mutations
  }