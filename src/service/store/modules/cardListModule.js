import {dbcontext} from '@/service/context/dbcontext-class'
const state={
    cards:[
        {
            id:0,
            front:"tetsetsmoremroemoreasesttestmoermoeasdasdasdasdaasdasd"+
                "setssdssdasdadsadasdasdaasdasdasdsadasdasdasdasd"+
                "asdasdasdsgsdfgdjytjsdfgcvbtsrtadfdfSeregdfg",
            back:"backbackbackbackbackbackbackbackbackbackbackbackbackback"+
                "backbackbackbackbackbackbackbackbackbackbackback"+
                "backbackbackbackbackbackbackbackbackbackback",
            comment:"commentcommentcommentcommentcommentcommentcommentcomment"+
                "commentcommentcommentcommentcommentcommentcommentcomment"+
                "commentcommentcommentcommentcommentcomment"
        },{
            id:1,
            front:"1",
            back:"1",
            comment:"1"
        },{
            id:2,
            front:"2",
            back:"2",
            comment:"2"
        },{
            id:3,
            front:"3",
            back:"3",
            comment:"3"
        },{
            id:4,
            front:"4",
            back:"4",
            comment:"4"
        }],
    lastSavedPosition:"",

}
const getters={
    AllCards:(state)=>{
        let carddbcontext= new dbcontext('testdb',1);

        carddbcontext.createTable('testtable',{ keyPath: 'id' })
        carddbcontext.add().then((result)=>{
            console.log(result)
        }).catch((result)=>{
            console.log(result)
        })
        carddbcontext.get().then((result)=>{
            console.log(result)
            console.log(carddbcontext)
        }).catch((result)=>{
            console.log(result)
        })
        
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