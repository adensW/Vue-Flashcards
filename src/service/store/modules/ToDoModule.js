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
        this._vm.$aidb.open("DB_Vue_FlashCard").get("ToDoContent",{ToDoId:prop.id})
            .then((result)=>{
                if(result){
                    result.title = prop.title||"";
                    context.commit('setDetail',result);
                }else{
                    let item={
                        id:this._vm.$uuid.v1(),
                        title:prop.title,
                        ToDoId:prop.id,
                        content:""
                    } 
                    context.commit('setDetail',item);
                    this._vm.$aidb.open("DB_Vue_FlashCard").put("ToDoContent",prop).execude()
                }
            })
        this._vm.$aidb.open("DB_Vue_FlashCard").put("ToDos",prop).execude()
        
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
    },
    addToDo(context,prop){
        context.commit("addToDo",prop);
        this._vm.$aidb.open("DB_Vue_FlashCard").add("ToDos",prop).execude()
    },
    addContent(context,prop){
        context.commit("addContent",prop);
        this._vm.$aidb.open("DB_Vue_FlashCard").add("ToDoContent",prop).execude()
    }
}
const mutations={
    setDetail:(state,prop)=>{
        state.Detail = prop;
    },
    initToDos:(state,prop)=>{
       state.ToDos = prop;
    },
    addToDo:(state,prop)=>{
        state.ToDos.push(prop);
    },
    addContent:(state,prop)=>{
        state.Detail = prop;
    },
    updateToDo:(state,prop)=>{
        let index  = state.ToDos.findIndex(function(id){
            return id ==prop.id
        });
        state.ToDos[index] = prop;
    }

}
export default {
    namespaced: false,
    state,
    getters,
    actions,
    mutations
  }