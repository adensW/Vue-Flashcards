<template>
  <div>
    <div class="block block__60">
      <to-do-content v-bind:content="content"></to-do-content>
    </div>
    <div class="block block__40">
      <to-do v-bind:todos="SortedTodos" v-on:selectToDO="selectToDO"></to-do>
    </div>
  </div>
</template>

<script>
import ToDo from "./ToDo";
import ToDoContent from "./ToDoContent";
export default {
  name: "ToDoContainer",
  components: {
    ToDo,
    ToDoContent
  },
  data() {
    return {
      list: [],
      content:{}
    };
  },
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    selectToDO:function(id){
      
      this.aidb.open("DB_Vue_FlashCard").get("ToDoContent",{"toDoId":id})
        .then(function(result){
              console.log(result)
        })
    },
    update: function(val) {
      this.$aidb.open("DB_Vue_FlashCard").put("ToDos",val).execude()
    },
    init: function() {
      // this.$aidb.open("DB_Vue_FlashCard").getAll("ToDos").then((result)=> {
      //   this.list = result
      // });
      let a = this.$aidb.open("DB_Vue_FlashCard").createIndex("ToDoContent",{key:"test4",unique:false})
      a.execude()
      // let request = window.indexedDB.open("DB_Vue_FlashCard",8)
      // request.onupgradeneeded = function (event) {
      //   let database= event.target;
      //   let transaction = database.transaction;
      //   let objectStore = transaction.objectStore("ToDoContent");
      //   let req=objectStore.createIndex("lastModifyTime", "lastModifyTime", { unique: false })
      //   console.log(req)
      // }
      // request.onsuccess=function(event){
       
      // }

    },
    seedData:function(){
        this.$aidb.initialize();
        this.$aidb.open("DB_Vue_FlashCard").createTable("Cards",{keyPath: 'id'})
        this.$aidb.open("DB_Vue_FlashCard").createTable("ToDos",{keyPath: 'id'})
        this.$aidb.open("DB_Vue_FlashCard").createTable("Sets",{keyPath: 'id'})
        this.$aidb.execude()
    }
  },
  computed: {
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
