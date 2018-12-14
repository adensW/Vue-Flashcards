const state={
    ToDos:[
        ],
    Detail:{}

}
const getters={
    AllToDos:(state)=>{
        return state.ToDos
    },
    CurrentDetail:(state)=>{
        return state.Detail
    }
}
const actions={
    updateToDo(context,prop){
        //actions
        context.commit('updateToDo',prop);
    },
    initToDos(context,prop){
        context.commit('initToDos',prop);
        
    },
    setDetail(context,prop){
        context.commit('setDetail',prop);
        this._vm.$aidb.open("DB_Vue_FlashCard").put("ToDoContent",prop).execude()
    },
    updateDetail(context,prop){
        context.commit('setDetail',prop);
        this._vm.$aidb.open("DB_Vue_FlashCard").put("ToDoContent",prop).execude()
    }

}
const mutations={
    setDetail:(state,prop)=>{
        state.Detail = prop;
    },
    initToDos:(state,prop)=>{
       state.ToDos = prop;
    }

}
export default {
    namespaced: false,
    state,
    getters,
    actions,
    mutations
  }