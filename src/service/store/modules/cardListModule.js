
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
    updateCard(context,prop){
        //actions
        context.commit('updateCard',prop);
        this._vm.$aidb.open("DB_Vue_FlashCard").put("Cards",prop).execude()
    },
    initCards(context,prop){
        context.commit("initCards",prop);
    },
    addCard(context,prop){
        context.commit("addCard",prop);
        this._vm.$aidb.open("DB_Vue_FlashCard").add("Cards",prop).execude()
    }
}
const mutations={
    updateCard:(state,prop)=>{
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
     },
     addCard:(state,prop)=>{
        state.cards.push(prop);
     }
}
export default {
    namespaced: false,
    state,
    getters,
    actions,
    mutations
  }