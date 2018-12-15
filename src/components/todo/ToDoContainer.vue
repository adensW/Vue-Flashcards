<template>
  <div>
    <div class="block block__60">
      <to-do-detail v-bind:item="detail"></to-do-detail>
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
                  setId:id,
                  title:""
                }
                this.$store.dispatch("setDetail",this.detail)
              }
        })
    },
    update: function(val) {
      this.$aidb.open("DB_Vue_FlashCard").put("ToDos",val).execude()
    },
    init: function() {
      this.$aidb.open("DB_Vue_FlashCard").getAll("ToDos").then((result)=> {
          this.$store.commit('initToDos',result)
          this.list=this.$store.getters.AllToDos;
          this.detail=this.$store.getters.CurrentDetail
      });
    },
    seedData:function(){
        // this.$aidb.initialize();
        this.$aidb.open("DB_Vue_FlashCard").createTable("Cards",{keyPath: 'id'},{key:"SetId",unique:false})
        this.$aidb.open("DB_Vue_FlashCard").createTable("ToDos",{keyPath: 'id'})
        this.$aidb.open("DB_Vue_FlashCard").createTable("ToDoContent",{keyPath: 'id'},{key:"ToDoId",unique:true})
        this.$aidb.open("DB_Vue_FlashCard").createTable("Sets",{keyPath: 'id'})
        this.$aidb.execude()
    }
  },
  computed: {
    CurrentDetail:function(){
      return this.detail;
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
