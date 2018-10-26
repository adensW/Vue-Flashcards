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
        return state.cards
    }
}
const actions={

}
const mutations={

}
export default {
    namespaced: false,
    state,
    getters,
    actions,
    mutations
  }