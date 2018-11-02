
const state={
    cards:[
        ],
    lastSavedPosition:"",

}
const getters={
    AllCards:(state)=>{
        
        
       
        return state.cards
    }
}
const actions={
    UpdateCard(context,prop){
        //actions
        context.commit('UpdateCard',prop);
    },
    initCards(context,prop){
        context.commit("initCards",prop);
    }
}
const mutations={
    UpdateCard:(state,prop)=>{
        let index = -1;
        for (let i = 0; i < state.cards.length; i++) {
            const element = state.cards[i];
            if(element.id===prop.id)
            {
                index = i;
            }
        }
        if(index!=-1)
        {
            state.cards[index] = prop;
        }
    },
    initCards:(state,prop)=>{
        state.cards = prop;
     }

}
export default {
    namespaced: false,
    state,
    getters,
    actions,
    mutations
  }