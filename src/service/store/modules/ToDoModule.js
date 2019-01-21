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
        let arr = [];
        if(Array.isArray(prop)){
            arr.push(...prop);
        }else{
            arr.push(prop);
        }
        arr.forEach((value)=>{
            context.commit('updateToDo',value);
            this._vm.$aidb.open("DB_Vue_FlashCard").put("ToDos",value).execude()
            this._vm.$aidb.open("DB_Vue_FlashCard").get("ToDoContent",{ToDoId:value.id})
                .then((result)=>{
                    if(result){
                        result.title = value.title;
                    }else{
                         result={
                            id:this._vm.$uuid.v1(),
                            title:value.title,
                            ToDoId:value.id,
                            content:""
                        } 
                    }
                    context.commit('setDetail',result);
                    this._vm.$aidb.open("DB_Vue_FlashCard").put("ToDoContent",result).execude()
                })
        })
        
    },
    deleteToDo(context,prop){
        let arr = [];
        if(Array.isArray(prop)){
            arr.push(...prop);
        }else{
            arr.push(prop);
        }
        arr.forEach((value)=>{
            this._vm.$aidb.open("DB_Vue_FlashCard").delete("ToDos",value).execude().then(()=>{
                context.commit('deleteToDo',value);
            })
            this._vm.$aidb.open("DB_Vue_FlashCard").get("ToDoContent",{ToDoId:value.id}).then((result)=>{
                if(result){
                    this._vm.$aidb.open("DB_Vue_FlashCard").delete("ToDoContent",value).execude().then(()=>{
                        context.commit('deleteToDo',value);
                    })
                }
            })
        })
        

    },
    initToDos(context,prop){
        context.commit('initToDos',prop);
    },
    setDetail(context,prop){
        context.commit('setDetail',prop);
        this._vm.$aidb.open("DB_Vue_FlashCard").put("ToDoContent",prop).execude()
    },
    changeDetail(context,attr){
        let prop = {}
        this._vm.$aidb.open("DB_Vue_FlashCard").get("ToDoContent",{ToDoId:attr.id})
            .then((result)=>{
                if(result){
                    prop = result;
                }else{
                    prop={
                        id:this._vm.$uuid.v1(),
                        title:attr.title,
                        content:"",
                        ToDoId:attr.id
                    }
                }
                context.commit('setDetail',prop);
            })
           
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
        context.commit("setDetail",prop);
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
    updateToDo:(state,prop)=>{
        let index  = state.ToDos.findIndex(function(value){
            return value.id ==prop.id
        });
        state.ToDos[index] = prop;
    },
    deleteToDo:(state,prop)=>{
        let index =state.ToDos.findIndex(function(value){
            return value.id==prop.id
        });
        state.ToDos.splice(index,1);
        state.Detail={}
    }
}
export default {
    namespaced: false,
    state,
    getters,
    actions,
    mutations
  }