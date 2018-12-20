<template>
  <div>
    <div class="block block__60">
      <to-do-detail v-bind:item="CurrentDetail"></to-do-detail>
    </div>
    <div class="block block__40">
      <to-do v-bind:todos="SortedTodos" v-on:selectToDO="selectToDO"></to-do>
    </div>
  </div>
</template>

<script>
import ToDo from "./ToDo";
import ToDoDetail from "./ToDoDetail";
export default {
  name: "ToDoContainer",
  components: {
    ToDo,
    ToDoDetail
  },
  data() {
    return {
      list: [],
      detail:{}
    };
  },
  created() {
    this.init();
  },
  mounted() {

  },
  methods: {
    selectToDO:function(id){
      this.$aidb.open("DB_Vue_FlashCard").get("ToDoContent",{"ToDoId":id})
        .then((result)=>{
              if(result){
                this.detail = result;
                this.$store.dispatch("setDetail",result)
              }else{
                this.detail = {
                  id:this.$uuid.v1(),
                  content:"",
                  ToDoId:id,
                  title:""
                }
                this.$store.dispatch("setDetail",this.detail)
              }
        })
    },
    init: function() {
      this.$aidb.open("DB_Vue_FlashCard").getAll("ToDos").then((result)=> {
        if(!result||result.length==0){
          let item = {
            id:this.$uuid.v1(),
             checked:false,
              title:"",
              deeps:0,
              treeId:0,
              sort:this.currentSort
          }
          let ditem = {
            id:this.$uuid.v1(),
            content:"",
            title:item.title,
            ToDoId:item.id,
          }
          this.$store.dispatch("addToDo",item)
          this.$store.dispatch("addContent",ditem)
          this.list=this.$store.getters.AllToDos;
          this.detail = ditem;
        }else{
            this.$store.commit('initToDos',result)
            this.list=this.$store.getters.AllToDos;
            this.$aidb.open("DB_Vue_FlashCard")
              .get("ToDoContent",{"ToDoId":this.SortedTodos[0].id}).then((result)=>{
                if(result){
                  this.detail  = result;
                }else{
                  //init detail and todo
                }
              })
            }
      });
    },
  },
  computed: {
    CurrentDetail:function(){
      return this.$store.getters.CurrentDetail;
    },
    SortedTodos: function() {
      let data = this.list;
      return data.sort(function(a, b) {
        return a.sort - b.sort;
      });
    },
    currentSort: function() {
      return this.list.length;
    }
  }
};
</script>

<style scoped>
.block {
  float: left;
}
.block__60 {
  width: 60%;
}
.block__40 {
  width: 40%;
}
.block:after {
  clear: both;
}
</style>
