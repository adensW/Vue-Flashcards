import {dbcontext} from '@/service/context/dbcontext-class'
const state={
    cards:[
        ],
    lastSavedPosition:"",

}
const getters={
    AllCards:(state)=>{
        
        let context = new dbcontext("DB_Vue_FlashCard",2);
        context.open('DB_Vue_FlashCard').set("Cards").getAll().then(function(data){
            state.cards= data;
            // console.log(data)
        });
        // result.then(function(data){
        //     console.log(data);
        // });
        // let b =carddbcontext.open('testdb',3).createTable('cardtest',{keyPath:'id'})
        // b.then(function(data){
        //     console.log(data)
        // })
        // let a = carddbcontext.open('testdb',1).set("testtable").delete(3)
        // a.then(function(data){
        //     console.log(data)
        // })
        return state.cards
    }
}
const actions={
    UpdateCard(context,prop){
        //actions
        context.commit('UpdateCard',prop);
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
    }

}
export default {
    namespaced: false,
    state,
    getters,
    actions,
    mutations
  }